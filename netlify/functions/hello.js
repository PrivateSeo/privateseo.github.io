exports.handler = async (event) => {
  // Разрешаем CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
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
          const urlObj = new URL(url.includes('://') ? url : `https://${url}`);
          const urlAnalysis = {
            length: urlObj.href.length,
            isDynamic: urlObj.search.length > 0,
            hasKeyword: keyword ? urlObj.href.toLowerCase().includes(keyword.toLowerCase()) : false
          };

          // Анализ контента
          const cleanHtml = html
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();

          const contentAnalysis = {
            length: cleanHtml.length,
            textToCodeRatio: (cleanHtml.length / html.length * 100).toFixed(2)
          };

          // Подсчет ключевых слов
          let keywordStats = { exactCount: 0, partialCount: 0 };
          if (keyword) {
            const keywordLower = keyword.toLowerCase();
            const textLower = cleanHtml.toLowerCase();
            const regexExact = new RegExp(`(^|\\s)${keywordLower}(\\s|$)`, 'gi');
            keywordStats.exactCount = (cleanHtml.match(regexExact) || []).length;
            keywordStats.partialCount = textLower.split(keywordLower).length - 1;
          }

          // Основные SEO-данные
          return {
            url,
            status: res.status,
            title: html.match(/<title>(.*?)<\/title>/i)?.[1] || 'Не найден',
            description: html.match(/<meta\s+name="description"\s+content="(.*?)"/i)?.[1] || 'Не найден',
            h1: html.match(/<h1.*?>(.*?)<\/h1>/i)?.[1] || 'Отсутствует',
            loadTime,
            urlAnalysis,
            contentAnalysis,
            keywordStats,
            error: null
          };
        } catch (error) {
          return { 
            url, 
            error: 'Ошибка загрузки страницы',
            status: 500
          };
        }
      }));

      return {
        statusCode: 200,
        body: JSON.stringify(analysis),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
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