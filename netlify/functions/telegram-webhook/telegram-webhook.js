const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Обработчик callback-ов от кнопок
bot.action(/^(approve|reject)_(.+)_(.+)$/, async (ctx) => {
    const action = ctx.match[1]; // approve или reject
    const newsId = ctx.match[2];
    const timestamp = ctx.match[3];
    
    try {
        // Получаем текущие комментарии из репозитория
        const commentsUrl = `https://api.github.com/repos/${process.env.REPO_OWNER}/${process.env.REPO_NAME}/contents/data/comments/${newsId}.json`;
        let existingComments = [];
        
        try {
            const response = await axios.get(commentsUrl, {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            
            const content = Buffer.from(response.data.content, 'base64').toString('utf-8');
            existingComments = JSON.parse(content);
        } catch (error) {
            if (error.response && error.response.status !== 404) {
                throw error;
            }
            // Если файла нет - это нормально, оставляем пустой массив
        }
        
        // Находим комментарий по timestamp
        const commentIndex = existingComments.findIndex(c => c.timestamp === timestamp);
        
        if (commentIndex !== -1) {
            // Обновляем статус существующего комментария
            existingComments[commentIndex].status = action === 'approve' ? 'approved' : 'rejected';
        } else {
            // Добавляем новый комментарий (это не должно происходить в нормальной ситуации)
            const commentText = ctx.callbackQuery.message.text.split('\n\n')[1];
            existingComments.push({
                newsId,
                author: commentText.split('\n')[1].replace('Автор: ', ''),
                text: commentText.split('\n')[2].replace('Текст: ', ''),
                timestamp,
                status: action === 'approve' ? 'approved' : 'rejected'
            });
        }
        
        // Обновляем файл в репозитории
        const updateResponse = await axios.put(
            commentsUrl,
            {
                message: `${action === 'approve' ? 'Одобрен' : 'Отклонен'} комментарий для статьи ${newsId}`,
                content: Buffer.from(JSON.stringify(existingComments, null, 2)).toString('base64'),
                sha: existingFile ? existingFile.sha : undefined,
                branch: process.env.BRANCH
            },
            {
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );
        
        await ctx.answerCbQuery(`Комментарий ${action === 'approve' ? 'одобрен' : 'отклонен'}!`);
        await ctx.deleteMessage();
    } catch (error) {
        console.error('Error processing comment:', error);
        await ctx.answerCbQuery('Произошла ошибка при обработке комментария');
    }
});

exports.handler = async (event) => {
    try {
        await bot.handleUpdate(JSON.parse(event.body));
        return { statusCode: 200, body: '' };
    } catch (error) {
        console.error('Error in telegram webhook:', error);
        return { statusCode: 500, body: 'Error processing update' };
    }
};