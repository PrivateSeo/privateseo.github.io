const { Telegraf } = require('telegraf');

exports.handler = async (event) => {
  console.log('Portfolio bot called');
  
  return {
    statusCode: 200,
    body: JSON.stringify({ 
      status: 'Bot endpoint is ready',
      message: 'Теперь нужно настроить вебхук'
    })
  };
};