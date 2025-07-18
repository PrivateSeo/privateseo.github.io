const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
    // Проверка метода запроса
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ 
                success: false,
                error: 'Method Not Allowed',
                message: 'Используйте POST запрос для отправки комментариев'
            })
        };
    }

    try {
        // Парсим тело запроса
        const comment = JSON.parse(event.body);
        
        // Валидация данных
        if (!comment.newsId || !comment.author || !comment.text) {
            return {
                statusCode: 400,
                body: JSON.stringify({
                    success: false,
                    error: 'Неполные данные',
                    message: 'Укажите newsId, author и text'
                })
            };
        }

        // Добавляем timestamp если его нет
        if (!comment.timestamp) {
            comment.timestamp = new Date().toISOString();
        }
        
        // Устанавливаем статус "на модерации"
        comment.status = 'pending';

        // Инициализируем бота
        const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
        
        // Отправляем сообщение в Telegram
        await bot.telegram.sendMessage(
            process.env.TELEGRAM_CHAT_ID,
            `📨 Новый комментарий на модерацию:\n\n` +
            `📝 Статья: ${comment.newsId}\n` +
            `👤 Автор: ${comment.author}\n` +
            `💬 Текст: ${comment.text}\n\n` +
            `⏳ ${new Date(comment.timestamp).toLocaleString()}`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { 
                                text: '✅ Одобрить', 
                                callback_data: `approve_${comment.newsId}_${comment.timestamp}`
                            },
                            { 
                                text: '❌ Отклонить', 
                                callback_data: `reject_${comment.newsId}_${comment.timestamp}`
                            }
                        ]
                    ]
                }
            }
        );

        // Успешный ответ
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                success: true,
                message: 'Комментарий отправлен на модерацию'
            })
        };

    } catch (error) {
        console.error('Ошибка в handle-comment:', error);
        
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                success: false,
                error: error.message,
                message: 'Произошла ошибка при обработке комментария'
            })
        };
    }
};