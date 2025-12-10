const { Telegraf, Markup } = require('telegraf');

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': 'https://privseo.ru',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  try {
    const bot = new Telegraf(process.env.TELEGRAM_PORTFOLIO_BOT_TOKEN);
    
    if (event.httpMethod === 'GET') {
      const webhookUrl = `https://${event.headers.host}/.netlify/functions/telegram-portfolio-bot`;
      const isSet = await bot.telegram.setWebhook(webhookUrl);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          message: 'Webhook установлен',
          webhookUrl: webhookUrl
        })
      };
    }

    if (event.httpMethod === 'POST') {
      const update = JSON.parse(event.body);
      
      if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const text = update.message.text;
        
        if (text === '/start' || text === '/start@RobDaNilov_bot') {
          const welcomeText = `👋 Привет! Я бот, который познакомит тебя с веб-разработчиком и SEO-оптимизатором Данильченко Робертом Владимировичем.\n\nВыбери направление, которое тебя интересует, и узнай подробно о всех услугах, которые я оказываю:`;
          
          const keyboard = Markup.inlineKeyboard([
            [
              Markup.button.callback('🔍 SEO-оптимизация', 'seo_category'),
              Markup.button.callback('💻 Web-разработка', 'webdev_category')
            ]
          ]);
          
          await bot.telegram.sendMessage(chatId, welcomeText, keyboard);
        }
      }
      
      // Обработка callback от кнопок
      if (update.callback_query) {
        const chatId = update.callback_query.message.chat.id;
        const data = update.callback_query.data;
        const messageId = update.callback_query.message.message_id;
        
        if (data === 'seo_category') {
          const seoText = `🔍 *SEO-оптимизация*\n\nВыберите услугу:`;
          const seoKeyboard = Markup.inlineKeyboard([
            [
              Markup.button.callback('📈 SEO-аудит', 'seo_audit'),
              Markup.button.callback('🔑 Ключевые слова', 'seo_keywords')
            ],
            [
              Markup.button.callback('📄 Оптимизация страниц', 'seo_optimization'),
              Markup.button.callback('📊 Аналитика', 'seo_analytics')
            ],
            [
              Markup.button.callback('◀️ Назад к выбору', 'back_to_main')
            ]
          ]);
          
          await bot.telegram.editMessageText(chatId, messageId, null, seoText, {
            parse_mode: 'Markdown',
            ...seoKeyboard
          });
        }
        
        if (data === 'webdev_category') {
          const webText = `💻 *Web-разработка*\n\nВыберите услугу:`;
          const webKeyboard = Markup.inlineKeyboard([
            [
              Markup.button.callback('🌐 Лендинг', 'web_landing'),
              Markup.button.callback('🛒 Интернет-магазин', 'web_shop')
            ],
            [
              Markup.button.callback('🏢 Корпоративный сайт', 'web_corporate'),
              Markup.button.callback('⚙️ Веб-приложение', 'web_app')
            ],
            [
              Markup.button.callback('◀️ Назад к выбору', 'back_to_main')
            ]
          ]);
          
          await bot.telegram.editMessageText(chatId, messageId, null, webText, {
            parse_mode: 'Markdown',
            ...webKeyboard
          });
        }
        
        if (data === 'back_to_main') {
          const welcomeText = `👋 Привет! Я бот, который познакомит тебя с веб-разработчиком и SEO-оптимизатором Данильченко Робертом Владимировичем.\n\nВыбери направление, которое тебя интересует, и узнай подробно о всех услугах, которые я оказываю:`;
          
          const keyboard = Markup.inlineKeyboard([
            [
              Markup.button.callback('🔍 SEO-оптимизация', 'seo_category'),
              Markup.button.callback('💻 Web-разработка', 'webdev_category')
            ]
          ]);
          
          await bot.telegram.editMessageText(chatId, messageId, null, welcomeText, keyboard);
        }
        
        // Подтверждаем callback (убираем часики)
        await bot.telegram.answerCbQuery(update.callback_query.id);
      }
      
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