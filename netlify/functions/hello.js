const fetch = require('node-fetch');
const whois = require('whois-json');

exports.handler = async (event) => {
  // Разрешаем CORS для preflight-запросов (OPTIONS)
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

  // Основной обработчик POST-запросов
  if (event.httpMethod === 'POST') {
    try {
      const { urls, keyword } = JSON.parse(event.body);
      
      const analysis = await Promise.all(urls.map(async (url) => {
        try {
          // Основные данные страницы
          const [pageRes, whoisData] = await Promise.all([
            fetch(url),
            getWhoisData(url)
          ]);
          
          const html = await pageRes.text();
          
          // Извлечение базовых SEO-данных
          const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || 'Не найден';
          const descriptionMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
          const description = descriptionMatch ? descriptionMatch[1] : 'Не найден';
          const h1 = html.match(/<h1.*?>(.*?)<\/h1>/i)?.[1] || 'Отсутствует';
          const h2Tags = [...html.matchAll(/<h2.*?>(.*?)<\/h2>/gi)].map(match => match[1]);
          const altTexts = [...html.matchAll(/<img[^>]+alt="([^"]*)"/gi)].map(match => match[1]);
          
          // Анализ микроразметки
          const schemaTypes = analyzeSchemaMarkup(html);
          
          // Подсчет контента
          const cleanHtml = cleanHtmlContent(html);
          const contentLength = cleanHtml.length;
          
          // Ключевые фразы
          const keywordStats = analyzeKeywords(cleanHtml, keyword);
          
          // Получаем данные PageSpeed Insights
          const pageSpeedData = await getPageSpeedData(url);
          
          // Получаем социальные шаринги
          const socialShares = await getSocialShares(url);
          
          return {
            url,
            status: pageRes.status,
            title,
            description,
            h1,
            h2: h2Tags,
            alts: altTexts,
            contentLength,
            keywordStats,
            schemaTypes,
            pageSpeed: pageSpeedData,
            whois: whoisData,
            socialShares,
            error: null
          };
        } catch (error) {
          console.error(`Error analyzing ${url}:`, error);
          return { 
            url, 
            error: 'Не удалось загрузить страницу',
            status: 500,
            title: null,
            description: null,
            h1: null,
            h2: null,
            alts: null,
            contentLength: null,
            keywordStats: null,
            schemaTypes: null,
            pageSpeed: null,
            whois: null,
            socialShares: null
          };
        }
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(analysis),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://privseo.ru',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
    } catch (error) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ error: 'Ошибка сервера', details: error.message }) 
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Метод не поддерживается' })
  };
};

// Вспомогательные функции
async function getWhoisData(url) {
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    const data = await whois(domain);
    
    return {
      domainAge: data.creationDate ? Math.floor((new Date() - new Date(data.creationDate)) / (1000 * 60 * 60 * 24 * 365) : null,
      registrar: data.registrar || null,
      expiryDate: data.expiryDate || null,
      updatedDate: data.updatedDate || null
    };
  } catch (error) {
    console.error('WHOIS error:', error);
    return null;
  }
}

function analyzeSchemaMarkup(html) {
  try {
    const schemaTypes = [];
    const schemaMatches = html.match(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi);
    
    if (schemaMatches) {
      schemaMatches.forEach(match => {
        try {
          const jsonStr = match.replace(/<script[^>]+>([\s\S]*?)<\/script>/i, '$1');
          const schema = JSON.parse(jsonStr);
          
          if (Array.isArray(schema)) {
            schema.forEach(item => {
              if (item['@type']) schemaTypes.push(item['@type']);
            });
          } else if (schema['@type']) {
            schemaTypes.push(schema['@type']);
          }
        } catch (e) {
          console.error('Error parsing schema:', e);
        }
      });
    }
    
    return [...new Set(schemaTypes)]; // Удаляем дубликаты
  } catch (error) {
    console.error('Schema analysis error:', error);
    return null;
  }
}

async function getPageSpeedData(url) {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=mobile`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    if (data.error) {
      console.error('PageSpeed API error:', data.error);
      return null;
    }
    
    return {
      performanceScore: data.lighthouseResult.categories.performance.score * 100,
      firstContentfulPaint: data.lighthouseResult.audits['first-contentful-paint'].displayValue,
      speedIndex: data.lighthouseResult.audits['speed-index'].displayValue,
      timeToInteractive: data.lighthouseResult.audits['interactive'].displayValue,
      recommendations: data.lighthouseResult.audits['diagnostics'].details.items.slice(0, 5)
    };
  } catch (error) {
    console.error('PageSpeed fetch error:', error);
    return null;
  }
}

async function getSocialShares(url) {
  try {
    const encodedUrl = encodeURIComponent(url);
    const services = {
      facebook: `https://www.facebook.com/plugins/like.php?href=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}`,
      vk: `https://vk.com/share.php?url=${encodedUrl}`
    };
    
    // В реальном проекте здесь должен быть парсинг счетчиков,
    // но так как это требует отдельных запросов, возвращаем просто ссылки
    return {
      facebook: services.facebook,
      twitter: services.twitter,
      vk: services.vk
    };
  } catch (error) {
    console.error('Social shares error:', error);
    return null;
  }
}

function cleanHtmlContent(html) {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function analyzeKeywords(text, keyword) {
  let exactCount = 0;
  let partialCount = 0;
  
  if (keyword && keyword.trim() !== '') {
    const keywordLower = keyword.toLowerCase();
    const textLower = text.toLowerCase();
    
    // Точное вхождение (учитываем словоформы)
    const regexExact = new RegExp(`\\b${keywordLower}\\b`, 'gi');
    exactCount = (text.match(regexExact) || []).length;
    
    // Неточное вхождение (подстрока)
    partialCount = textLower.split(keywordLower).length - 1;
  }
  
  return { exactCount, partialCount };
}