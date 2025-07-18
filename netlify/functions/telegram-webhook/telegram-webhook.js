const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

bot.action(/^(approve|reject)_(.+)$/, async (ctx) => {
    try {
        const [_, action, newsId] = ctx.match;
        const messageText = ctx.update.callback_query.message.text;
        
        const author = messageText.match(/👤 Автор: (.+)/)[1].trim();
        const text = messageText.match(/✉️ Текст: (.+)/)[1].trim();
        
        const filePath = `data/comments/${newsId}.json`;
        const url = `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/${filePath}`;
        
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
            author,
            text,
            status: action === 'approve' ? 'approved' : 'rejected',
            date: new Date().toISOString()
        };
        
        await axios.put(url, {
            message: `${action === 'approve' ? 'Approved' : 'Rejected'} comment`,
            content: Buffer.from(JSON.stringify([...existingContent, newComment], null, 2)).toString('base64'),
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