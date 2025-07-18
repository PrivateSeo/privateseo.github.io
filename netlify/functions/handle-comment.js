const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
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
        
        // Валидация
        if (!comment.newsId || !comment.author || !comment.text) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Missing required fields' }) };
        }

        // Генерируем уникальный ID для callback_data
        const callbackId = Buffer.from(comment.newsId).toString('base64').slice(0, 64);
        const timestamp = Date.now();
        
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

        return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal Error',
                message: error.response?.description || error.message
            })
        };
    }
};