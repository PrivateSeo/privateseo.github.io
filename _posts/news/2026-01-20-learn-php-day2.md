---
layout: news
name: "День 2: Переменные и типы данных в PHP"
title: "PHP обучение с нуля: День 2 - Переменные, типы данных и работа с информацией"
description: "Изучаем переменные в PHP, основные типы данных, работу со строками и числами. Практические примеры для реальных проектов."
date: 2026-01-20
image: "/images/learn-php/learn-php01.webp"
category: php
news_id: 8c52679120b947c3
---
<div class="goal-box">
<h3 class="goal-title">🎯 Цель урока</h3>
<p>Научиться создавать переменные в PHP, понимать основные типы данных и использовать их в простых примерах. Узнать, как хранить и изменять информацию в программе.</p>
</div>

<section class="section theory">
<h2 class="section-title">📚 Теоретическая часть (30 минут)</h2>

<div class="card">
<h3><span class="icon">📦</span> Что такое переменная? Простыми словами</h3>

<p>Представьте, что <strong>переменная</strong> — это коробка с наклейкой. Наклейка — это имя переменной, а то, что лежит внутри коробки — её значение.</p>

<div class="key-points">
<h4>🎯 Зачем нужны переменные?</h4>
<ul>
<li><strong>Хранить информацию</strong> — как записная книжка</li>
<li><strong>Использовать много раз</strong> — один раз записали, много раз прочитали</li>
<li><strong>Легко менять</strong> — обновили значение в одном месте</li>
</ul>
</div>

<div class="simple-example">
<h4>📝 Простой пример из жизни:</h4>
<p>Вы говорите другу: "<strong>Оставь книгу на столе</strong>".</p>
<ul>
<li><code>"стол"</code> — это переменная (имя)</li>
<li><code>ваш письменный стол</code> — это значение</li>
<li>Друг знает, куда положить книгу</li>
</ul>
</div>

<div class="note">
<p><strong>💡 Запомните:</strong> Все переменные в PHP начинаются со знака <code>$</code> (доллар). Это как красная наклейка "Внимание, здесь переменная!"</p>
</div>
</div>

<div class="card">
<h3><span class="icon">🏷️</span> Как правильно называть переменные?</h3>

<p>Имя переменной должно быть понятным, как название папки на компьютере.</p>

<div class="comparison-table table--small">
<table>
<caption>Хорошие и плохие имена</caption>
<thead>
<tr>
	<th>✅ Хорошо</th>
	<th>❌ Плохо</th>
	<th>Почему?</th>
</tr>
</thead>
<tbody>
<tr>
	<td><code>$name</code></td>
	<td><code>$n</code></td>
	<td>"name" понятнее, чем "n"</td>
</tr>
<tr>
	<td><code>$age</code></td>
	<td><code>$a</code></td>
	<td>Через месяц поймете, что значит</td>
</tr>
<tr>
	<td><code>$user_name</code></td>
	<td><code>$user name</code></td>
	<td>Нельзя использовать пробелы</td>
</tr>
<tr>
	<td><code>$count2</code></td>
	<td><code>$2count</code></td>
	<td>Нельзя начинать с цифры</td>
</tr>
</tbody>
</table>
</div>

<div class="key-points">
<h4>📋 Простые правила:</h4>
<ol>
<li>Начинается с <code>$</code></li>
<li>Потом буква или <code>_</code></li>
<li>Могут быть буквы, цифры, <code>_</code></li>
<li>Без пробелов и спецсимволов</li>
<li>Лучше по-английски</li>
</ol>
</div>
</div>

<div class="card">
<h3><span class="icon">🎭</span> Простые типы данных</h3>

<p>В PHP есть несколько "видов" данных, которые можно положить в переменную.</p>

<div class="simple-types">
<div class="type-box">
<h4>1. 📝 Текст (строка)</h4>
<p>Любой текст в кавычках</p>
<pre><code>$name = "Анна";
$city = 'Москва';
$message = "Привет!";</code></pre>
<p><strong>Пример:</strong> Имя пользователя, город, сообщение</p>
</div>

<div class="type-box">
<h4>2. 🔢 Числа</h4>
<p>Цифры без кавычек</p>
<pre><code>$age = 25;
$price = 1000;
$count = 5;</code></pre>
<p><strong>Пример:</strong> Возраст, цена, количество</p>
</div>

<div class="type-box">
<h4>3. ✅❌ Да/Нет (булево)</h4>
<p>Только <code>true</code> (да) или <code>false</code> (нет)</p>
<pre><code>$is_online = true;
$has_car = false;
$is_admin = true;</code></pre>
<p><strong>Пример:</strong> Онлайн ли пользователь, есть ли машина</p>
</div>

<div class="type-box">
<h4>4. 🎁 Пустота</h4>
<p>Когда ничего нет</p>
<pre><code>$middle_name = null;
$avatar = null;</code></pre>
<p><strong>Пример:</strong> Отчество не указано, аватар не загружен</p>
</div>
</div>

<div class="note">
<p><strong>💡 Важно:</strong> PHP сам понимает, какой тип данных вы используете. Вам не нужно его указывать.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">🔍</span> Как посмотреть, что в переменной?</h3>

<p>Часто нужно проверить, что хранится в переменной. Для этого есть команда <code>var_dump()</code>.</p>

<div class="simple-example">
<h4>📊 Сравнение вывода:</h4>
<pre><code>$age = 25;

// Просто выводит значение
echo $age;        // Выведет: 25

// Показывает ВСЁ о переменной
var_dump($age);   // Выведет: int(25)</code></pre>
<p><code>int(25)</code> означает: "целое число со значением 25"</p>
</div>

<div class="key-points">
<h4>🎯 Когда использовать var_dump()?</h4>
<ul>
<li>Когда что-то не работает</li>
<li>Чтобы понять, что на самом деле в переменной</li>
<li>Для проверки типа данных</li>
<li>При обучении (прямо сейчас!)</li>
</ul>
</div>
</div>
</section>

<section class="section practice">
<h2 class="section-title">💻 Практическая часть (1.5 часа)</h2>

<div class="task">
<h3><span class="icon">✅</span> Шаг 1: Создаем первый файл</h3>

<ol>
<li>В папке <code>php_course</code> создайте файл <code>day2.php</code></li>
<li>Откройте его в редакторе</li>
<li>Напишите базовый код:
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Мои первые переменные&lt;/title&gt;
&lt;style&gt;
body { font-family: Arial; padding: 20px; }
.info { background: #f0f8ff; padding: 15px; margin: 10px 0; }
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Знакомство с переменными&lt;/h1&gt;
&lt;?php
// Здесь будем писать код
?&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</li>
</ol>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 2: Первые переменные</h3>

<p>В разделе PHP добавьте код:</p>

<pre><code>&lt;?php
// Создаем переменные
$my_name = "Алексей";
$my_age = 20;
$my_city = "Москва";
$i_love_php = true;

// Выводим на экран
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Обо мне:&lt;/h3&gt;";
echo "&lt;p&gt;Меня зовут: $my_name&lt;/p&gt;";
echo "&lt;p&gt;Мне $my_age лет&lt;/p&gt;";
echo "&lt;p&gt;Я живу в $my_city&lt;/p&gt;";
echo "&lt;p&gt;Я изучаю PHP: " . ($i_love_php ? "Да" : "Нет") . "&lt;/p&gt;";
echo "&lt;/div&gt;";
?&gt;</code></pre>

<div class="note">
<p><strong>✏️ Задание:</strong> Измените значения переменных на свои данные и обновите страницу.</p>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 3: Изучаем var_dump()</h3>

<p>Добавьте после предыдущего кода:</p>

<pre><code>&lt;?php
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Что на самом деле в переменных?&lt;/h3&gt;";

echo "&lt;p&gt;1. Переменная \$my_name: &lt;/p&gt;";
var_dump($my_name); // string(7) "Алексей"

echo "&lt;p&gt;2. Переменная \$my_age: &lt;/p&gt;";
var_dump($my_age);  // int(20)

echo "&lt;p&gt;3. Переменная \$i_love_php: &lt;/p&gt;";
var_dump($i_love_php); // bool(true)

echo "&lt;/div&gt;";
?&gt;</code></pre>

<div class="key-points">
<h4>📖 Что показывает var_dump()?</h4>
<ul>
<li><code>string(7)</code> — строка из 7 букв</li>
<li><code>int(20)</code> — целое число 20</li>
<li><code>bool(true)</code> — логическое значение "да"</li>
</ul>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 4: Изменяем переменные</h3>

<p>Переменные можно менять! Добавьте этот код:</p>

<pre><code>&lt;?php
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Меняем значения&lt;/h3&gt;";

// Начальное значение
$counter = 1;
echo "&lt;p&gt;Счетчик был: $counter&lt;/p&gt;";

// Увеличиваем на 1
$counter = $counter + 1;
echo "&lt;p&gt;Счетчик стал: $counter&lt;/p&gt;";

// Еще раз увеличиваем
$counter = $counter + 1;
echo "&lt;p&gt;Счетчик теперь: $counter&lt;/p&gt;";

echo "&lt;/div&gt;";

// Пример с текстом
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Работа с текстом&lt;/h3&gt;";

$greeting = "Привет";
echo "&lt;p&gt;Было: $greeting&lt;/p&gt;";

$greeting = $greeting . ", друг!";
echo "&lt;p&gt;Стало: $greeting&lt;/p&gt;";

$greeting = $greeting . " Как дела?";
echo "&lt;p&gt;Теперь: $greeting&lt;/p&gt;";

echo "&lt;/div&gt;";
?&gt;</code></pre>

<div class="note">
<p><strong>💡 Точка (.)</strong> соединяет строки. <code>"Привет" . ", друг!"</code> = <code>"Привет, друг!"</code></p>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 5: Простые расчеты</h3>

<p>Попробуем посчитать что-нибудь полезное:</p>

<pre><code>&lt;?php
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Магазин фруктов&lt;/h3&gt;";

// Цены
$apple_price = 50;   // рублей за кг
$banana_price = 80;  // рублей за кг

// Количество
$apple_kg = 2;
$banana_kg = 1.5;

// Расчет
$apple_cost = $apple_price * $apple_kg;
$banana_cost = $banana_price * $banana_kg;
$total = $apple_cost + $banana_cost;

// Вывод
echo "&lt;p&gt;🍎 Яблоки: $apple_kg кг × $apple_price руб = $apple_cost руб&lt;/p&gt;";
echo "&lt;p&gt;🍌 Бананы: $banana_kg кг × $banana_price руб = $banana_cost руб&lt;/p&gt;";
echo "&lt;p&gt;&lt;strong&gt;💵 Итого: $total рублей&lt;/strong&gt;&lt;/p&gt;";

echo "&lt;/div&gt;";

// Проверяем типы
echo "&lt;div class='info'&gt;";
echo "&lt;h3&gt;Проверка типов&lt;/h3&gt;";

echo "apple_price: "; var_dump($apple_price);
echo "&lt;br&gt;apple_kg: "; var_dump($apple_kg);
echo "&lt;br&gt;apple_cost: "; var_dump($apple_cost);
echo "&lt;br&gt;total: "; var_dump($total);

echo "&lt;/div&gt;";
?&gt;</code></pre>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 6: Простая форма</h3>

<p>Давайте сделаем простую страницу-визитку:</p>

<pre><code>&lt;?php
echo "&lt;div class='info' style='background:#e8f5e9;'&gt;";
echo "&lt;h3&gt;👤 Моя визитка&lt;/h3&gt;";

// Данные
$first_name = "Мария";
$last_name = "Петрова";
$profession = "Веб-разработчик";
$skills = "HTML, CSS, PHP";
$experience = 1; // год

// Формируем визитку
echo "&lt;div style='border:2px solid #4caf50; padding:20px; border-radius:10px;'&gt;";
echo "&lt;h4&gt;$first_name $last_name&lt;/h4&gt;";
echo "&lt;p&gt;&lt;strong&gt;Профессия:&lt;/strong&gt; $profession&lt;/p&gt;";
echo "&lt;p&gt;&lt;strong&gt;Навыки:&lt;/strong&gt; $skills&lt;/p&gt;";
echo "&lt;p&gt;&lt;strong&gt;Опыт:&lt;/strong&gt; $experience год&lt;/p&gt;";
echo "&lt;p&gt;&lt;strong&gt;Контакты:&lt;/strong&gt; example@mail.ru&lt;/p&gt;";
echo "&lt;p&gt;&lt;strong&gt;Дата создания:&lt;/strong&gt; " . date("d.m.Y") . "&lt;/p&gt;";
echo "&lt;/div&gt;";

echo "&lt;/div&gt;";
?&gt;</code></pre>

<div class="note">
<p><strong>✏️ Задание:</strong> Создайте свою визитку с другими данными. Попробуйте добавить новые переменные: хобби, образование, язык программирования.</p>
</div>
</div>

<div class="task">
<h3><span class="icon">🧪</span> Эксперименты</h3>

<p>Попробуйте изменить код и посмотреть, что будет:</p>

<div class="experiment">
<h4>Эксперимент 1: Ошибки в именах</h4>
<pre><code>// Что будет?
$my name = "Анна"; // Ошибка! Пробел
$123name = "Иван"; // Ошибка! Начинается с цифры
$name = "Петр";    // Работает
echo $name;</code></pre>
</div>

<div class="experiment">
<h4>Эксперимент 2: Изменение типа</h4>
<pre><code>$variable = 100;
var_dump($variable); // int(100)

$variable = "Сто";
var_dump($variable); // string(6) "Сто"

$variable = true;
var_dump($variable); // bool(true)</code></pre>
<p>PHP позволяет менять тип переменной!</p>
</div>

<div class="experiment">
<h4>Эксперимент 3: Пустые значения</h4>
<pre><code>$empty_var = null;
var_dump($empty_var); // NULL

$empty_string = "";
var_dump($empty_string); // string(0) ""

$zero = 0;
var_dump($zero); // int(0)</code></pre>
<p>null, пустая строка и ноль — это разные вещи!</p>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">📋 Домашнее задание</h2>

<div class="homework">
<h3><span class="icon">✏️</span> Задание на день 2</h3>

<p>Создайте файл <code>homework_day2.php</code> и выполните:</p>

<ol>
<li><strong>Простая анкета:</strong>
<ul>
<li>Создайте переменные: имя, возраст, город, любимый цвет</li>
<li>Выведите их красиво на странице</li>
<li>Добавьте var_dump() для каждой переменной</li>
</ul>
</li>

<li><strong>Калькулятор покупок:</strong>
<ul>
<li>Вы покупаете 3 товара: хлеб (40 руб), молоко (80 руб), сыр (300 руб)</li>
<li>Создайте переменные для цен и количеств</li>
<li>Посчитайте общую сумму</li>
<li>Добавьте скидку 10% и посчитайте итог</li>
</ul>
</li>

<li><strong>Счетчик дней:</strong>
<ul>
<li>Создайте переменную <code>$days = 0</code></li>
<li>Увеличьте её на 1, потом на 2, потом на 5</li>
<li>Выведите каждый раз текущее значение</li>
<li>В конце выведите: "Прошло X дней"</li>
</ul>
</li>

<li><strong>Соединение строк:</strong>
<ul>
<li>Создайте переменные: <code>$part1 = "Привет"</code>, <code>$part2 = ", мир!"</code></li>
<li>Соедините их в одну строку</li>
<li>Добавьте " Я изучаю PHP."</li>
<li>Выведите готовое предложение</li>
</ul>
</li>
</ol>

<div class="note">
<p><strong>💡 Подсказка:</strong> Не бойтесь ошибаться! Если что-то не работает — используйте var_dump() чтобы понять, в чем проблема.</p>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">🧠 Проверка понимания</h2>

<div class="quiz">
<h3><span class="icon">❓</span> Простые вопросы</h3>

<ol>
<li>Как начинается каждая переменная в PHP?</li>
<li>Можно ли назвать переменную <code>$my name</code> (с пробелом)?</li>
<li>Что выведет <code>echo 10 + 5</code>?</li>
<li>Чем отличается <code>echo</code> от <code>var_dump()</code>?</li>
<li>Как соединить две строки?</li>
<li>Что означает <code>int(25)</code> в выводе var_dump?</li>
<li>Можно ли изменить значение переменной?</li>
<li>Что такое <code>null</code>?</li>
<li>Как записать "да" в булевой переменной?</li>
<li>Зачем нужны переменные?</li>
</ol>

<button onclick="toggleAnswers()" class="button button--primary" style="margin-top: 20px;">Показать ответы</button>

<div id="answers" style="display: none; margin-top: 20px; padding: 20px; background: var(--light-color); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
<h4>Ответы:</h4>
<ol>
<li>Со знака <code>$</code> (доллар)</li>
<li>Нет, пробелы не разрешены</li>
<li><code>15</code> (результат сложения)</li>
<li><code>echo</code> просто выводит, <code>var_dump()</code> показывает ещё и тип</li>
<li>С помощью точки: <code>$str1 . $str2</code></li>
<li>Целое число со значением 25</li>
<li>Да, можно: <code>$x = 10; $x = 20;</code></li>
<li>Пустота, отсутствие значения</li>
<li><code>$answer = true;</code></li>
<li>Хранить информацию и использовать её много раз</li>
</ol>
</div>
</div>
</section>

<section class="section resources">
<h2 class="section-title">🔗 Полезные ссылки</h2>

<div class="resource-list">
<div class="resource-item">
<a href="https://www.php.net/manual/ru/language.variables.basics.php" target="_blank">Основы переменных в PHP</a>
<p>Официальная документация на русском</p>
</div>
<div class="resource-item">
<a href="https://www.w3schools.com/php/php_variables.asp" target="_blank">Переменные для начинающих</a>
<p>Простые примеры и упражнения</p>
</div>
<div class="resource-item">
<a href="https://puzzleweb.ru/php/3_variables.php" target="_blank">Урок про переменные</a>
<p>Объяснение на русском с картинками</p>
</div>
</div>
</section>

<script>
function toggleAnswers() {
const answers = document.getElementById('answers');
const button = event.target;

if (answers.style.display === 'none') {
answers.style.display = 'block';
button.textContent = 'Скрыть ответы';
} else {
answers.style.display = 'none';
button.textContent = 'Показать ответы';
}
}

// Простые интерактивные примеры
document.addEventListener('DOMContentLoaded', function() {
// Подсветка кода при клике
const codeBlocks = document.querySelectorAll('pre');

codeBlocks.forEach(block => {
block.addEventListener('click', function() {
const text = this.textContent;
navigator.clipboard.writeText(text).then(() => {
// Простая анимация
this.style.backgroundColor = '#e8f5e9';
setTimeout(() => {
this.style.backgroundColor = '';
}, 500);
});
});

// Подсказка
block.title = 'Кликните, чтобы скопировать код';
block.style.cursor = 'pointer';
});

// Простая анимация для карточек типов
const typeBoxes = document.querySelectorAll('.type-box');
typeBoxes.forEach((box, index) => {
box.style.animationDelay = `${index * 0.2}s`;
box.style.opacity = '0';
box.style.transform = 'translateY(20px)';

setTimeout(() => {
box.style.transition = 'all 0.5s ease';
box.style.opacity = '1';
box.style.transform = 'translateY(0)';
}, 100 + index * 100);
});
});

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const target = document.querySelector(this.getAttribute('href'));
if (target) {
target.scrollIntoView({
behavior: 'smooth',
block: 'start'
});
}
});
});
</script>