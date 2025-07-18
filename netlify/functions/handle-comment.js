const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    
    const headers = {
        'Access-Control-Allow-Origin': 'https://privseo.ru',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        console.log('Handling OPTIONS request');
        return { statusCode: 204, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        console.log('Method not allowed:', event.httpMethod);
        return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        console.log('Raw body:', event.body);
        const comment = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
        
        if (!comment.newsId || !comment.author || !comment.text) {
            console.log('Missing fields:', comment);
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ 
                    error: 'Missing required fields',
                    received: comment
                })
            };
        }

        console.log('Creating bot instance');
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        
        console.log('Sending to Telegram:', {
            newsId: comment.newsId,
            author: comment.author,
            text: comment.text.substring(0, 50) + '...'
        });
        
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
                                callback_data: `approve_${comment.newsId}`
                            },
                            { 
                                text: '❌ Отклонить', 
                                callback_data: `reject_${comment.newsId}`
                            }
                        ]
                    ]
                }
            }
        );

        console.log('Message sent successfully');
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ success: true })
        };

    } catch (error) {
        console.error('Full error:', {
            message: error.message,
            stack: error.stack,
            response: error.response?.data
        });
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ 
                error: 'Internal Server Error',
                details: error.message,
                stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
            })
        };
    }
};