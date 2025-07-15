exports.handler = async (event) => {
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

  if (event.httpMethod === 'POST') {
    try {
      const { urls, keyword } = JSON.parse(event.body);
      
      const analysis = await Promise.all(urls.map(async (url) => {
        try {
          const startTime = Date.now();
          const res = await fetch(url);
          const html = await res.text();
          const loadTime = Date.now() - startTime;

          // Анализ URL
          const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
          const urlPath = urlObj.pathname;
          const isDynamicUrl = urlPath.includes('?') || urlPath.includes('&');
          const urlLength = url.length;
          const hasKeywordInUrl = keyword ? urlObj.href.toLowerCase().includes(keyword.toLowerCase()) : false;

          // Анализ контента
          const cleanHtml = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const contentLength = cleanHtml.length;
          const textToCodeRatio = (contentLength / html.length * 100).toFixed(2);

          // Подсчет ключевых слов
          let exactCount = 0;
          let partialCount = 0;
          if (keyword && keyword.trim() !== '') {
            const keywordLower = keyword.toLowerCase();
            const textLower = cleanHtml.toLowerCase();
            const regexExact = new RegExp(`(^|\\s)${keywordLower}(\\s|$)`, 'gi');
            exactCount = (cleanHtml.match(regexExact) || []).length;
            partialCount = textLower.split(keywordLower).length - 1;
          }

          return {
            url,
            status: res.status,
            loadTime,
            urlAnalysis: {
              length: urlLength,
              isDynamic: isDynamicUrl,
              hasKeyword: hasKeywordInUrl,
              path: urlPath
            },
            contentAnalysis: {
              length: contentLength,
              textToCodeRatio,
              exactCount,
              partialCount
            },
            // ... остальные существующие поля ...
          };
        } catch (error) {
          return { 
            url, 
            error: 'Не удалось загрузить страницу',
            status: 500
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
        body: JSON.stringify({ error: 'Ошибка сервера' }) 
      };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Метод не поддерживается' })
  };
};