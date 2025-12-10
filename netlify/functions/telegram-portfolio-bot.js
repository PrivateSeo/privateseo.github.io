const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
  // Разрешаем CORS
  const headers = {
    'Access-Control-Allow-Origin': 'https://privseo.ru',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Обработка preflight запроса
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    const bot = new Telegraf(process.env.TELEGRAM_PORTFOLIO_BOT_TOKEN);
    
    // GET запрос для установки вебхука
    if (event.httpMethod === 'GET') {
      const webhookUrl = `https://${event.headers.host}/.netlify/functions/telegram-portfolio-bot`;
      
      // Устанавливаем вебхук
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Webhook установлен',
          webhookUrl: webhookUrl,
          webhookInfo: isSet
        })
      };
    }

    // POST запрос от Telegram
    if (event.httpMethod === 'POST') {
      console.log('Telegram webhook received');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true })
      };
    }

    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };

  } catch (error) {
    console.error('Error in telegram-portfolio-bot:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: error.message
      })
    };
  }
};