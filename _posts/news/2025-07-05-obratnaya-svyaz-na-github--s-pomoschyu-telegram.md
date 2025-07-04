---
layout: news
name: "Обратная связь на GitHub, с помощью Telegram"
title: "Как сделать форму обратной связи на хостинге без PHP: GitHub, Telegram и немного магии"
description: "GitHub Pages не поддерживает PHP, но это не повод отказываться от обратной связи! Рассказываем, как легко и весело прикрутить Telegram-бота к статичному сайту."
date: 2025-07-05
image: "/assets/images/news/20250705_014756.webp"
category: backend
---

<p>Представьте: вы только что создали шикарный лендинг на GitHub Pages, Netlify или другом статичном хостинге (где PHP — это примерно как снег в Сахаре). Все прекрасно: дизайн блестит, анимации летают, код не пахнет. Но вот беда — форма обратной связи упорно отказывается работать.</p>
<p>"Ну как же так!" — восклицаете вы, потрясая кулаками в сторону GitHub. "Неужели придется переезжать на хостинг с PHP или, не дай бог, осваивать Node.js?!"</p>
<p>Спокойно, дорогой страдалец. Есть способ проще, элегантнее и даже… с котиками. Вернее, с Telegram.</p>
<h2>Telegram-бот: ваш новый лучший друг</h2>
<p>Пока PHP-энтузиасты копаются в настройках серверов, мы пойдем другим путем — отправим данные формы прямиком в Telegram. Почему?</p>
<p>Проще некуда: никаких серверов, баз данных и прочей черной магии.</p>
<p>Мгновенные уведомления: сообщения прилетают вам в личку (или чат) быстрее, чем сосед стучит по батарее.</p>
<p>Бесплатно и без смс: Telegram Bot API — джентльменский набор для ленивых гениев.</p>
<p>Примеры хостингов, где это сработает:</p>
<ul>
  <li>GitHub Pages</li>
  <li>Netlify (статичные сайты)</li>
  <li>Vercel (если не использовать бэкенд)</li>
</ul>
<h2>Приступаем к делу: создаем бота и прикручиваем форму</h2>
<p>Шаг 1. Заводим бота в Telegram</p>
<p>Находим @BotFather в Telegram, говорим ему /newbot.</p>
<p>Получаем токен (это как пароль, но для бота). Запишите его, а то потом будете рыть историю чата с криком "Куда я его дел?!"</p>
<p>Шаг 2. Узнаем ID чата</p>
<p>Отправьте любое сообщение в чат с ботом, затем перейдите по ссылке:</p>
<p>https://api.telegram.org/bot/getUpdates</p>
<p>В ответе ищите chat.id. Если ничего не поняли — просто создайте группу, добавьте туда бота и напишите "/id" — некоторые боты его показывают.</p>
<p>Шаг 3. Пишем HTML + JS форму</p>
<p>Вот код формы, который даже ваш кот сможет адаптировать (если, конечно, он не предпочитает Python):</p>
```html
<!DOCTYPE html>  
<html lang="ru">  
<head>  
  <meta charset="UTF-8">  
  <title>Форма обратной связи для ленивых</title>  
  <style>  
    body {  
      font-family: Arial, sans-serif;  
      max-width: 600px;  
      margin: 0 auto;  
      padding: 20px;  
      background: #f5f5f5;  
    }  
    .form-group {  
      margin-bottom: 15px;  
    }  
    input, textarea {  
      width: 100%;  
      padding: 10px;  
      border: 1px solid #ddd;  
      border-radius: 5px;  
    }  
    button {  
      background: #0088cc;  
      color: white;  
      border: none;  
      padding: 10px 20px;  
      border-radius: 5px;  
      cursor: pointer;  
    }  
    button:hover {  
      background: #006699;  
    }  
  </style>  
</head>  
<body>  
  <h1>Напишите нам (а мы вам в Telegram)</h1>  
  <form id="feedbackForm">  
    <div class="form-group">  
      <input type="text" name="name" placeholder="Ваше имя" required>  
    </div>  
    <div class="form-group">  
      <input type="email" name="email" placeholder="Email" required>  
    </div>  
    <div class="form-group">  
      <textarea name="message" placeholder="Ваше сообщение" rows="5" required></textarea>  
    </div>  
    <button type="submit">Отправить</button>  
  </form>  

  <script>  
    const form = document.getElementById('feedbackForm');  
    const BOT_TOKEN = 'ВАШ_ТОКЕН';  
    const CHAT_ID = 'ВАШ_CHAT_ID';  

    form.addEventListener('submit', (e) => {  
      e.preventDefault();  

      const formData = new FormData(form);  
      const text = `Новое сообщение!\nИмя: ${formData.get('name')}\nEmail: ${formData.get('email')}\nСообщение: ${formData.get('message')}`;  

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {  
        method: 'POST',  
        headers: { 'Content-Type': 'application/json' },  
        body: JSON.stringify({  
          chat_id: CHAT_ID,  
          text: text  
        })  
      })  
      .then(response => response.json())  
      .then(data => {  
        alert('Сообщение отправлено!');  
        form.reset();  
      })  
      .catch(error => {  
        alert('Ошибка: ' + error.message);  
      });  
    });  
  </script>  
</body>  
</html>  
```
<p>Форма обратной связи для ленивых</p>
<p>Шаг 4. Выкладываем на GitHub Pages и радуемся</p>
<p>Заливаем код в репозиторий.</p>
<p>Активируем GitHub Pages в настройках.</p>
<p>Профит! Теперь сообщения летят к вам в Telegram, а PHP так и не понадобился.</p>
<h2>Заключение: обратная связь без головной боли</h2>
<p>Теперь вы знаете, как обойти ограничения статичных хостингов и сделать форму обратной связи на чистом JS и Telegram API.</p>
<p>"Но что если бот сломается?" — спросит параноик.</p>
<p>"Тогда просто постучите в стену — вдруг сосед программист услышит."</p>
<p>P.S. Если код не работает — проверьте токен и chat_id. А если и это не помогло… Ну, бывает. Зато теперь вы знаете, что жизнь без PHP возможна!</p>
