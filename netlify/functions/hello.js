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
          const res = await fetch(url);
          const html = await res.text();
          
          // Извлечение title
          const title = html.match(/<title>(.*?)<\/title>/i)?.[1] || 'Не найден';
          
          // Извлечение description
          const descriptionMatch = html.match(/<meta\s+name="description"\s+content="(.*?)"/i);
          const description = descriptionMatch ? descriptionMatch[1] : 'Не найден';
          
          // Извлечение h1 и h2
          const h1 = html.match(/<h1.*?>(.*?)<\/h1>/i)?.[1] || 'Отсутствует';
          const h2Tags = [...html.matchAll(/<h2.*?>(.*?)<\/h2>/gi)].map(match => match[1]);
          
          // Извлечение alt текстов изображений
          const altTexts = [...html.matchAll(/<img[^>]+alt="([^"]*)"/gi)].map(match => match[1]);
          
          // Подсчет контента (без тегов, скриптов, стилей)
          const cleanHtml = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          const contentLength = cleanHtml.length;
          
          // Подсчет вхождений ключевой фразы
          let exactCount = 0;
          let partialCount = 0;
          
          if (keyword && keyword.trim() !== '') {
            const keywordLower = keyword.toLowerCase();
            const textLower = cleanHtml.toLowerCase();
            
            // Точное вхождение (учитываем словоформы)
            const regexExact = new RegExp(`\\b${keywordLower}\\b`, 'gi');
            exactCount = (cleanHtml.match(regexExact) || []).length;
            
            // Неточное вхождение (подстрока)
            partialCount = textLower.split(keywordLower).length - 1;
          }

          // Проверка микроразметки
          const schemaOrg = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
            .map(match => match[1])
            .filter(json => {
              try {
                JSON.parse(json);
                return true;
              } catch {
                return false;
              }
            }).length;

          // Социальные шаринги
          const ogTags = {
            title: html.match(/<meta[^>]+property=["']og:title["'][^>]+content=["']([^"']*)["']/i)?.[1],
            description: html.match(/<meta[^>]+property=["']og:description["'][^>]+content=["']([^"']*)["']/i)?.[1],
            image: html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']*)["']/i)?.[1]
          };

          // WHOIS информация (заглушка)
          const domain = new URL(url).hostname;
          const whoisInfo = {
            domain,
            created: null,
            expires: null,
            registrar: null
          };

          // PageSpeed Insights (заглушка)
          const pageSpeedInsights = {
            performance: Math.floor(Math.random() * 100),
            accessibility: Math.floor(Math.random() * 100),
            bestPractices: Math.floor(Math.random() * 100),
            seo: Math.floor(Math.random() * 100)
          };
          
          return {
            url,
            status: res.status,
            title,
            description,
            h1,
            h2: h2Tags,
            alts: altTexts,
            contentLength,
            keywordStats: {
              exactCount,
              partialCount
            },
            structuredData: {
              schemaOrgCount: schemaOrg,
              ogTags
            },
            whois: whoisInfo,
            pageSpeed: pageSpeedInsights,
            error: null
          };
        } catch (error) {
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
            structuredData: null,
            whois: null,
            pageSpeed: null
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