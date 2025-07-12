const cheerio = require('cheerio');
const axios = require('axios');
const { JSDOM } = require('jsdom');
const { parse } = require('node-html-parser');

exports.handler = async (event) => {
    // Обработка CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: {
                'Access-Control-Allow-Origin': 'https://privseo.ru',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            },
            body: ''
        };
    }

    try {
        const { urls, keywords } = JSON.parse(event.body);
        
        // Проверка входных данных
        if (!urls || !Array.isArray(urls) {
            throw new Error('Неверный формат URL');
        }
        
        if (!keywords || !Array.isArray(keywords)) {
            throw new Error('Неверный формат ключевых фраз');
        }
        
        // Анализ каждой страницы
        const analysisResults = await Promise.all(urls.map(async (url) => {
            try {
                // Загрузка страницы
                const response = await axios.get(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; PrivSEOAnalyzer/1.0; +https://privseo.ru)'
                    }
                });
                
                const html = response.data;
                const $ = cheerio.load(html);
                const dom = new JSDOM(html);
                const document = dom.window.document;
                
                // Извлечение title и description
                const title = $('title').text().trim();
                const metaDescription = $('meta[name="description"]').attr('content') || '';
                
                // Извлечение заголовков
                const headings = {
                    h1: [],
                    h2: []
                };
                
                $('h1').each((i, el) => headings.h1.push($(el).text().trim()));
                $('h2').each((i, el) => headings.h2.push($(el).text().trim()));
                
                // Анализ изображений
                const images = {
                    total: 0,
                    withAlt: 0,
                    withoutAlt: 0
                };
                
                $('img').each((i, el) => {
                    images.total++;
                    if ($(el).attr('alt')) {
                        images.withAlt++;
                    } else {
                        images.withoutAlt++;
                    }
                });
                
                // Извлечение основного контента (упрощенный метод)
                const root = parse(html);
                const bodyText = root.querySelector('body').text;
                
                // Удаление лишних пробелов и переносов строк
                const cleanText = bodyText
                    .replace(/\s+/g, ' ')
                    .replace(/<[^>]*>/g, '')
                    .trim();
                
                // Подсчет длины контента
                const contentLength = cleanText.length;
                
                // Анализ ключевых фраз
                const keywordAnalysis = {};
                
                keywords.forEach(keyword => {
                    const exactMatches = countExactMatches(cleanText, keyword);
                    const partialMatches = countPartialMatches(cleanText, keyword);
                    const totalWords = cleanText.split(/\s+/).length;
                    const density = totalWords > 0 ? ((exactMatches / totalWords) * 100) : 0;
                    
                    keywordAnalysis[keyword] = {
                        exactMatches,
                        partialMatches,
                        density
                    };
                });
                
                return {
                    url,
                    status: response.status,
                    title,
                    meta: {
                        description: metaDescription
                    },
                    headings,
                    images,
                    contentLength,
                    keywordAnalysis
                };
                
            } catch (error) {
                console.error(`Ошибка при анализе ${url}:`, error);
                return {
                    url,
                    error: error.message
                };
            }
        }));
        
        return {
            statusCode: 200,
            body: JSON.stringify(analysisResults),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://privseo.ru'
            }
        };
        
    } catch (error) {
        console.error('Ошибка:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://privseo.ru'
            }
        };
    }
};

// Подсчет точных вхождений ключевой фразы
function countExactMatches(text, keyword) {
    const regex = new RegExp(`\\b${escapeRegExp(keyword)}\\b`, 'gi');
    const matches = text.match(regex);
    return matches ? matches.length : 0;
}

// Подсчет неточных вхождений (раздельные слова)
function countPartialMatches(text, keyword) {
    const words = keyword.split(/\s+/);
    if (words.length <= 1) return 0;
    
    let count = 0;
    const textWords = text.toLowerCase().split(/\s+/);
    const keywordWords = words.map(w => w.toLowerCase());
    
    for (let i = 0; i <= textWords.length - keywordWords.length; i++) {
        let match = true;
        for (let j = 0; j < keywordWords.length; j++) {
            if (textWords[i + j] !== keywordWords[j]) {
                match = false;
                break;
            }
        }
        if (match) count++;
    }
    
    return count;
}

function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}