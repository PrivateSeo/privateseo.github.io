const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async (event) => {
  const url = event.queryStringParameters.url;

  if (!url) {
    return { statusCode: 400, body: 'Укажите URL' };
  }

  try {
    // Загружаем HTML страницы
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    // Извлекаем SEO-данные
    const title = $('title').text();
    const h1 = $('h1').text();
    const metaDescription = $('meta[name="description"]').attr('content');

    return {
      statusCode: 200,
      body: JSON.stringify({ title, h1, metaDescription }),
    };
  } catch (error) {
    return { statusCode: 500, body: 'Ошибка загрузки страницы' };
  }
};