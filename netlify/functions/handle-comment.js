// /netlify/functions/handle-comment.js
const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://privseo.ru',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const comment = JSON.parse(event.body);

    if (!comment.newsId || !comment.author || !comment.text) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
    }

    if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
      console.error('Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables.');
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Server configuration error' }) };
    }

    // Используем полный newsId без сокращений
    const safeNewsId = comment.newsId.replace(/[^a-zA-Z0-9\-]/g, ''); // допускаем цифры, буквы и дефис

    // Для callback_data Telegram ограничение в 64 символа, поэтому формируем хеш вместо полного id
    const crypto = require('crypto');
    const hash = crypto.createHash('md5').update(safeNewsId + String(Date.now()) + Math.random()).digest('hex').slice(0, 8);

    // callback_data содержит хеш и указывает на полный newsId для обработки
    const callbackData = `comment_${hash}`;

    const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

    await bot.telegram.sendMessage(
      process.env.TELEGRAM_CHAT_ID,
      `📨 Новый комментарий\n\n` +
        `📝 Статья: ${comment.newsId}\n` +
        `👤 Автор: ${comment.author}\n` +
        `✉️ Текст: ${comment.text.substring(0, 200)}${comment.text.length > 200 ? '...' : ''}`,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: '✅ Одобрить', callback_data: `approve_${callbackData}` },
              { text: '❌ Отклонить', callback_data: `reject_${callbackData}` }
            ]
          ]
        }
      }
    );

    // Возвращаем client callbackData и newsId для дальнейшей сопоставки
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, callbackData, newsId: safeNewsId })
    };

  } catch (error) {
    console.error('Error in handle-comment:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message,
        stack: error.stack,
        response: error.response ? {
          status: error.response.status,
          data: error.response.data
        } : undefined
      })
    };
  }
};