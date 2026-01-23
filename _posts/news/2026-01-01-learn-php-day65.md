---
layout: news
name: "День 65: Шаблонизатор Twig — безопасность и удобство"
title: "PHP обучение: Веб-разработка. День 65 - Внедряем Twig в наш MVC блог"
description: "Изучаем шаблонизатор Twig: устанавливаем через Composer, знакомимся с синтаксисом, переписываем наши представления на Twig и используем наследование шаблонов."
date: 2025-12-30
image: "/assets/images/news/6f00b46434c034e68ae8e435980c9ea5.jpg"
category: php
news_id: 9d6akk880j6tefd5
---
<div class="goal-box">
<h2 class="goal-title">🎯 Цель урока</h2>
<p>Понять преимущества шаблонизаторов, научиться устанавливать Twig через Composer, освоить базовый синтаксис Twig и интегрировать его в наш MVC-блог для создания более безопасных и удобных шаблонов.</p>
</div>

<section class="section theory">
<h2 class="section-title">📚 Теоретическая часть (40 минут)</h2>

<div class="card">
<h3><span class="icon">🤔</span> Зачем нужны шаблонизаторы?</h3>

<p>В предыдущем уроке мы уже разделили логику и представление с помощью MVC. Но наши PHP-шаблоны все еще содержат код вроде <code>&lt;?php echo htmlspecialchars(...); ?&gt;</code>. Шаблонизаторы решают эту и другие проблемы.</p>

<div class="key-points">
<h4>🔍 Проблемы "чистого" PHP в шаблонах:</h4>
<ul>
<li><strong>Безопасность</strong> — легко забыть про <code>htmlspecialchars()</code> (XSS-уязвимости)</li>
<li><strong>Сложный синтаксис</strong> — много открывающих/закрывающих тегов PHP</li>
<li><strong>Нет наследования</strong> — сложно создавать базовые шаблоны (layout)</li>
<li><strong>Смешивание логики</strong> — возникает соблазн добавить PHP-код в шаблоны</li>
<li><strong>Низкая производительность</strong> — PHP каждый раз компилирует шаблоны</li>
</ul>
</div>

<div class="note">
<p><strong>💡 Реальная аналогия:</strong> Представьте, что вы пишете письмо чернилами без возможности исправить ошибку (PHP в шаблонах). Шаблонизатор — это текстовый редактор с проверкой орфографии, автозаменой и шаблонами документов.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">🚀</span> Что такое Twig и его преимущества</h3>
<p>Twig — современный шаблонизатор для PHP, созданный разработчиками Symfony. Он компилирует шаблоны в оптимизированный PHP-код.</p>

<div class="comparison-table table--hover">
<table>
<caption>Сравнение PHP и Twig в шаблонах</caption>
<thead>
<tr>
<th>Задача</th>
<th>PHP в шаблоне</th>
<th>Twig</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Вывод переменной</strong></td>
<td><code>&lt;?php echo htmlspecialchars($title); ?&gt;</code></td>
<td><code>{{ title }}</code></td>
</tr>
<tr>
<td><strong>Цикл по массиву</strong></td>
<td><code>&lt;?php foreach($posts as $post): ?&gt;...&lt;?php endforeach; ?&gt;</code></td>
<td>{% raw %}<code>{% for post in posts %}...{% endfor %}</code>{% endraw %}</td>
</tr>
<tr>
<td><strong>Условие</strong></td>
<td><code>&lt;?php if($user): ?&gt;...&lt;?php endif; ?&gt;</code></td>
<td>{% raw %}<code>{% if user %}...{% endif %}</code>{% endraw %}</td>
</tr>
<tr>
<td><strong>Наследование шаблона</strong></td>
<td>Сложно, через include/require</td>
<td>{% raw %}<code>{% extends 'base.html.twig' %}</code>{% endraw %}</td>
</tr>
<tr>
<td><strong>Безопасность</strong></td>
<td>Нужно помнить про htmlspecialchars()</td>
<td>Автоматическое экранирование</td>
</tr>
</tbody>
</table>
</div>

<div class="key-points">
<h4>✨ Основные возможности Twig:</h4>
<ul>
<li><strong>Автоматическое экранирование</strong> — защита от XSS по умолчанию</li>
<li><strong>Наследование шаблонов</strong> — мощная система наследования с блоками</li>
<li><strong>Фильтры и функции</strong> — {% raw %}<code>{{ post.title|upper }}</code>{% endraw %}, {% raw %}<code>{{ path('route_name') }}</code>{% endraw %}</li>
<li><strong>Кэширование</strong> — шаблоны компилируются в PHP-код один раз</li>
<li><strong>Расширяемость</strong> — можно создавать свои фильтры, функции, теги</li>
<li><strong>Безопасная среда</strong> — в шаблонах нельзя выполнять произвольный PHP-код</li>
</ul>
</div>
</div>

<div class="card">
<h3><span class="icon">📦</span> Установка зависимостей через Composer</h3>
<p>Composer — менеджер зависимостей для PHP. Он позволяет легко подключать и обновлять библиотеки.</p>

<div class="key-points">
<h4>📁 Новая структура проекта с зависимостями:</h4>
<pre><code>mvc_blog/
├── app/
│   ├── controllers/
│   ├── models/
│   └── views/           # Теперь здесь будут Twig-шаблоны
│       └── twig/       # Новый каталог для Twig-шаблонов
├── public/
│   └── index.php
├── config/
├── vendor/              # Папка для зависимостей (создаст Composer)
└── composer.json        # Файл конфигурации Composer</code></pre>
</div>

<div class="key-points">
<h4>🔧 Что делает Composer:</h4>
<ul>
<li>Скачивает библиотеки (Twig, Symfony компоненты и т.д.)</li>
<li>Управляет версиями и зависимостями</li>
<li>Автозагружает классы (не нужно писать require_once)</li>
<li>Создает карту классов для быстрой загрузки</li>
</ul>
</div>
</div>

<div class="card">
<h3><span class="icon">📝</span> Базовый синтаксис Twig</h3>

<div class="key-points">
<h4>1. Вывод переменных (экранированный):</h4>
{% raw %}
<pre><code>{{ variable }}          {# Безопасный вывод с экранированием #}
{{ variable|raw }}      {# Без экранирования (осторожно!) #}
{{ variable|default('Нет данных') }} {# Значение по умолчанию #}</code></pre>
{% endraw %}

<h4>2. Управляющие конструкции:</h4>
{% raw %}
<pre><code>{# Условия #}
{% if user.isAdmin %}
    Панель администратора
{% elseif user.isModerator %}
    Панель модератора
{% else %}
    Обычный пользователь
{% endif %}

{# Циклы #}
{% for post in posts %}
    {{ loop.index }}. {{ post.title }}
{% else %}
    &lt;p&gt;Статей пока нет&lt;/p&gt;
{% endfor %}</code></pre>
{% endraw %}

<h4>3. Фильтры (модификаторы):</h4>
{% raw %}
<pre><code>{{ title|upper }}                 {# В верхний регистр #}
{{ content|truncate(100) }}       {# Обрезать до 100 символов #}
{{ date|date('d.m.Y H:i') }}      {# Форматирование даты #}
{{ text|escape('html') }}         {# Явное экранирование #}
{{ array|join(', ') }}            {# Объединить массив в строку #}</code></pre>
{% endraw %}

<h4>4. Наследование шаблонов:</h4>
{% raw %}
<pre><code>{# base.html.twig #}
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;{% block title %}Мой сайт{% endblock %}&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    {% block content %}{% endblock %}
&lt;/body&gt;
&lt;/html&gt;

{# child.html.twig #}
{% extends 'base.html.twig' %}

{% block title %}Название страницы{% endblock %}

{% block content %}
    Содержимое страницы
{% endblock %}</code></pre>
{% endraw %}
</div>
</div>
</section>

<section class="section practice">
<h2 class="section-title">💻 Практическая часть (2 часа)</h2>

<div class="task">
<h3><span class="icon">✅</span> Шаг 1: Установка Composer и Twig</h3>

<ol>
<li>Если Composer не установлен, скачайте с <a href="https://getcomposer.org/download/" target="_blank">официального сайта</a></li>
<li>В корневой папке проекта (<code>mvc_blog/</code>) создайте файл <code>composer.json</code>:
<pre><code>{
    "require": {
        "twig/twig": "^3.0"
    },
    "autoload": {
        "psr-4": {
            "App\\": "app/"
        }
    }
}</code></pre>
</li>
<li>Откройте терминал в папке проекта и выполните:
<pre><code>composer install</code></pre>
</li>
<li>Проверьте, что создалась папка <code>vendor/</code> с файлами Twig</li>
</ol>

<div class="note">
<p><strong>📁 Что произошло:</strong> Composer создал папку <code>vendor/</code>, скачал Twig и настроил автозагрузку классов. Теперь нам не нужно писать <code>require_once</code> для классов в папке <code>app/</code>.</p>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 2: Настройка Twig в проекте</h3>

<p>1. Создайте конфигурационный файл <code>config/twig.php</code>:</p>
<pre><code>&lt;?php
// config/twig.php - Конфигурация Twig

// Автозагрузка классов через Composer
require_once dirname(__DIR__) . '/vendor/autoload.php';

// Создаем папку для кэша шаблонов (если её нет)
$cachePath = dirname(__DIR__) . '/var/cache/twig';
if (!file_exists($cachePath)) {
    mkdir($cachePath, 0777, true);
}

// Настройка Twig
$loader = new \Twig\Loader\FilesystemLoader(dirname(__DIR__) . '/app/views/twig');
$twig = new \Twig\Environment($loader, [
    'cache' => $cachePath,
    'debug' => true, // Включаем отладку для разработки
    'auto_reload' => true, // Автоматически перекомпилировать при изменении
]);

// Добавляем глобальные переменные (доступны во всех шаблонах)
$twig->addGlobal('current_year', date('Y'));
$twig->addGlobal('site_name', 'MVC Блог');

// Добавляем функцию для генерации URL (пока упрощенная)
$twig->addFunction(new \Twig\TwigFunction('url', function ($page = 'home', $params = []) {
    $query = http_build_query(array_merge(['page' => $page], $params));
    return "/mvc_blog/public/?{$query}";
}));

return $twig;</code></pre>

<p>2. Обновите файл <code>public/index.php</code>:</p>
<pre><code>&lt;?php
// public/index.php - Обновленная точка входа с Twig

// Автозагрузка Composer
require_once dirname(__DIR__) . '/vendor/autoload.php';

// Базовая конфигурация
define('ROOT_PATH', dirname(__DIR__));
define('APP_PATH', ROOT_PATH . '/app');

// Подключаем Twig
$twig = require_once ROOT_PATH . '/config/twig.php';

// Простейший роутинг (как было)
$page = $_GET['page'] ?? 'home';

switch ($page) {
    case 'home':
        $controller = 'App\\Controllers\\HomeController';
        $action = 'index';
        break;
    case 'about':
        $controller = 'App\\Controllers\\HomeController';
        $action = 'about';
        break;
    default:
        $controller = 'App\\Controllers\\HomeController';
        $action = 'notFound';
        break;
}

// Подключаем и запускаем контроллер
if (class_exists($controller)) {
    $controllerInstance = new $controller($twig);
    if (method_exists($controllerInstance, $action)) {
        $controllerInstance->$action();
    } else {
        echo "Метод {$action} не найден";
    }
} else {
    echo "Контроллер {$controller} не найден";
}</code></pre>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 3: Обновляем контроллер для работы с Twig</h3>

<p>Обновите <code>app/controllers/HomeController.php</code>:</p>
<pre><code>&lt;?php
// app/controllers/HomeController.php

namespace App\Controllers;

class HomeController
{
    private $twig;
    
    // Конструктор теперь принимает объект Twig
    public function __construct(\Twig\Environment $twig)
    {
        $this->twig = $twig;
    }
    
    public function index()
    {
        // Данные для главной страницы
        $data = [
            'title' => 'Добро пожаловать в MVC блог с Twig!',
            'posts' => [
                ['id' => 1, 'title' => 'Первая статья на Twig', 'content' => 'Содержание первой статьи...', 'created_at' => '2026-01-01'],
                ['id' => 2, 'title' => 'Вторая статья', 'content' => 'Содержание второй статьи...', 'created_at' => '2026-01-02'],
                ['id' => 3, 'title' => 'Статья с &lt;script&gt;тегом&lt;/script&gt;', 'content' => 'Проверка безопасности Twig', 'created_at' => '2026-01-03'],
            ],
        ];
        
        // Рендерим шаблон Twig
        echo $this->twig->render('home.html.twig', $data);
    }
    
    public function about()
    {
        $data = [
            'title' => 'О нашем блоге',
            'description' => 'Этот блог теперь использует Twig для шаблонов.',
            'features' => ['MVC архитектура', 'Twig шаблонизатор', 'Роутинг', 'Безопасность'],
        ];
        
        echo $this->twig->render('about.html.twig', $data);
    }
    
    public function notFound()
    {
        $data = [
            'title' => 'Страница не найдена',
            'error_code' => 404,
            'message' => 'Запрошенная страница не существует.',
        ];
        
        // Используем отдельный шаблон для ошибок
        echo $this->twig->render('errors/404.html.twig', $data);
    }
}</code></pre>

<div class="key-points">
<h4>📖 Изменения в контроллере:</h4>
<ul>
<li><code>namespace App\Controllers;</code> — добавляем пространство имен для автозагрузки</li>
<li><code>__construct(\Twig\Environment $twig)</code> — принимаем Twig через конструктор</li>
<li><code>$this->twig->render()</code> — используем Twig для рендеринга вместо своего метода render</li>
<li>Больше не нужны методы <code>render()</code> и <code>extract()</code></li>
</ul>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 4: Создаем базовый шаблон Twig</h3>

<p>Создайте <code>app/views/twig/layout/base.html.twig</code>:</p>
{% raw %}
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;{% block title %}{{ site_name }}{% endblock %}&lt;/title&gt;
    &lt;style&gt;
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: #2c3e50; color: white; padding: 1rem 0; }
        nav ul { display: flex; list-style: none; gap: 20px; }
        nav a { color: white; text-decoration: none; padding: 5px 10px; border-radius: 3px; }
        nav a:hover, nav a.active { background: rgba(255,255,255,0.1); }
        main { padding: 2rem 0; min-height: 70vh; }
        .post { background: white; padding: 1.5rem; margin-bottom: 1rem; border-radius: 5px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
        .post-meta { color: #7f8c8d; font-size: 0.9rem; margin-bottom: 10px; }
        footer { background: #34495e; color: white; padding: 2rem 0; margin-top: 3rem; }
        .alert { padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .alert-danger { background: #f8d7da; border: 1px solid #f5c6cb; color: #721c24; }
        .breadcrumb { margin-bottom: 20px; }
        .breadcrumb a { color: #3498db; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;div class="container"&gt;
            &lt;h1&gt;&lt;a href="{{ url('home') }}" style="color: white; text-decoration: none;"&gt;{{ site_name }}&lt;/a&gt;&lt;/h1&gt;
            &lt;nav&gt;
                &lt;ul&gt;
                    &lt;li&gt;&lt;a href="{{ url('home') }}" {% if current_page == 'home' %}class="active"{% endif %}&gt;Главная&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="{{ url('about') }}" {% if current_page == 'about' %}class="active"{% endif %}&gt;О блоге&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="{{ url('contact') }}" {% if current_page == 'contact' %}class="active"{% endif %}&gt;Контакты&lt;/a&gt;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/nav&gt;
        &lt;/div&gt;
    &lt;/header&gt;
    
    &lt;main class="container"&gt;
        {# Хлебные крошки (опционально) #}
        {% block breadcrumb %}{% endblock %}
        
        {# Сообщения (например, после отправки формы) #}
        {% block messages %}{% endblock %}
        
        {# Основное содержимое страницы #}
        {% block content %}{% endblock %}
    &lt;/main&gt;
    
    &lt;footer&gt;
        &lt;div class="container"&gt;
            &lt;p&gt;© {{ current_year }} {{ site_name }}. Все права защищены.&lt;/p&gt;
            &lt;p&gt;Сайт работает на PHP + Twig&lt;/p&gt;
        &lt;/div&gt;
    &lt;/footer&gt;
    
    &lt;!-- Можно добавить общие скрипты --&gt;
    {% block scripts %}{% endblock %}
&lt;/body&gt;
&lt;/html&gt;</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 5: Создаем Twig-шаблоны страниц</h3>

<p>1. Создайте <code>app/views/twig/home.html.twig</code>:</p>
{% raw %}
<pre><code>{# Наследуем базовый шаблон #}
{% extends 'layout/base.html.twig' %}

{% block title %}{{ title }} | {{ parent() }}{% endblock %}

{% block content %}
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;Это главная страница нашего блога с использованием Twig.&lt;/p&gt;
    
    {# Пример работы фильтров Twig #}
    &lt;p&gt;Всего статей: &lt;strong&gt;{{ posts|length }}&lt;/strong&gt;&lt;/p&gt;
    
    &lt;h3&gt;Последние статьи:&lt;/h3&gt;
    
    {% if posts|length > 0 %}
        {% for post in posts %}
            &lt;article class="post"&gt;
                &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
                &lt;div class="post-meta"&gt;
                    Опубликовано: {{ post.created_at|date('d.m.Y') }}
                    | ID: {{ post.id }}
                &lt;/div&gt;
                &lt;p&gt;{{ post.content|truncate(150) }}&lt;/p&gt;
                &lt;a href="{{ url('post', {'id': post.id}) }}"&gt;Читать далее →&lt;/a&gt;
            &lt;/article&gt;
        {% endfor %}
    {% else %}
        &lt;div class="alert"&gt;Статей пока нет.&lt;/div&gt;
    {% endif %}
    
    {# Пример вложенных условий #}
    {% if posts|length > 5 %}
        &lt;p&gt;&lt;small&gt;Показаны последние 5 статей из {{ posts|length }}&lt;/small&gt;&lt;/p&gt;
    {% endif %}
{% endblock %}

{% block scripts %}
    &lt;script&gt;
        console.log('Главная страница загружена');
    &lt;/script&gt;
{% endblock %}</code></pre>
{% endraw %}

<p>2. Создайте <code>app/views/twig/about.html.twig</code>:</p>
{% raw %}
<pre><code>{% extends 'layout/base.html.twig' %}

{% block title %}{{ title }} | {{ parent() }}{% endblock %}

{% block breadcrumb %}
    &lt;div class="breadcrumb"&gt;
        &lt;a href="{{ url('home') }}"&gt;Главная&lt;/a&gt; / О блоге
    &lt;/div&gt;
{% endblock %}

{% block content %}
    &lt;h2&gt;{{ title }}&lt;/h2&gt;
    &lt;p&gt;{{ description }}&lt;/p&gt;
    
    &lt;h3&gt;Особенности проекта:&lt;/h3&gt;
    &lt;ul&gt;
        {% for feature in features %}
            &lt;li&gt;{{ feature }}&lt;/li&gt;
        {% endfor %}
    &lt;/ul&gt;
    
    &lt;h3&gt;Технологии:&lt;/h3&gt;
    &lt;table border="1" style="border-collapse: collapse; width: 100%;"&gt;
        &lt;tr&gt;
            &lt;th&gt;Компонент&lt;/th&gt;
            &lt;th&gt;Версия&lt;/th&gt;
            &lt;th&gt;Назначение&lt;/th&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;PHP&lt;/td&gt;
            &lt;td&gt;8.1+&lt;/td&gt;
            &lt;td&gt;Бэкенд&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Twig&lt;/td&gt;
            &lt;td&gt;3.0&lt;/td&gt;
            &lt;td&gt;Шаблонизатор&lt;/td&gt;
        &lt;/tr&gt;
        &lt;tr&gt;
            &lt;td&gt;Composer&lt;/td&gt;
            &lt;td&gt;2.0&lt;/td&gt;
            &lt;td&gt;Менеджер зависимостей&lt;/td&gt;
        &lt;/tr&gt;
    &lt;/table&gt;
{% endblock %}</code></pre>
{% endraw %}

<p>3. Создайте <code>app/views/twig/errors/404.html.twig</code>:</p>
{% raw %}
<pre><code>{# Этот шаблон НЕ наследует базовый, у него свой дизайн #}
&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;{{ title }}&lt;/title&gt;
    &lt;style&gt;
        body { 
            font-family: Arial, sans-serif; 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background: #f8f9fa; 
            color: #333;
            text-align: center;
        }
        .error-container { max-width: 500px; }
        .error-code { 
            font-size: 120px; 
            color: #e74c3c; 
            margin: 0; 
            font-weight: bold;
        }
        .error-message { 
            font-size: 24px; 
            margin: 20px 0; 
        }
        .back-link { 
            display: inline-block; 
            margin-top: 20px; 
            padding: 10px 20px; 
            background: #3498db; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px;
        }
        .back-link:hover { background: #2980b9; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;div class="error-container"&gt;
        &lt;h1 class="error-code"&gt;{{ error_code }}&lt;/h1&gt;
        &lt;p class="error-message"&gt;{{ message }}&lt;/p&gt;
        &lt;p&gt;Возможно, страница была перемещена или вы ошиблись в адресе.&lt;/p&gt;
        &lt;a href="{{ url('home') }}" class="back-link"&gt;Вернуться на главную&lt;/a&gt;
    &lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 6: Тестирование приложения с Twig</h3>

<ol>
<li>Запустите локальный сервер и откройте:
<pre><code>http://localhost/mvc_blog/public/?page=home</code></pre>
</li>
<li>Проверьте, что:
<ul>
<li>Страницы отображаются корректно</li>
<li>Навигация работает (обратите внимание на активный пункт меню)</li>
<li>Статья с тегом &lt;script&gt; выводится как текст (не выполняется!)</li>
<li>Фильтры Twig работают (дата, обрезка текста)</li>
</ul>
</li>
<li>Откройте страницу 404:
<pre><code>http://localhost/mvc_blog/public/?page=unknown</code></pre>
</li>
</ol>

<div class="note">
<p><strong>🔍 Проверка безопасности:</strong> Откройте исходный код страницы (Ctrl+U) и найдите статью с тегом &lt;script&gt;. Вы увидите, что тег экранирован: <code>&amp;lt;script&amp;gt;тегом&amp;lt;/script&amp;gt;</code> — это автоматическая защита Twig от XSS!</p>
</div>
</div>

<div class="task">
<h3><span class="icon">🧪</span> Эксперименты с Twig</h3>

<div class="key-points">
<h4>Эксперимент 1: Добавьте фильтр для форматирования даты</h4>
<ol>
<li>В конфигурации Twig (<code>config/twig.php</code>) добавьте:
<pre><code>// Добавляем фильтр для русских названий месяцев
$twig->addFilter(new \Twig\TwigFilter('russian_date', function($date) {
    $months = [
        1 => 'января', 2 => 'февраля', 3 => 'марта',
        4 => 'апреля', 5 => 'мая', 6 => 'июня',
        7 => 'июля', 8 => 'августа', 9 => 'сентября',
        10 => 'октября', 11 => 'ноября', 12 => 'декабря'
    ];
    
    $timestamp = strtotime($date);
    return date('d', $timestamp) . ' ' . $months[date('n', $timestamp)] . ' ' . date('Y', $timestamp);
}));</code></pre>
</li>
<li>В шаблоне используйте: {% raw %}<code>{{ post.created_at|russian_date }}</code>{% endraw %}</li>
</ol>

<h4>Эксперимент 2: Создайте макрос (функцию) для отображения статьи</h4>
<ol>
<li>Создайте <code>app/views/twig/macros/post.html.twig</code>:
{% raw %}
<pre><code>{# Макрос для отображения статьи #}
{% macro display(post) %}
    &lt;div class="post"&gt;
        &lt;h4&gt;{{ post.title }}&lt;/h4&gt;
        &lt;p&gt;{{ post.content|truncate(200) }}&lt;/p&gt;
        &lt;a href="{{ url('post', {'id': post.id}) }}"&gt;Читать далее&lt;/a&gt;
    &lt;/div&gt;
{% endmacro %}</code></pre>
{% endraw %}
</li>
<li>В основном шаблоне импортируйте и используйте:
{% raw %}
<pre><code>{% import 'macros/post.html.twig' as post_macro %}

{{ post_macro.display(current_post) }}</code></pre>
{% endraw %}
</li>
</ol>

<h4>Эксперимент 3: Добавьте кэширование фрагментов</h4>
<p>В шаблоне используйте тег cache:</p>
{% raw %}
<pre><code>{% cache 'sidebar' 600 %} {# Кэшировать на 10 минут #}
    &lt;div class="sidebar"&gt;
        &lt;h3&gt;Популярные статьи&lt;/h3&gt;
        {% for post in popular_posts %}
            ... 
        {% endfor %}
    &lt;/div&gt;
{% endcache %}</code></pre>
{% endraw %}
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">📋 Домашнее задание</h2>

<div class="homework">
<h3><span class="icon">✏️</span> Задание на день 2</h3>

<ol>
<li>Установите Twig через Composer в свой проект</li>
<li>Перепишите существующие шаблоны (home, about) на Twig</li>
<li>Создайте страницу "Контакты" с формой используя Twig:
<ul>
<li>Шаблон <code>contact.html.twig</code></li>
<li>Метод <code>contact()</code> в контроллере</li>
<li>Добавьте маршрут в <code>index.php</code></li>
</ul>
</li>
<li>Добавьте в базовый шаблон вывод текущего пользователя (пока можно использовать заглушку: <code>$twig->addGlobal('current_user', ['name' => 'Гость'])</code>)</li>
<li>Создайте Twig-фильтр для подсветки синтаксиса кода:
<pre><code>// В config/twig.php
$twig->addFilter(new \Twig\TwigFilter('highlight_php', function($code) {
    return highlight_string('&lt;?php ' . $code, true);
}));

// В шаблоне
{% raw %}&lt;pre&gt;{{ 'echo "Hello World!";'|highlight_php|raw }}&lt;/pre&gt;{% endraw %}</code></pre>
</li>
<li><strong>Бонус:</strong> Реализуйте наследование шаблонов второго уровня:
<ul>
<li><code>base.html.twig</code> — общая структура</li>
<li><code>admin_layout.html.twig</code> — наследует base, добавляет меню админки</li>
<li><code>admin_dashboard.html.twig</code> — наследует admin_layout</li>
</ul>
</li>
<li><strong>Бонус 2:</strong> Создайте простой шаблон письма (email.html.twig) с переменными и отрендерите его без HTML-обрамления</li>
</ol>
</div>
</section>

<section class="section">
<h2 class="section-title">🧠 Проверка понимания</h2>

<div class="quiz">
<h3><span class="icon">❓</span> Вопросы для самопроверки</h3>

<ol>
<li>Какие преимущества дает использование Twig вместо чистого PHP в шаблонах?</li>
<li>Как Twig обеспечивает безопасность от XSS-атак?</li>
<li>Что такое фильтры в Twig и приведите 3 примера их использования?</li>
<li>Как работает наследование шаблонов в Twig?</li>
<li>Зачем нужен Composer и что такое автозагрузка классов?</li>
<li>Как добавить глобальную переменную, доступную во всех шаблонах?</li>
<li>В чем разница между {% raw %}<code>{{ variable }}</code>{% endraw %} и {% raw %}<code>{{ variable|raw }}</code>{% endraw %}?</li>
<li>Как закэшировать фрагмент шаблона в Twig?</li>
</ol>

<button onclick="toggleAnswers()" class="button button--primary" style="margin-top: 20px;">Показать ответы</button>

<div id="answers" style="display: none; margin-top: 20px; padding: 20px; background: var(--light-color); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
<h4>Ответы:</h4>
<ol>
<li>Автоматическое экранирование, наследование шаблонов, читаемый синтаксис, фильтры, кэширование, безопасная среда выполнения.</li>
<li>Все переменные автоматически экранируются при выводе (htmlspecialchars). Для вывода без экранирования нужно явно использовать фильтр |raw.</li>
<li>Фильтры преобразуют данные: |upper (в верхний регистр), |date (форматирование даты), |truncate (обрезание текста), |length (длина массива).</li>
<li>Шаблон-потомок наследует базовый шаблон с помощью {% raw %}<code>{% extends %}</code>{% endraw %} и может переопределять блоки с помощью {% raw %}<code>{% block %}</code>{% endraw %}.</li>
<li>Composer — менеджер зависимостей. Автозагрузка классов позволяет не писать require_once для каждого класса.</li>
<li>С помощью метода <code>$twig->addGlobal('имя', значение)</code> в конфигурации.</li>
<li>{% raw %}<code>{{ variable }}</code>{% endraw %} — вывод с экранированием, {% raw %}<code>{{ variable|raw }}</code>{% endraw %} — вывод без экранирования (опасно для пользовательских данных!).</li>
<li>С помощью тега {% raw %}<code>{% cache 'имя_кэша' время_в_секундах %}...{% endcache %}</code>{% endraw %}.</li>
</ol>
</div>
</div>
</section>

<section class="section tips">
<h2 class="section-title">💡 Советы по работе с Twig</h2>

<div class="tips-grid">
<div class="tip-card">
<div class="tip-icon">🚀</div>
<h3>Начинайте с простых шаблонов</h3>
<p>Не пытайтесь сразу использовать все возможности Twig. Сначала освоите базовый синтаксис, затем фильтры, потом наследование и макросы.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🛡️</div>
<h3>Всегда используйте экранирование</h3>
<p>Избегайте |raw для пользовательских данных. Twig экранирует по умолчанию — это ваша защита от XSS. Используйте |raw только для доверенного HTML.</p>
</div>

<div class="tip-card">
<div class="tip-icon">📁</div>
<h3>Организуйте шаблоны в папки</h3>
<p>Создавайте структуру: layout/, pages/, components/, macros/, errors/. Это упростит навигацию в больших проектах.</p>
</div>

<div class="tip-card">
<div class="tip-icon">⚡</div>
<h3>Включите кэширование в продакшене</h3>
<p>В разработке используйте <code>'debug' => true</code>, в продакшене — <code>'cache' => 'path/to/cache'</code> и <code>'auto_reload' => false</code> для производительности.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🔧</div>
<h3>Создайте свои фильтры и функции</h3>
<p>Часто используемые преобразования выносите в кастомные фильтры: форматирование цен, дат, телефонных номеров и т.д.</p>
</div>

<div class="tip-card">
<div class="tip-icon">📚</div>
<h3>Изучите документацию Twig</h3>
<p>В Twig много встроенных функций и фильтров: <a href="https://twig.symfony.com/doc/3.x/" target="_blank">twig.symfony.com</a></p>
</div>
</div>
</section>


<script>
// Функция для создания оглавления
function generateTableOfContents() {
    const headings = document.querySelectorAll('.section-title, .card h3');
    const tocList = document.getElementById('toc-list');
    
    if (!tocList || headings.length === 0) return;
    
    tocList.innerHTML = '';
    
    headings.forEach((heading, index) => {
        // Пропускаем некоторые заголовки если нужно
        if (heading.textContent.includes('❓') || heading.textContent.includes('✏️')) return;
        
        // Создаем ID для заголовка если его нет
        let headingId = heading.id;
        if (!headingId) {
            headingId = 'heading-' + index;
            heading.id = headingId;
        }
        
        // Определяем уровень вложенности по классам
        let level = 2;
        if (heading.classList.contains('section-title')) {
            level = 1;
        } else if (heading.closest('.card')) {
            level = 3;
        }
        
        // Создаем элемент списка
        const li = document.createElement('li');
        li.className = `toc-item toc-level-${level}`;
        
        const a = document.createElement('a');
        a.href = `#${headingId}`;
        a.className = 'toc-link';
        a.textContent = heading.textContent.replace(/[📚💻💡🎯🛠️✍️🏗️📐🛣️⚙️]/g, '').trim();
        
        a.addEventListener('click', function(e) {
            e.preventDefault();
            closeTOC();
            
            // Плавная прокрутка к заголовку
            const target = document.getElementById(headingId);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
        
        li.appendChild(a);
        tocList.appendChild(li);
    });
}

// Функции для управления модальным окном
function openTOC() {
    const modal = document.getElementById('toc-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeTOC() {
    const modal = document.getElementById('toc-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Создаем HTML для кнопки и модального окна
function createTOCElements() {
    // Кнопка переключения
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'toc-toggle';
    toggleBtn.id = 'toc-toggle';
    toggleBtn.innerHTML = '📑';
    toggleBtn.title = 'Оглавление урока';
    toggleBtn.addEventListener('click', openTOC);
    document.body.appendChild(toggleBtn);
    
    // Модальное окно
    const modal = document.createElement('div');
    modal.className = 'toc-modal';
    modal.id = 'toc-modal';
    
    modal.innerHTML = `
        <div class="toc-content">
            <button class="toc-close" id="toc-close">×</button>
            <h2 style="color: var(--primary-color); margin-bottom: 20px;">Оглавление урока</h2>
            <ul class="toc-list" id="toc-list"></ul>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Закрытие по клику на крестик
    document.getElementById('toc-close').addEventListener('click', closeTOC);
    
    // Закрытие по клику вне контента
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeTOC();
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeTOC();
        }
    });
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Создаем элементы оглавления
    createTOCElements();
    
    // Генерируем оглавление
    generateTableOfContents();
    
    // Показываем/скрываем кнопку при скролле
    let lastScrollTop = 0;
    const tocBtn = document.getElementById('toc-toggle');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Скрываем кнопку при скролле вниз, показываем при скролле вверх
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            tocBtn.style.opacity = '0.6';
            tocBtn.style.transform = 'translateY(-10px)';
        } else {
            tocBtn.style.opacity = '1';
            tocBtn.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
});

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

// Подсветка кода при клике
document.addEventListener('DOMContentLoaded', function() {
const codeBlocks = document.querySelectorAll('pre code');

codeBlocks.forEach(block => {
block.addEventListener('click', function() {
const range = document.createRange();
range.selectNodeContents(this);
const selection = window.getSelection();
selection.removeAllRanges();
selection.addRange(range);

// Показываем всплывающее сообщение
const tooltip = document.createElement('div');
tooltip.textContent = 'Код скопирован в буфер обмена';
tooltip.style.cssText = `
position: fixed;
bottom: 20px;
right: 20px;
background: var(--primary-color);
color: white;
padding: 10px 20px;
border-radius: var(--border-radius);
z-index: 1000;
animation: fadeInOut 2s ease;
`;

document.body.appendChild(tooltip);

// Копируем текст
navigator.clipboard.writeText(block.textContent).then(() => {
setTimeout(() => tooltip.remove(), 2000);
});
});

// Меняем курсор при наведении
block.style.cursor = 'pointer';
block.title = 'Кликните, чтобы скопировать код';
});
});

// Плавная прокрутка для якорных ссылок
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