exports.handler = async (event) => {
  // Проверяем метод запроса
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Только POST-запросы!' };
  }

  try {
    const { urls } = JSON.parse(event.body);
    
    // Простейший анализ (заголовки, статус)
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
        'Access-Control-Allow-Origin': 'https://privseo.ru' // Разрешаем только ваш домен
      }
    };
  } catch (error) {
    return { statusCode: 500, body: 'Ошибка сервера' };
  }
};