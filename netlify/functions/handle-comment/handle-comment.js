const axios = require('axios');
const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    try {
        const comment = JSON.parse(event.body);
        
        // Отправляем уведомление в Telegram
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        await bot.telegram.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            `Новый комментарий на модерацию:\n\nСтатья: ${comment.newsId}\nАвтор: ${comment.author}\nТекст: ${comment.text}\n\nОдобрить?`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Одобрить', callback_data: `approve_${comment.newsId}_${comment.timestamp}` },
                            { text: '❌ Отклонить', callback_data: `reject_${comment.newsId}_${comment.timestamp}` }
                        ]
                    ]
                }
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ success: false, error: error.message })
        };
    }
};