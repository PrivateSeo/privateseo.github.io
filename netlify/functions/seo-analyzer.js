const cheerio = require('cheerio');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { parse } = require('node-html-parser');

exports.handler = async (event) => {
    // Полная обработка CORS
    const headers = {
        'Access-Control-Allow-Origin': 'https://privseo.ru',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Обработка preflight запроса (OPTIONS)
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers,
            body: ''
        };
    }

    try {
        const { urls, keywords } = JSON.parse(event.body);
        
        // Проверка входных данных
        if (!urls || !Array.isArray(urls)) {
            throw new Error('Неверный формат URL');
        }
        
        if (!keywords || !Array.isArray(keywords)) {
            throw new Error('Неверный формат ключевых фраз');
        }
        
        // Анализ каждой страницы
        const analysisResults = await Promise.all(urls.map(async (url) => {
            try {
                const response = await axios.get(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' }
                });
                
                const $ = cheerio.load(response.data);
                const dom = new JSDOM(response.data);
                const bodyText = parse(response.data).querySelector('body').text;
                const cleanText = bodyText.replace(/\s+/g, ' ').trim();
                
                // ... (остальной код анализа как в предыдущем примере) ...

                return {
                    url,
                    status: response.status,
                    title: $('title').text().trim(),
                    meta: {
                        description: $('meta[name="description"]').attr('content') || ''
                    },
                    // ... остальные данные ...
                };
            } catch (error) {
                console.error(`Ошибка при анализе ${url}:`, error);
                return { url, error: error.message };
            }
        });
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(analysisResults)
        };
        
    } catch (error) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: error.message })
        };
    }
};

// ... (вспомогательные функции countExactMatches и другие) ...