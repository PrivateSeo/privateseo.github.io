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
      const { urls } = JSON.parse(event.body);
      
      const analysis = await Promise.all(urls.map(async (url) => {
        try {
          const res = await fetch(url);
          const html = await res.text();
          return {
            url,
            status: res.status,
            title: html.match(/<title>(.*?)<\/title>/i)?.[1] || 'Не найден',
            h1: html.match(/<h1>(.*?)<\/h1>/i)?.[1] || 'Отсутствует'
          };
        } catch (error) {
          return { url, error: 'Не удалось загрузить' };
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
      return { statusCode: 500, body: JSON.stringify({ error: 'Ошибка сервера' }) };
    }
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Метод не поддерживается' })
  };
};