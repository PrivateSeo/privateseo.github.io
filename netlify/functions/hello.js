// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Привет с Netlify-функции!" }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*" // Разрешаем запросы с GitHub Pages
    }
  };
};