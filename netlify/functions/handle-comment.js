const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    // Устанавливаем CORS заголовки
    const headers = {
        'Access-Control-Allow-Origin': 'https://privseo.ru',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Обработка предварительного OPTIONS запроса
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        };
    }

    // Проверяем метод запроса
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const comment = JSON.parse(event.body);
        
        // Валидация данных
        if (!comment.newsId || !comment.author || !comment.text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Создаем безопасный callback_data
        const callbackData = `approve_${comment.newsId}`;
        
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        
        // Отправляем сообщение в Telegram
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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal Server Error',
                message: error.response?.description || error.message
            })
        };
    }
};