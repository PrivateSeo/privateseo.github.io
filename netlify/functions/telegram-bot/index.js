// netlify/functions/telegram-bot/telegram-bot.js
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const yaml = require('js-yaml');
const sharp = require('sharp');

// --- НАСТРОЙКИ ---
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const AUTHORIZED_USER_ID = parseInt(process.env.TELEGRAM_CHAT_ID);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.REPO_OWNER;
const REPO_NAME = process.env.REPO_NAME;

// GitHub API настройки
const GITHUB_API_URL = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const NEWS_DIR = '_posts/news';
const IMAGES_DIR = 'assets/images/news';
const MENU_PATH = '_data/menu.yml';

// --- КАТЕГОРИИ ---
const CATEGORIES = {
    frontend: "👨‍💻 Frontend",
    backend: "⚙️ Backend", 
    seo: "🔍 SEO",
    tools: "🛠️ Инструменты",
    cases: "📊 Кейсы"
};

// Таблица транслитерации
const TRANSLIT_TABLE = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo',
    'ж': 'zh', 'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm',
    'н': 'n', 'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sch',
    'ъ': '', 'ы': 'y', 'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
};

const bot = new TelegramBot(BOT_TOKEN, { polling: false });
const userStates = {};

// --- GITHUB ФУНКЦИИ ---
async function githubApiRequest(method, endpoint, data = null) {
    const headers = {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    };
    const url = `${GITHUB_API_URL}/${endpoint}`;
    
    try {
        let response;
        if (method === 'GET') {
            response = await axios.get(url, { headers });
        } else if (method === 'PUT') {
            response = await axios.put(url, data, { headers });
        } else if (method === 'POST') {
            response = await axios.post(url, data, { headers });
        } else if (method === 'DELETE') {
            response = await axios.delete(url, { headers, data });
        }
        
        return response.data;
    } catch (error) {
        console.error('GitHub API error:', error.response?.data || error.message);
        throw error;
    }
}

async function getFileContent(filePath) {
    try {
        const endpoint = `contents/${filePath}`;
        const response = await githubApiRequest('GET', endpoint);
        const content = response.content || '';
        return Buffer.from(content, 'base64').toString('utf-8');
    } catch (error) {
        if (error.response?.status === 404) {
            return '';
        }
        throw error;
    }
}

async function updateFileContent(filePath, content, message) {
    const endpoint = `contents/${filePath}`;
    
    // Получить текущий SHA файла
    let sha = null;
    try {
        const currentFile = await githubApiRequest('GET', endpoint);
        sha = currentFile.sha;
    } catch (error) {
        // Файл не существует, создаем новый
    }
    
    const data = {
        message,
        content: Buffer.from(content).toString('base64'),
        branch: 'main'
    };
    
    if (sha) {
        data.sha = sha;
    }
    
    return githubApiRequest('PUT', endpoint, data);
}

async function listFiles(directory) {
    const endpoint = `contents/${directory}`;
    try {
        const files = await githubApiRequest('GET', endpoint);
        return files.filter(file => file.type === 'file');
    } catch (error) {
        if (error.response?.status === 404) {
            return [];
        }
        throw error;
    }
}

async function deleteFile(filePath, message) {
    const endpoint = `contents/${filePath}`;
    
    // Получить SHA файла
    let sha;
    try {
        const currentFile = await githubApiRequest('GET', endpoint);
        sha = currentFile.sha;
    } catch (error) {
        return false;
    }
    
    if (!sha) {
        return false;
    }
    
    const data = {
        message,
        sha,
        branch: 'main'
    };
    
    try {
        await githubApiRequest('DELETE', endpoint, data);
        return true;
    } catch (error) {
        return false;
    }
}

// --- ОБЩИЕ ФУНКЦИИ ---
function isAuthorized(userId) {
    return userId === AUTHORIZED_USER_ID;
}

async function getMenuData() {
    try {
        const content = await getFileContent(MENU_PATH);
        return content ? yaml.load(content) : { items: [] };
    } catch (error) {
        console.error('Error reading menu:', error);
        return { items: [] };
    }
}

async function updateMenuData(data) {
    try {
        const content = yaml.dump(data, { skipInvalid: true });
        await updateFileContent(MENU_PATH, content, "Update menu via bot");
        return true;
    } catch (error) {
        console.error('Error updating menu:', error);
        return false;
    }
}

async function getNewsFiles() {
    try {
        const files = await listFiles(NEWS_DIR);
        return files.filter(file => file.name.endsWith('.md'));
    } catch (error) {
        console.error('Error listing news:', error);
        return [];
    }
}

async function getNewsFileContent(filePath) {
    try {
        return await getFileContent(filePath);
    } catch (error) {
        console.error('Error reading news:', error);
        return null;
    }
}

async function saveNewsFile(filename, content) {
    try {
        const filePath = `${NEWS_DIR}/${filename}`;
        await updateFileContent(filePath, content, `Add news: ${filename}`);
        return { success: true, path: filePath };
    } catch (error) {
        console.error('Error saving news:', error);
        return { success: false, error: error.message };
    }
}

async function saveImage(imageBuffer, filename) {
    try {
        const filePath = `${IMAGES_DIR}/${filename}`;
        const content = imageBuffer.toString('base64');
        await updateFileContent(filePath, content, `Add image: ${filename}`);
        return filePath;
    } catch (error) {
        console.error('Error saving image:', error);
        return null;
    }
}

async function deleteNewsFile(filename) {
    try {
        const filePath = `${NEWS_DIR}/${filename}`;
        return await deleteFile(filePath, `Delete news: ${filename}`);
    } catch (error) {
        console.error('Error deleting news:', error);
        return false;
    }
}

function menuKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: "📋 Показать меню", callback_data: "show_menu" },
                { text: "➕ Добавить пункт", callback_data: "add_item" }
            ],
            [
                { text: "✏️ Редактировать пункт", callback_data: "edit_item" },
                { text: "❌ Удалить пункт", callback_data: "delete_item" }
            ]
        ]
    };
}

function newsManagementKeyboard() {
    return {
        inline_keyboard: [
            [
                { text: "📝 Добавить новость", callback_data: "add_news" },
                { text: "📋 Список новостей", callback_data: "list_news" }
            ],
            [
                { text: "✏️ Редактировать новость", callback_data: "edit_news" },
                { text: "❌ Удалить новость", callback_data: "delete_news" }
            ]
        ]
    };
}

function categoryKeyboard() {
    return {
        keyboard: Object.values(CATEGORIES).map(cat => [{ text: cat }]),
        resize_keyboard: true,
        one_time_keyboard: true
    };
}

function transliterate(text) {
    return text.toLowerCase()
        .split('')
        .map(char => TRANSLIT_TABLE[char] || (/[a-z0-9-]/.test(char) ? char : '-'))
        .join('');
}

async function optimizeImage(imageBuffer) {
    try {
        return await sharp(imageBuffer)
            .resize(800, 600, { fit: 'inside' })
            .webp({ quality: 80 })
            .toBuffer();
    } catch (error) {
        throw new Error(`Ошибка оптимизации изображения: ${error.message}`);
    }
}

function parseFrontMatter(content) {
    try {
        const parts = content.split('---');
        if (parts.length >= 3) {
            const frontMatter = yaml.load(parts[1]);
            const body = parts.slice(2).join('---');
            return { frontMatter, body };
        }
        return { frontMatter: null, body: content };
    } catch (error) {
        return { frontMatter: null, body: content };
    }
}

function createNewsFileContent(userData, content, imageUrl = null) {
    const date = new Date().toISOString().split('T')[0];
    const imagePath = imageUrl ? `/${imageUrl}` : "";
    const newsId = uuidv4().slice(0, 16);
    
    return `---
layout: news
news_id: ${newsId}
name: "${userData.name}"
title: "${userData.title}"
description: "${userData.description}"
date: ${date}
image: "${imagePath}"
category: ${userData.category}
---

${content}
`;
}

// --- ОБРАБОТЧИКИ КОМАНД ---
bot.onText(/\/start|\/help/, (msg) => {
    if (!isAuthorized(msg.from.id)) {
        return bot.sendMessage(msg.chat.id, "⛔ Доступ запрещен");
    }
    
    bot.sendMessage(
        msg.chat.id,
        "🌐 Управление сайтом\n\n" +
        "/news - Управление новостями\n" +
        "/menu - Управление меню\n" +
        "/help - Справка"
    );
});

bot.onText(/\/menu/, (msg) => {
    if (!isAuthorized(msg.from.id)) return;
    bot.sendMessage(msg.chat.id, "🔧 Управление меню сайта:", { reply_markup: menuKeyboard() });
});

bot.onText(/\/news/, (msg) => {
    if (!isAuthorized(msg.from.id)) return;
    bot.sendMessage(msg.chat.id, "📰 Управление новостями:", { reply_markup: newsManagementKeyboard() });
});

// --- ОБРАБОТЧИКИ CALLBACK QUERY ---
bot.on('callback_query', async (callbackQuery) => {
    const chatId = callbackQuery.message.chat.id;
    const data = callbackQuery.data;
    
    if (!isAuthorized(callbackQuery.from.id)) {
        return bot.answerCallbackQuery(callbackQuery.id, { text: "⛔ Доступ запрещен" });
    }
    
    try {
        // Обработка меню
        if (data === 'show_menu') {
            const menu = await getMenuData();
            let text = "📋 Текущее меню:\n\n";
            menu.items.forEach((item, i) => {
                text += `${i + 1}. ${item.title} → ${item.url}\n`;
            });
            await bot.editMessageText(text, {
                chat_id: chatId,
                message_id: callbackQuery.message.message_id,
                reply_markup: menuKeyboard()
            });
        }
        // Остальные обработчики callback query...
        
        else if (data === 'add_news') {
            userStates[chatId] = { step: 'waiting_for_category' };
            await bot.sendMessage(chatId, "Выберите категорию:", { reply_markup: categoryKeyboard() });
        }
        
        await bot.answerCallbackQuery(callbackQuery.id);
    } catch (error) {
        console.error('Callback error:', error);
        await bot.answerCallbackQuery(callbackQuery.id, { text: "❌ Ошибка обработки запроса" });
    }
});

// --- ОБРАБОТЧИКИ СООБЩЕНИЙ ---
bot.on('message', async (msg) => {
    if (!isAuthorized(msg.from.id)) return;
    
    const chatId = msg.chat.id;
    const userState = userStates[chatId];
    
    if (!userState) return;
    
    try {
        // Обработка добавления новости
        if (userState.step === 'waiting_for_category' && Object.values(CATEGORIES).includes(msg.text)) {
            const category = Object.keys(CATEGORIES).find(key => CATEGORIES[key] === msg.text);
            userStates[chatId] = {
                step: 'waiting_for_name',
                category,
                media: null
            };
            await bot.sendMessage(chatId, "📝 Введите название новости:", { reply_markup: { remove_keyboard: true } });
        }
        // Другие шаги обработки...
        
    } catch (error) {
        console.error('Message processing error:', error);
        await bot.sendMessage(chatId, `❌ Ошибка: ${error.message}`);
        delete userStates[chatId];
    }
});

// --- NETLIFY HANDLER ---
exports.handler = async (event, context) => {
    try {
        if (event.httpMethod !== 'POST') {
            return { statusCode: 405, body: 'Method Not Allowed' };
        }
        
        const update = JSON.parse(event.body);
        await bot.processUpdate(update);
        
        return {
            statusCode: 200,
            body: JSON.stringify({ success: true })
        };
    } catch (error) {
        console.error('Handler error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};