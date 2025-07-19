// /netlify/functions/telegram-webhook/telegram-webhook.js
const { Telegraf } = require('telegraf');
const axios = require('axios');
const crypto = require('crypto');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// В памяти сопоставляем хеш callback_data с полным newsId
// (так как callback_data ограничен 64 символами, передаем хеш чтобы избежать превышения лимита)
const callbackMap = new Map();

bot.action(/^(approve|reject)_comment_comment_[a-f0-9]{8}$/, async (ctx) => {
  try {
    const fullCallback = ctx.match[0]; // например: approve_comment_ab12cd34
    const [action,, hash] = fullCallback.split('_');

    // Получаем полный newsId из памяти по хешу
    const newsId = callbackMap.get(hash);
    if (!newsId) {
      await ctx.answerCbQuery('Не удалось найти соответствие ID новости');
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

    // Используем newsId без изменений как имя файла JSON
    const safeFileName = newsId; // в формате 2fc8456c-4d4b-49d0-adc2-379a1a50c1b3
    const filePath = `data/comments/${safeFileName}.json`;
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

    // Удаляем маппинг из памяти после обработки
    callbackMap.delete(hash);

  } catch (error) {
    console.error('Ошибка модерации:', error);
    await ctx.answerCbQuery('Произошла ошибка. Попробуйте позже.');
  }
});

bot.on('callback_query', (ctx) => {
  // При первых запросах нужно сопоставить callback_data с newsId
  // Из текста сообщения берем newsId и добавляем в map
  // callback_data: approve_comment_ab12cd34, newsId в тексте сообщения.

  const callbackData = ctx.update.callback_query.data; // например approve_comment_comment_ab12cd34
  const m = callbackData.match(/^((approve|reject)_comment_comment_)([a-f0-9]{8})$/);
  if (m) {
    const hash = m[3];
    const messageText = ctx.update.callback_query.message.text;
    const newsIdMatch = messageText.match(/📝 Статья: ([a-zA-Z0-9\-]+)/);
    if (newsIdMatch) {
      const newsId = newsIdMatch[1];
      callbackMap.set(hash, newsId);
    }
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