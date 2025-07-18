const { Telegraf } = require('telegraf');

exports.handler = async (event, context) => {
    // Разрешаем CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST'
            },
            body: ''
        };
    }

    // Проверяем метод
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const comment = JSON.parse(event.body);
        
        // Валидация
        if (!comment.newsId || !comment.author || !comment.text) {
            return {
                statusCode: 400,
                headers: { 
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Инициализация бота
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        
        // Отправка в Telegram
        await bot.telegram.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            `📝 Новый комментарий:\n\n` +
            `📌 Статья: ${comment.newsId}\n` +
            `👤 Автор: ${comment.author}\n` +
            `💬 Текст: ${comment.text}\n\n` +
            `⏳ Время: ${new Date().toLocaleString()}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Одобрить', callback_data: `approve_${comment.newsId}` },
                            { text: '❌ Отклонить', callback_data: `reject_${comment.newsId}` }
                        ]
                    ]
                }
            }
        );

        return {
            statusCode: 200,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ success: true, message: 'Комментарий отправлен на модерацию' })
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({ error: error.message })
        };
    }
};