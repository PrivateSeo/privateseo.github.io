// /netlify/functions/telegram-webhook/telegram-webhook.js
const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Ключ: хеш callback_data, значение: полный newsId
const callbackMap = new Map();

// При получении callback_query
bot.on('callback_query', (ctx) => {
  try {
    const data = ctx.callbackQuery.data; // callback_data, например: approve_comment_ab12cd34
    const match = data.match(/^(approve|reject)_comment_comment_([a-f0-9]{8})$/);
    if (match) {
      const hash = match[2];

      // Из текста сообщения извлечь newsId
      const messageText = ctx.callbackQuery.message.text;
      // "📝 Статья: 2fc8456c-4d4b-49d0-adc2-379a1a50c1b3"
      const newsIdMatch = messageText.match(/📝 Статья: ([a-zA-Z0-9\-]+)/);
      if (newsIdMatch) {
        const newsId = newsIdMatch[1];
        callbackMap.set(hash, newsId);
      } else {
        console.warn('Не удалось найти newsId в тексте сообщения');
      }
    }
  } catch (err) {
    console.error('Ошибка при обработке callback_query:', err);
  }
});

// Обработчик approve/reject на основе callback_data
bot.action(/^(approve|reject)_comment_comment_([a-f0-9]{8})$/, async (ctx) => {
  try {
    const action = ctx.match[1]; // approve или reject
    const hash = ctx.match[2];

    const newsId = callbackMap.get(hash);
    if (!newsId) {
      await ctx.answerCbQuery('Не удалось определить ID новости');
      return;
    }

    const messageText = ctx.update.callback_query.message.text;

    const authorMatch = messageText.match(/👤 Автор: (.+)/);
    const textMatch = messageText.match(/✉️ Текст: (.+)/);

    if (!authorMatch || !textMatch) {
      await ctx.answerCbQuery('Не удалось обработать комментарий');
      return;
    }

    const author = authorMatch[1];
    const text = textMatch[1];

    const filePath = `data/comments/${newsId}.json`;
    const url = `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${filePath}`;

    let existingContent = [];
    let sha = null;

    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      });
      existingContent = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
      sha = response.data.sha;
    } catch (error) {
      if (error.response?.status !== 404) throw error;
      existingContent = [];
    }

    const newComment = {
      author,
      text,
      status: action === 'approve' ? 'approved' : 'rejected',
      date: new Date().toISOString()
    };

    const updatedContent = [...existingContent, newComment];

    await axios.put(
      url,
      {
        message: `${action === 'approve' ? 'Approved' : 'Rejected'} comment`,
        content: Buffer.from(JSON.stringify(updatedContent, null, 2)).toString('base64'),
        sha,
        branch: 'main'
      },
      {
        headers: {
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json'
        }
      }
    );

    await ctx.answerCbQuery(`Комментарий ${action === 'approve' ? 'одобрен' : 'отклонен'}`);
    await ctx.deleteMessage();

    // Удаляем из map, чтобы не росла память
    callbackMap.delete(hash);

  } catch (error) {
    console.error('Ошибка при модерации:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте позже.');
  }
});

exports.handler = async (event) => {
  try {
    await bot.handleUpdate(JSON.parse(event.body));
    return { statusCode: 200, body: '' };
  } catch (error) {
    console.error('Webhook handler error:', error);
    return { statusCode: 500, body: 'Internal Server Error' };
  }
};