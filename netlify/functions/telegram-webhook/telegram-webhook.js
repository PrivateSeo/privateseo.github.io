const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик кнопок "Одобрить/Отклонить"
bot.action(/^(approve|reject)_(.+)$/, async (ctx) => {
    try {
        const [_, action, newsId] = ctx.match;
        const messageText = ctx.update.callback_query.message.text;
        
        // Извлекаем данные из сообщения
        const author = messageText.match(/👤 Автор: (.+)/)[1];
        const text = messageText.match(/✉️ Текст: (.+)/)[1];
        
        // Формируем путь к файлу
        const filePath = `data/comments/${newsId.replace(/\//g, '-')}.json`;
        const filePath = `data/comments/${newsId}.json`;
        
        // Получаем текущие комментарии или создаем новый файл
        let existingContent = [];
        let sha = null;
        
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            existingContent = JSON.parse(Buffer.from(response.data.content, 'base64').toString());
            sha = response.data.sha;
        } catch (error) {
            if (error.response?.status !== 404) throw error;
        }
        
        // Добавляем новый комментарий
        const newComment = {
            author,
            text,
            status: action === 'approve' ? 'approved' : 'rejected',
            date: new Date().toISOString()
        };
        
        const updatedContent = [...existingContent, newComment];
        
        // Обновляем файл на GitHub
        await axios.put(url, {
            message: `${action === 'approve' ? 'Approved' : 'Rejected'} comment`,
            content: Buffer.from(JSON.stringify(updatedContent, null, 2)).toString('base64'),
            sha,
            branch: 'main'
        }, {
            headers: {
                'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });
        
        await ctx.answerCbQuery(`Комментарий ${action === 'approve' ? 'одобрен' : 'отклонен'}`);
        await ctx.deleteMessage();
        
    } catch (error) {
        console.error('Ошибка модерации:', error);
        await ctx.answerCbQuery('Произошла ошибка. Попробуйте позже.');
    }
});

exports.handler = async (event) => {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: '' };
    } catch (error) {
        return { statusCode: 500, body: 'Internal Server Error' };
    }
};