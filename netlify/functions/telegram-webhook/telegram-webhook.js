const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик кнопок "Одобрить/Отклонить"
bot.action(/^(approve|reject)_(.+)$/, async (ctx) => {
    try {
        const [_, action, callbackData] = ctx.match;
        const messageText = ctx.update.callback_query.message.text;
        
        // Извлекаем newsId из текста сообщения (вместо callback_data)
        const newsId = messageText.match(/📝 Статья: (.+)/)[1].trim();
        
        // Формируем путь к файлу с использованием ID новости
        const filePath = `data/comments/${newsId}.json`; // Теперь используем напрямую newsId
        const url = `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${filePath}`;
        
        // Остальной код без изменений...
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
        
        const newComment = {
            author: messageText.match(/👤 Автор: (.+)/)[1].trim(),
            text: messageText.match(/✉️ Текст: (.+)/)[1].trim(),
            status: action === 'approve' ? 'approved' : 'rejected',
            date: new Date().toISOString()
        };
        
        // ... остальной код без изменений
    } catch (error) {
        // ... обработка ошибок
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