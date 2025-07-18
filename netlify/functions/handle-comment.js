const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    // CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };

    // OPTIONS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers, body: '' };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const comment = JSON.parse(event.body);
        
        // Validate required fields
        if (!comment.newsId || !comment.author || !comment.text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Clean newsId for callback data (ограничения Telegram)
        const callbackId = comment.newsId
            .replace(/[^a-zA-Z0-9_-]/g, '')
            .substring(0, 64); // Максимум 64 символа для callback_data

        const timestamp = Math.floor(Date.now() / 1000);
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

        // Отправляем сообщение с кнопками
        await bot.telegram.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            `📨 Новый комментарий\n\n` +
            `📝 Статья: ${comment.newsId}\n` +
            `👤 Автор: ${comment.author}\n` +
            `✉️ Текст: ${comment.text.substring(0, 200)}` +
            (comment.text.length > 200 ? '...' : ''),
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { 
                                text: '✅ Одобрить', 
                                callback_data: `approve_${callbackId}_${timestamp}`
                            },
                            { 
                                text: '❌ Отклонить', 
                                callback_data: `reject_${callbackId}_${timestamp}`
                            }
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
        console.error('Telegram error:', error.response?.description || error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal Server Error',
                details: error.response?.description || error.message
            })
        };
    }
};