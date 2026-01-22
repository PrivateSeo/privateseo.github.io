---
layout: news
name: "День 3: Операторы в PHP - математика и сравнения"
title: "PHP обучение: День 3 - Математические операторы и сравнение значений"
description: "Изучаем арифметические операторы PHP: сложение, вычитание, умножение, деление. Учимся сравнивать значения и понимать разницу между == и ===. Практические примеры для начинающих."
date: 2026-01-21
image: "/images/learn-php/learn-php02.webp"
category: php
news_id: 8c5267779ss47c3
---
<style>

.goal-box {
background: linear-gradient(135deg, #667eea15, #764ba215);
border-left: 4px solid var(--primary-color);
padding: 25px;
margin-bottom: 30px;
border-radius: var(--border-radius);
}

.goal-title {
color: var(--primary-color);
font-size: 1.5em;
margin-bottom: 15px;
display: flex;
align-items: center;
gap: 10px;
}

.section {
margin: 40px 0;
}

.section-title {
color: var(--primary-color);
font-size: 2em;
margin-bottom: 25px;
padding-bottom: 10px;
border-bottom: 3px solid var(--primary-color);
}

.card {
background: var(--light-color);
padding: 25px;
margin: 20px 0;
border-radius: var(--border-radius);
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.card h3 {
color: var(--dark-color);
font-size: 1.4em;
margin-bottom: 15px;
display: flex;
align-items: center;
gap: 10px;
}

.icon {
font-size: 1.2em;
}

.key-points {
background: white;
padding: 20px;
border-radius: var(--border-radius);
margin: 15px 0;
}

.key-points h4 {
color: var(--primary-color);
margin-bottom: 12px;
font-size: 1.1em;
}

.key-points ul, .key-points ol {
margin-left: 25px;
}

.key-points li {
margin: 8px 0;
line-height: 1.8;
}

.simple-example {
background: #fff9e6;
border-left: 4px solid var(--warning-color);
padding: 20px;
margin: 15px 0;
border-radius: var(--border-radius);
}

.simple-example h4 {
color: var(--warning-color);
margin-bottom: 12px;
}

.note {
background: #e6f7ff;
border-left: 4px solid #1890ff;
padding: 20px;
margin: 15px 0;
border-radius: var(--border-radius);
}

.note p {
margin: 5px 0;
}

.operator-box {
background: white;
padding: 20px;
margin: 15px 0;
border-radius: var(--border-radius);
border: 2px solid #e2e8f0;
}

.operator-box h4 {
color: var(--primary-color);
margin-bottom: 15px;
font-size: 1.2em;
display: flex;
align-items: center;
gap: 10px;
}

.operator-table {
width: 100%;
margin: 15px 0;
border-collapse: collapse;
background: white;
border-radius: var(--border-radius);
overflow: hidden;
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.operator-table th {
background: var(--primary-color);
color: white;
padding: 15px;
text-align: left;
font-weight: 600;
}

.operator-table td {
padding: 12px 15px;
border-bottom: 1px solid #e2e8f0;
}

.operator-table tr:hover {
background: var(--light-color);
}

.operator-table code {
background: #f1f5f9;
padding: 3px 8px;
border-radius: 4px;
font-family: 'Courier New', monospace;
color: #e83e8c;
font-size: 0.95em;
}

pre {
background: #2d3748;
color: #e2e8f0;
padding: 20px;
border-radius: var(--border-radius);
overflow-x: auto;
margin: 15px 0;
font-family: 'Courier New', monospace;
line-height: 1.6;
}

code {
background: #f1f5f9;
padding: 2px 6px;
border-radius: 4px;
font-family: 'Courier New', monospace;
color: #e83e8c;
font-size: 0.9em;
}

pre code {
background: transparent;
padding: 0;
color: #e2e8f0;
font-size: 0.95em;
}

.task {
background: linear-gradient(135deg, #48bb7815, #38a16915);
border-left: 4px solid var(--success-color);
padding: 25px;
margin: 25px 0;
border-radius: var(--border-radius);
}

.task h3 {
color: var(--success-color);
margin-bottom: 15px;
font-size: 1.3em;
}

.task ol, .task ul {
margin-left: 25px;
}

.task li {
margin: 10px 0;
line-height: 1.8;
}

.experiment {
background: #fff5f5;
border: 2px dashed var(--danger-color);
padding: 20px;
margin: 15px 0;
border-radius: var(--border-radius);
}

.experiment h4 {
color: var(--danger-color);
margin-bottom: 12px;
}

.homework {
background: linear-gradient(135deg, #ed893615, #f5656515);
padding: 30px;
border-radius: var(--border-radius);
border: 3px solid var(--warning-color);
}

.homework h3 {
color: var(--warning-color);
margin-bottom: 20px;
font-size: 1.4em;
}

.homework ol {
margin-left: 25px;
}

.homework li {
margin: 15px 0;
line-height: 1.8;
}

.quiz {
background: var(--light-color);
padding: 25px;
border-radius: var(--border-radius);
}

.quiz h3 {
color: var(--primary-color);
margin-bottom: 20px;
}

.quiz ol {
margin-left: 25px;
}

.quiz li {
margin: 12px 0;
line-height: 1.8;
font-weight: 500;
}

.button {
padding: 12px 30px;
border: none;
border-radius: var(--border-radius);
font-size: 1em;
cursor: pointer;
transition: all 0.3s ease;
font-weight: 600;
}

.button--primary {
background: var(--primary-color);
color: white;
}

.button--primary:hover {
background: var(--secondary-color);
transform: translateY(-2px);
box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.resource-list {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 20px;
margin-top: 20px;
}

.resource-item {
background: var(--light-color);
padding: 20px;
border-radius: var(--border-radius);
box-shadow: 0 2px 8px rgba(0,0,0,0.1);
transition: transform 0.3s ease;
}

.resource-item:hover {
transform: translateY(-5px);
box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

.resource-item a {
color: var(--primary-color);
text-decoration: none;
font-weight: 600;
font-size: 1.1em;
}

.resource-item a:hover {
text-decoration: underline;
}

.resource-item p {
color: #718096;
margin-top: 8px;
}

.comparison-box {
display: grid;
grid-template-columns: 1fr 1fr;
gap: 20px;
margin: 20px 0;
}

.comparison-item {
background: white;
padding: 20px;
border-radius: var(--border-radius);
}

.comparison-item.correct {
border: 2px solid var(--success-color);
}

.comparison-item.incorrect {
border: 2px solid var(--danger-color);
}

.comparison-item h5 {
margin-bottom: 10px;
}

.comparison-item.correct h5 {
color: var(--success-color);
}

.comparison-item.incorrect h5 {
color: var(--danger-color);
}

@media (max-width: 768px) {
.header h1 {
font-size: 1.8em;
}
.content {
padding: 20px;
}
.comparison-box {
grid-template-columns: 1fr;
}
}
</style>
<div class="goal-box">
<h3 class="goal-title">🎯 Цель урока</h3>
<p>Научиться использовать операторы в PHP для выполнения математических расчетов, сравнения значений и изменения переменных. Понять разницу между разными типами операторов и научиться применять их на практике.</p>
</div>

<section class="section theory">
<h2 class="section-title">📚 Теоретическая часть (45 минут)</h2>

<div class="card" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">🧮</span> Что такое операторы? Простыми словами</h3>

<p><strong>Операторы</strong> — это специальные символы, которые говорят PHP, что делать с данными. Это как математические знаки в школе: плюс, минус, равно.</p>

<div class="simple-example">
<h4>📝 Простой пример из жизни:</h4>
<p>У вас есть 5 яблок, вам дали еще 3. Вы используете оператор сложения:</p>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>5 + 3 = 8</code></pre>
<p>В PHP это будет:</p>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>$apples = 5 + 3; // $apples теперь равно 8</code></pre>
</div>

<div class="note">
<p><strong>💡 Запомните:</strong> Операторы работают с переменными и значениями, возвращая результат. Этот результат можно сохранить в переменную или использовать сразу.</p>
</div>
</div>

<div class="card" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">➕</span> Арифметические операторы</h3>

<p>Это операторы для математических вычислений. Такие же, как в калькуляторе!</p>

<table class="operator-table">
<thead>
<tr>
<th>Оператор</th>
<th>Название</th>
<th>Пример</th>
<th>Результат</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>+</code></td>
<td>Сложение</td>
<td><code>$a = 5 + 3;</code></td>
<td>8</td>
</tr>
<tr>
<td><code>-</code></td>
<td>Вычитание</td>
<td><code>$b = 10 - 4;</code></td>
<td>6</td>
</tr>
<tr>
<td><code>*</code></td>
<td>Умножение</td>
<td><code>$c = 7 * 2;</code></td>
<td>14</td>
</tr>
<tr>
<td><code>/</code></td>
<td>Деление</td>
<td><code>$d = 20 / 4;</code></td>
<td>5</td>
</tr>
<tr>
<td><code>%</code></td>
<td>Остаток от деления</td>
<td><code>$e = 10 % 3;</code></td>
<td>1</td>
</tr>
<tr>
<td><code>**</code></td>
<td>Возведение в степень</td>
<td><code>$f = 2 ** 3;</code></td>
<td>8</td>
</tr>
</tbody>
</table>

<div class="operator-box">
<h4>🤔 Что такое остаток от деления?</h4>
<p>Это то, что остается, когда число не делится нацело.</p>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>// Пример: 10 конфет делим на 3 детей
$candies = 10;
$children = 3;

$per_child = 10 / 3;  // 3.333... (каждому по 3)
$remaining = 10 % 3;  // 1 (остается 1 конфета)

// 10 ÷ 3 = 3 (и 1 в остатке)</code></pre>
</div>

<div class="simple-example">
<h4>📊 Практические примеры:</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>// Расчет площади комнаты
$width = 5;   // метров
$length = 4;  // метров
$area = $width * $length; // 20 квадратных метров

// Деление счета в кафе
$total_bill = 1200;  // рублей
$people = 4;
$per_person = $total_bill / $people; // 300 рублей

// Проверка четности числа
$number = 17;
$remainder = $number % 2; // 1 - нечетное, 0 - четное</code></pre>
</div>
</div>

<div class="card" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">⚖️</span> Операторы сравнения</h3>

<p>Эти операторы сравнивают два значения и возвращают <code>true</code> (правда) или <code>false</code> (ложь).</p>

<table class="operator-table">
<thead>
<tr>
<th>Оператор</th>
<th>Название</th>
<th>Пример</th>
<th>Когда true?</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>==</code></td>
<td>Равно</td>
<td><code>5 == 5</code></td>
<td>Значения равны</td>
</tr>
<tr>
<td><code>===</code></td>
<td>Строго равно</td>
<td><code>5 === "5"</code></td>
<td>Значения И типы равны</td>
</tr>
<tr>
<td><code>!=</code> или <code>&lt;&gt;</code></td>
<td>Не равно</td>
<td><code>5 != 3</code></td>
<td>Значения не равны</td>
</tr>
<tr>
<td><code>!==</code></td>
<td>Строго не равно</td>
<td><code>5 !== "5"</code></td>
<td>Значения ИЛИ типы не равны</td>
</tr>
<tr>
<td><code>&gt;</code></td>
<td>Больше</td>
<td><code>10 &gt; 5</code></td>
<td>Левое больше правого</td>
</tr>
<tr>
<td><code>&lt;</code></td>
<td>Меньше</td>
<td><code>3 &lt; 7</code></td>
<td>Левое меньше правого</td>
</tr>
<tr>
<td><code>&gt;=</code></td>
<td>Больше или равно</td>
<td><code>5 &gt;= 5</code></td>
<td>Левое больше или равно</td>
</tr>
<tr>
<td><code>&lt;=</code></td>
<td>Меньше или равно</td>
<td><code>4 &lt;= 6</code></td>
<td>Левое меньше или равно</td>
</tr>
</tbody>
</table>

<div class="operator-box">
<h4>⚠️ Важно: == vs ===</h4>
<p>В чем разница между <code>==</code> и <code>===</code>?</p>
<div class="comparison-box">
<div class="comparison-item incorrect">
<h5>❌ == (нестрогое)</h5>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>$a = 5;
$b = "5";

var_dump($a == $b);
// true (сравнивает только значения)</code></pre>
<p>Проверяет только значения, игнорируя тип</p>
</div>
<div class="comparison-item correct">
<h5>✅ === (строгое)</h5>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>$a = 5;
$b = "5";

var_dump($a === $b);
// false (разные типы!)</code></pre>
<p>Проверяет и значение, и тип данных</p>
</div>
</div>
<div class="note">
<p><strong>💡 Рекомендация:</strong> Всегда используйте <code>===</code> и <code>!==</code> для точных сравнений. Это защитит от неожиданных ошибок!</p>
</div>
</div>

<div class="simple-example">
<h4>📊 Практические примеры:</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>// Проверка возраста для входа
$age = 16;
$can_enter = $age &gt;= 18; // false

// Проверка пароля
$password = "secret123";
$input = "secret123";
$is_correct = $password === $input; // true

// Сравнение цен
$price1 = 1000;
$price2 = 1200;
$is_cheaper = $price1 &lt; $price2; // true</code></pre>
</div>
</div>

<div class="card" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">🔄</span> Инкремент и декремент</h3>

<p>Специальные операторы для увеличения или уменьшения значения на 1. Очень удобны для счетчиков!</p>

<div class="operator-box">
<h4>📈 Инкремент (увеличение на 1)</h4>
<table class="operator-table">
<thead>
<tr>
<th>Оператор</th>
<th>Название</th>
<th>Когда выполняется</th>
<th>Пример</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>++$a</code></td>
<td>Пре-инкремент</td>
<td>Сначала увеличивает, потом использует</td>
<td><code>$a = 5; echo ++$a; // 6</code></td>
</tr>
<tr>
<td><code>$a++</code></td>
<td>Пост-инкремент</td>
<td>Сначала использует, потом увеличивает</td>
<td><code>$a = 5; echo $a++; // 5</code></td>
</tr>
</tbody>
</table>
</div>

<div class="operator-box">
<h4>📉 Декремент (уменьшение на 1)</h4>
<table class="operator-table">
<thead>
<tr>
<th>Оператор</th>
<th>Название</th>
<th>Когда выполняется</th>
<th>Пример</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>--$b</code></td>
<td>Пре-декремент</td>
<td>Сначала уменьшает, потом использует</td>
<td><code>$b = 10; echo --$b; // 9</code></td>
</tr>
<tr>
<td><code>$b--</code></td>
<td>Пост-декремент</td>
<td>Сначала использует, потом уменьшает</td>
<td><code>$b = 10; echo $b--; // 10</code></td>
</tr>
</tbody>
</table>
</div>

<div class="simple-example">
<h4>🤔 Разбираем на примерах:</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>// ПРЕ-инкремент (сначала +1, потом вывод)
$counter = 5;
echo ++$counter; // Выведет: 6
echo $counter;   // Выведет: 6

// ПОСТ-инкремент (сначала вывод, потом +1)
$counter = 5;
echo $counter++; // Выведет: 5
echo $counter;   // Выведет: 6

// Практическое применение
$attempts = 3;
echo "Осталось попыток: " . $attempts--; // 3
echo "Осталось попыток: " . $attempts;   // 2</code></pre>
</div>

<div class="note">
<p><strong>💡 Простое правило:</strong></p>
<ul>
<li><code>++$a</code> — плюсик <strong>перед</strong> переменной = увеличить <strong>перед</strong> использованием</li>
<li><code>$a++</code> — плюсик <strong>после</strong> переменной = увеличить <strong>после</strong> использования</li>
</ul>
</div>
</div>
</section>

<section class="section practice">
<h2 class="section-title">💻 Практическая часть (1.5 часа)</h2>

<div class="task" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">✅</span> Шаг 1: Создаем файл для практики</h3>

<ol>
<li>В папке <code>php_course</code> создайте файл <code>operators.php</code></li>
<li>Откройте его в редакторе</li>
<li>Напишите базовую структуру:
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Операторы в PHP&lt;/title&gt;
&lt;style&gt;
body { 
    font-family: Arial; 
    padding: 20px; 
    background: #f5f5f5;
}
.result { 
    background: white; 
    padding: 15px; 
    margin: 10px 0; 
    border-left: 4px solid #667eea;
    border-radius: 5px;
}
.title {
    background: #667eea;
    color: white;
    padding: 10px 15px;
    border-radius: 5px;
    margin: 20px 0 10px 0;
}
code {
    background: #f1f5f9;
    padding: 2px 6px;
    border-radius: 3px;
    color: #e83e8c;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;🧮 Операторы в PHP&lt;/h1&gt;
&lt;?php
// Здесь будем писать код
?&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</li>
</ol>
</div>

<div class="task" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">✅</span> Шаг 2: Арифметические операторы</h3>

<p>Создадим две переменные и проведем все математические операции:</p>

<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
echo "&lt;div class='title'&gt;➕ Арифметические операторы&lt;/div&gt;";

// Создаем переменные
$a = 10;
$b = 3;

echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;Переменная a = &lt;strong&gt;$a&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Переменная b = &lt;strong&gt;$b&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Сложение
$sum = $a + $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;✅ Сложение: $a + $b = &lt;strong&gt;$sum&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Вычитание
$diff = $a - $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;➖ Вычитание: $a - $b = &lt;strong&gt;$diff&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Умножение
$product = $a * $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;✖️ Умножение: $a * $b = &lt;strong&gt;$product&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Деление
$quotient = $a / $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;➗ Деление: $a / $b = &lt;strong&gt;$quotient&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Остаток от деления
$remainder = $a % $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;🔢 Остаток от деления: $a % $b = &lt;strong&gt;$remainder&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;(10 ÷ 3 = 3 и $remainder в остатке)&lt;/p&gt;";
echo "&lt;/div&gt;";

// Возведение в степень
$power = $a ** $b;
echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;📊 Возведение в степень: $a ** $b = &lt;strong&gt;$power&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;($a × $a × $a = $power)&lt;/p&gt;";
echo "&lt;/div&gt;";

// Специальный пример: разница между == и ===
echo "&lt;div class='title'&gt;🔍 Важно: == vs ===&lt;/div&gt;";

$number = 5;
$string = "5";

echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;Число: &lt;code&gt;\$number = $number&lt;/code&gt; (тип: ";
var_dump($number);
echo ")&lt;/p&gt;";
echo "&lt;p&gt;Строка: &lt;code&gt;\$string = \"$string\"&lt;/code&gt; (тип: ";
var_dump($string);
echo ")&lt;/p&gt;";
echo "&lt;/div&gt;";

echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;Нестрогое сравнение (==):&lt;/p&gt;";
var_dump($number == $string);
echo "&lt;p style='color: #48bb78;'&gt;✅ true - значения одинаковые (5 и \"5\")&lt;/p&gt;";
echo "&lt;/div&gt;";

echo "&lt;div class='result'&gt;";
echo "&lt;p&gt;Строгое сравнение (===):&lt;/p&gt;";
var_dump($number === $string);
echo "&lt;p style='color: #f56565;'&gt;❌ false - типы разные (int и string)&lt;/p&gt;";
echo "&lt;/div&gt;";
?&gt;</code></pre>
</div>

<div class="task" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">✅</span> Шаг 4: Инкремент и декремент</h3>

<p>Поэкспериментируем с увеличением и уменьшением значений:</p>

<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
echo "&lt;div class='title'&gt;🔄 Инкремент и декремент&lt;/div&gt;";

// Пре-инкремент
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;📈 Пре-инкремент (++\$counter)&lt;/h4&gt;";
$counter = 5;
echo "&lt;p&gt;Начальное значение: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Вывод ++\$counter: &lt;strong&gt;" . (++$counter) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Значение после: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;💡 Сначала увеличил до 6, потом вывел&lt;/p&gt;";
echo "&lt;/div&gt;";

// Пост-инкремент
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;📈 Пост-инкремент (\$counter++)&lt;/h4&gt;";
$counter = 5;
echo "&lt;p&gt;Начальное значение: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Вывод \$counter++: &lt;strong&gt;" . ($counter++) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Значение после: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;💡 Сначала вывел 5, потом увеличил до 6&lt;/p&gt;";
echo "&lt;/div&gt;";

// Пре-декремент
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;📉 Пре-декремент (--\$counter)&lt;/h4&gt;";
$counter = 10;
echo "&lt;p&gt;Начальное значение: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Вывод --\$counter: &lt;strong&gt;" . (--$counter) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Значение после: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;💡 Сначала уменьшил до 9, потом вывел&lt;/p&gt;";
echo "&lt;/div&gt;";

// Пост-декремент
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;📉 Пост-декремент (\$counter--)&lt;/h4&gt;";
$counter = 10;
echo "&lt;p&gt;Начальное значение: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Вывод \$counter--: &lt;strong&gt;" . ($counter--) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Значение после: &lt;strong&gt;$counter&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #666;'&gt;💡 Сначала вывел 10, потом уменьшил до 9&lt;/p&gt;";
echo "&lt;/div&gt;";

// Практический пример
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;🎮 Практический пример: Счетчик попыток&lt;/h4&gt;";
$attempts = 3;
echo "&lt;p&gt;Игра началась! Попыток: &lt;strong&gt;$attempts&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Попытка 1... Осталось: &lt;strong&gt;" . (--$attempts) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Попытка 2... Осталось: &lt;strong&gt;" . (--$attempts) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Попытка 3... Осталось: &lt;strong&gt;" . (--$attempts) . "&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #f56565;'&gt;❌ Игра окончена!&lt;/p&gt;";
echo "&lt;/div&gt;";
?&gt;</code></pre>
</div>

<div class="task" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">✅</span> Шаг 5: Практические задачи</h3>

<p>Теперь решим реальные задачи с использованием операторов:</p>

<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
echo "&lt;div class='title'&gt;💼 Практические задачи&lt;/div&gt;";

// Задача 1: Магазин
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;🛒 Задача 1: Расчет скидки в магазине&lt;/h4&gt;";

$original_price = 5000;  // рублей
$discount_percent = 15;   // процентов

$discount_amount = $original_price * $discount_percent / 100;
$final_price = $original_price - $discount_amount;
$savings = $discount_amount;

echo "&lt;p&gt;Начальная цена: &lt;strong&gt;$original_price руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Скидка: &lt;strong&gt;$discount_percent%&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Размер скидки: &lt;strong&gt;$discount_amount руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #48bb78; font-size: 1.2em;'&gt;💰 Итоговая цена: &lt;strong&gt;$final_price руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Вы экономите: &lt;strong&gt;$savings руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Задача 2: Конвертер валют
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;💱 Задача 2: Конвертер валют&lt;/h4&gt;";

$rubles = 10000;
$exchange_rate = 95.5;  // курс доллара

$dollars = $rubles / $exchange_rate;
$dollars_rounded = round($dollars, 2);

echo "&lt;p&gt;Рубли: &lt;strong&gt;$rubles руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Курс доллара: &lt;strong&gt;$exchange_rate руб&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #48bb78;'&gt;💵 Доллары: &lt;strong&gt;$dollars_rounded&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Задача 3: Проверка четности
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;🔢 Задача 3: Четное или нечетное число?&lt;/h4&gt;";

$test_number = 17;
$remainder = $test_number % 2;

echo "&lt;p&gt;Проверяем число: &lt;strong&gt;$test_number&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Остаток от деления на 2: &lt;strong&gt;$remainder&lt;/strong&gt;&lt;/p&gt;";

if ($remainder === 0) {
    echo "&lt;p style='color: #48bb78;'&gt;✅ Число четное!&lt;/p&gt;";
} else {
    echo "&lt;p style='color: #ed8936;'&gt;⚠️ Число нечетное!&lt;/p&gt;";
}
echo "&lt;/div&gt;";

// Задача 4: Деление пиццы
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;🍕 Задача 4: Деление пиццы на друзей&lt;/h4&gt;";

$pizza_slices = 16;
$friends = 5;

$slices_per_friend = floor($pizza_slices / $friends);
$remaining_slices = $pizza_slices % $friends;

echo "&lt;p&gt;Всего кусочков: &lt;strong&gt;$pizza_slices&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Количество друзей: &lt;strong&gt;$friends&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #48bb78;'&gt;👥 Каждому по: &lt;strong&gt;$slices_per_friend кусочков&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p style='color: #ed8936;'&gt;🍕 Останется: &lt;strong&gt;$remaining_slices кусочков&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;/div&gt;";

// Задача 5: Сравнение оценок
echo "&lt;div class='result'&gt;";
echo "&lt;h4&gt;📊 Задача 5: Сравнение результатов тестов&lt;/h4&gt;";

$test1_score = 85;
$test2_score = 92;
$passing_score = 70;

echo "&lt;p&gt;Результат теста 1: &lt;strong&gt;$test1_score баллов&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Результат теста 2: &lt;strong&gt;$test2_score баллов&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;p&gt;Проходной балл: &lt;strong&gt;$passing_score&lt;/strong&gt;&lt;/p&gt;";
echo "&lt;hr&gt;";

$test1_passed = $test1_score &gt;= $passing_score;
$test2_passed = $test2_score &gt;= $passing_score;
$improved = $test2_score &gt; $test1_score;

echo "&lt;p&gt;Тест 1 сдан: ";
var_dump($test1_passed);
echo "&lt;/p&gt;";

echo "&lt;p&gt;Тест 2 сдан: ";
var_dump($test2_passed);
echo "&lt;/p&gt;";

echo "&lt;p&gt;Результат улучшился: ";
var_dump($improved);
echo "&lt;/p&gt;";

if ($improved) {
    $improvement = $test2_score - $test1_score;
    echo "&lt;p style='color: #48bb78;'&gt;🎉 Прогресс: +$improvement баллов!&lt;/p&gt;";
}
echo "&lt;/div&gt;";
?&gt;</code></pre>
</div>

<div class="task" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h3><span class="icon">🧪</span> Эксперименты</h3>

<p>Попробуйте изменить код и посмотреть, что будет:</p>

<div class="experiment" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h4>Эксперимент 1: Деление на ноль</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
// Что произойдет?
$result = 10 / 0;
echo $result; // Warning: Division by zero
?&gt;</code></pre>
<p>⚠️ PHP выдаст предупреждение о делении на ноль!</p>
</div>

<div class="experiment" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h4>Эксперимент 2: Порядок операций</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
// Какой результат?
$result1 = 2 + 3 * 4;     // 14 (сначала умножение)
$result2 = (2 + 3) * 4;   // 20 (сначала скобки)

echo "Без скобок: $result1&lt;br&gt;";
echo "Со скобками: $result2";
?&gt;</code></pre>
<p>💡 Используйте скобки для контроля порядка вычислений!</p>
</div>

<div class="experiment" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h4>Эксперимент 3: Смешанные типы</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
$a = "10";  // строка
$b = 5;     // число

$result = $a + $b;  // Что получится?
var_dump($result);  // int(15)

// PHP автоматически преобразовал строку в число!
?&gt;</code></pre>
<p>🤔 PHP умный! Он сам преобразует типы при необходимости.</p>
</div>

<div class="experiment" style="opacity: 1; transform: translateY(0px); transition: 0.5s;">
<h4>Эксперимент 4: Цепочка инкрементов</h4>
<pre title="Кликните, чтобы скопировать код" style="cursor: pointer;"><code>&lt;?php
$x = 5;
echo $x++;  // Выведет: 5
echo $x++;  // Выведет: 6
echo $x++;  // Выведет: 7
echo $x;    // Выведет: 8

// Каждый раз сначала выводит, потом увеличивает
?&gt;</code></pre>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">📋 Домашнее задание</h2>

<div class="homework">
<h3><span class="icon">✏️</span> Задание на день 3</h3>

<p>Создайте файл <code>homework_day3.php</code> и выполните следующие задачи:</p>

<ol>
<li><strong>Калькулятор площади и периметра:</strong>
<ul>
<li>Создайте переменные для длины и ширины прямоугольника</li>
<li>Вычислите площадь (длина × ширина)</li>
<li>Вычислите периметр (2 × (длина + ширина))</li>
<li>Выведите результаты красиво оформленными</li>
</ul>
</li>

<li><strong>Конвертер температур:</strong>
<ul>
<li>Создайте переменную с температурой в Цельсиях (например, 25)</li>
<li>Переведите в Фаренгейты: °F = °C × 9/5 + 32</li>
<li>Переведите в Кельвины: K = °C + 273.15</li>
<li>Выведите все три значения</li>
</ul>
</li>

<li><strong>Проверка возраста:</strong>
<ul>
<li>Создайте переменную <code>$age</code> с любым возрастом</li>
<li>Сравните возраст с разными значениями: 18, 21, 65</li>
<li>Используйте все операторы сравнения</li>
<li>Выведите результаты через var_dump()</li>
</ul>
</li>

<li><strong>Счетчик дней до события:</strong>
<ul>
<li>Создайте переменную <code>$days_left = 100</code></li>
<li>Используйте декремент, чтобы показать убывание дней</li>
<li>Выведите "Осталось X дней" 5 раз, уменьшая счетчик</li>
</ul>
</li>

<li><strong>Расчет чаевых в ресторане:</strong>
<ul>
<li>Сумма счета: 2500 рублей</li>
<li>Количество человек: 4</li>
<li>Чаевые: 10% от суммы</li>
<li>Вычислите: размер чаевых, общую сумму, сумму на человека</li>
</ul>
</li>

<li><strong>Проверка делимости:</strong>
<ul>
<li>Возьмите число 45</li>
<li>Проверьте делится ли оно на 2, 3, 5, 10 без остатка</li>
<li>Используйте оператор <code>%</code></li>
<li>Выведите результаты проверки</li>
</ul>
</li>
</ol>

<div class="note">
<p><strong>💡 Подсказки:</strong></p>
<ul>
<li>Для округления используйте <code>round($number, 2)</code> — округлит до 2 знаков</li>
<li>Не забывайте про порядок операций: умножение и деление выполняются раньше сложения</li>
<li>Используйте <code>var_dump()</code> для проверки типов данных</li>
<li>Добавьте стили, чтобы результаты были красиво оформлены</li>
</ul>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">🧠 Проверка понимания</h2>

<div class="quiz">
<h3><span class="icon">❓</span> Вопросы для самопроверки</h3>

<ol>
<li>Чем отличается <code>==</code> от <code>===</code>?</li>
<li>Что вернет выражение <code>10 % 3</code>?</li>
<li>Что такое инкремент и декремент?</li>
<li>В чем разница между <code>++$a</code> и <code>$a++</code>?</li>
<li>Что выведет <code>echo 2 + 3 * 4</code>?</li>
<li>Что такое оператор <code>**</code> и для чего он используется?</li>
<li>Почему лучше использовать <code>===</code> вместо <code>==</code>?</li>
<li>Как проверить, делится ли число нацело на другое число?</li>
<li>Что вернет сравнение <code>5 &gt; 3</code>?</li>
<li>Можно ли использовать операторы с переменными разных типов?</li>
</ol>

<button onclick="toggleAnswers()" class="button button--primary" style="margin-top: 20px;">Показать ответы</button>

<div id="answers" style="display: none; margin-top: 20px; padding: 20px; background: var(--light-color); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
<h4>Ответы:</h4>
<ol>
<li><code>==</code> сравнивает только значения, <code>===</code> — значения и типы данных</li>
<li>Вернет 1 (остаток от деления 10 на 3)</li>
<li>Инкремент — увеличение на 1, декремент — уменьшение на 1</li>
<li><code>++$a</code> — сначала увеличивает, потом использует; <code>$a++</code> — наоборот</li>
<li>Выведет 14 (сначала 3×4=12, потом 2+12=14)</li>
<li>Возведение в степень, например <code>2**3</code> = 8</li>
<li>Потому что <code>===</code> точнее и защищает от неожиданных ошибок с типами</li>
<li>Использовать оператор <code>%</code>: если остаток равен 0, то делится нацело</li>
<li>Вернет <code>true</code> (логическое значение "правда")</li>
<li>Да, PHP автоматически преобразует типы, но лучше контролировать это самостоятельно</li>
</ol>
</div>
</div>
</section>

<section class="section resources">
<h2 class="section-title">🔗 Полезные ссылки</h2>

<div class="resource-list">
<div class="resource-item">
<a href="https://www.php.net/manual/ru/language.operators.php" target="_blank">Операторы PHP</a>
<p>Официальная документация на русском языке</p>
</div>
<div class="resource-item">
<a href="https://www.w3schools.com/php/php_operators.asp" target="_blank">PHP Operators Tutorial</a>
<p>Интерактивные примеры с операторами</p>
</div>
<div class="resource-item">
<a href="https://puzzleweb.ru/php/4_operators.php" target="_blank">Операторы для начинающих</a>
<p>Простое объяснение на русском с примерами</p>
</div>
</div>
</section>

<div style="background: linear-gradient(135deg, #667eea15, #764ba215); padding: 30px; margin: 40px 0; border-radius: 8px; text-align: center;">
<h3 style="color: var(--primary-color); margin-bottom: 15px;">🎉 Поздравляем!</h3>
<p style="font-size: 1.1em; line-height: 1.8;">Вы освоили операторы в PHP! Теперь вы можете выполнять вычисления, сравнивать значения и изменять переменные. На следующем уроке мы изучим условные операторы и научимся принимать решения в коде!</p>
</div>

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

document.addEventListener('DOMContentLoaded', function() {
// Копирование кода при клике
const codeBlocks = document.querySelectorAll('pre');

codeBlocks.forEach(block => {
block.addEventListener('click', function() {
const text = this.textContent;
navigator.clipboard.writeText(text).then(() => {
this.style.backgroundColor = '#e8f5e9';
setTimeout(() => {
this.style.backgroundColor = '';
}, 500);
});
});

block.title = 'Кликните, чтобы скопировать код';
block.style.cursor = 'pointer';
});

// Анимация карточек
const cards = document.querySelectorAll('.card, .task, .experiment');
cards.forEach((card, index) => {
card.style.opacity = '0';
card.style.transform = 'translateY(20px)';

setTimeout(() => {
card.style.transition = 'all 0.5s ease';
card.style.opacity = '1';
card.style.transform = 'translateY(0)';
}, 100 + index * 50);
});

// Плавная прокрутка к якорям
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
});
</script>