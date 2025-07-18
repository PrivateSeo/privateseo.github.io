const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    // Устанавливаем CORS заголовки
    const headers = {
        'Access-Control-Allow-Origin': 'https://privseo.ru',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    try {
        const comment = JSON.parse(event.body);

        if (!comment.newsId || !comment.author || !comment.text) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Missing required fields' })
            };
        }

        // Проверка наличия переменных окружения
        if (!process.env.TELEGRAM_BOT_TOKEN || !process.env.TELEGRAM_CHAT_ID) {
            console.error('TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не установлены');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Server configuration error' }),
            };
        }

        const safeNewsId = comment.newsId.replace(/[^a-zA-Z0-9-_]/g, '');
        const callbackData = `comment_${safeNewsId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

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

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
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