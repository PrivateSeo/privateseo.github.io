---
layout: news
name: "День 66: Мощь Twig: Наследование и работа с данными"
title: "PHP обучение: Веб-разработка. День 66 - Глубокое погружение в Twig: наследование, инклюды и работа с данными"
description: "Изучаем продвинутые возможности Twig: наследование шаблонов, работа с блоками, инклюды компонентов, передача данных из контроллеров и сложные конструкции в шаблонах."
date: 2025-12-29
image: "/assets/images/news/56405c9ae67673981fa31fe60247faa6.jpg"
category: php
news_id: er6aqq880j6tefd5
---


<div class="goal-box">
<h2 class="goal-title">🎯 Цель урока</h2>
<p>Освоить продвинутые возможности Twig: систему наследования шаблонов, работу с блоками, использование инклюдов для компонентов, передачу сложных данных из контроллеров и создание чистых, структурированных шаблонов для нашего блога.</p>
</div>

<section class="section theory">
<h2 class="section-title">📚 Теоретическая часть (40 минут)</h2>

<div class="card">
<h3><span class="icon">🏗️</span> Наследование шаблонов в Twig</h3>

<p>Наследование — одна из самых мощных возможностей Twig, позволяющая создавать иерархию шаблонов и избегать дублирования кода.</p>

<div class="key-points">
<h4>🔍 Как работает наследование:</h4>
<ol>
<li><strong>Базовый шаблон</strong> определяет общую структуру (скелет) страницы</li>
<li><strong>Блоки (blocks)</strong> — это "дырки" в базовом шаблоне, которые могут быть заполнены в дочерних</li>
<li><strong>Дочерний шаблон</strong> расширяет базовый и переопределяет нужные блоки</li>
<li><strong>Twig собирает</strong> финальную страницу из всех частей</li>
</ol>
</div>

{% raw %}
<div class="comparison-table table--hover">
<table>
<caption>Сравнение подходов к организации шаблонов</caption>
<thead>
<tr>
<th>Подход</th>
<th>Пример</th>
<th>Преимущества</th>
<th>Недостатки</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Копирование кода</strong></td>
<td>header/footer в каждом файле</td>
<td>Просто понять</td>
<td>Дублирование, сложно обновлять</td>
</tr>
<tr>
<td><strong>PHP include</strong></td>
<td><code>&lt;?php include 'header.php'; ?&gt;</code></td>
<td>Переиспользование кода</td>
<td>Нет наследования, сложная вложенность</td>
</tr>
<tr>
<td><strong>Twig наследование</strong></td>
<td><code>{% extends 'base.html.twig' %}</code></td>
<td>Чистая иерархия, переопределение блоков, parent()</td>
<td>Требует понимания концепции</td>
</tr>
</tbody>
</table>
</div>
{% endraw %}

<div class="note">
<p><strong>💡 Реальная аналогия:</strong> Представьте строительство дома. Базовый шаблон — это фундамент и стены. Блоки — это окна и двери (их можно менять). Дочерний шаблон — это внутренняя отделка конкретной комнаты.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">🧩</span> Блоки и их возможности</h3>

<p>Блоки — это места в шаблоне, которые можно переопределить в дочерних шаблонах.</p>

{% raw %}
<div class="key-points">
<h4>📝 Синтаксис блоков:</h4>
<pre><code>{# Базовый шаблон (base.html.twig) #}
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
    &lt;title&gt;{% block title %}Сайт{% endblock %}&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    {% block header %}{% endblock %}
    
    &lt;main&gt;
        {% block content %}
            &lt;p&gt;Контент по умолчанию&lt;/p&gt;
        {% endblock %}
    &lt;/main&gt;
    
    {% block footer %}{% endblock %}
    
    {% block scripts %}
        &lt;script src="/js/common.js"&gt;&lt;/script&gt;
    {% endblock %}
&lt;/body&gt;
&lt;/html&gt;

{# Дочерний шаблон (page.html.twig) #}
{% extends 'base.html.twig' %}

{% block title %}Специальная страница{% endblock %}

{% block content %}
    &lt;h1&gt;Мой контент&lt;/h1&gt;
    {{ parent() }} {# Вызов содержимого блока из родителя #}
{% endblock %}

{% block scripts %}
    {{ parent() }} {# Подключаем скрипты из родителя #}
    &lt;script src="/js/page.js"&gt;&lt;/script&gt; {# Добавляем свои #}
{% endblock %}</code></pre>
</div>
{% endraw %}

<div class="key-points">
<h4>✨ Особенности блоков:</h4>
<ul>
<li><strong>Наследование по умолчанию</strong> — если блок не переопределен, используется версия из родителя</li>
<li><strong><code>parent()</code></strong> — вызов содержимого блока из родительского шаблона</li>
<li><strong>Вложенные блоки</strong> — блоки могут содержать другие блоки</li>
<li><strong>Блоки без содержимого</strong> — можно оставить пустыми: <code>{% block sidebar %}{% endblock %}</code></li>
</ul>
</div>
</div>

<div class="card">
<h3><span class="icon">🧱</span> Инклюды (включаемые компоненты)</h3>

<p>Инклюды позволяют разбивать шаблоны на переиспользуемые компоненты.</p>

{% raw %}
<div class="key-points">
<h4>📝 Использование инклюдов:</h4>
<pre><code>{# Простой инклюд #}
{{ include('components/header.html.twig') }}

{# Инклюд с передачей переменных #}
{{ include('components/post_card.html.twig', {
    'post': post,
    'show_excerpt': true
}) }}

{# Инклюд с условием #}
{% if user.is_admin %}
    {{ include('admin/panel.html.twig') }}
{% endif %}

{# Инклюд с обработкой отсутствия файла #}
{{ include('components/sidebar.html.twig', ignore_missing = true) }}</code></pre>
</div>
{% endraw %}

<div class="key-points">
<h4>📁 Когда использовать инклюды:</h4>
<ul>
<li><strong>Повторяющиеся компоненты</strong> — кнопки, карточки, формы</li>
<li><strong>Части страницы</strong> — header, footer, sidebar, модальные окна</li>
<li><strong>Условные блоки</strong> — рекламные баннеры, уведомления</li>
<li><strong>Комплексные виджеты</strong> — галереи, слайдеры, формы комментариев</li>
</ul>
</div>

<div class="note">
<p><strong>⚡ Производительность:</strong> Twig кэширует инклюды, поэтому их использование не снижает производительность. Наоборот, разделение на компоненты упрощает поддержку.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">📊</span> Работа с данными в Twig</h3>

<p>Twig предоставляет богатые возможности для работы с данными, полученными из контроллеров.</p>

{% raw %}
<div class="key-points">
<h4>📝 Примеры работы с данными:</h4>
<pre><code>{# Работа с массивами #}
{{ post.title }}           {# Доступ к элементу массива #}
{{ post.author.name }}     {# Вложенный доступ #}
{{ posts|length }}         {# Количество элементов #}
{{ posts[0].title }}       {# Доступ по индексу #}

{# Работа с объектами #}
{{ user.getName() }}       {# Вызов метода #}
{{ user.createdAt|date }}  {# Метод + фильтр #}

{# Проверки существования #}
{{ post.image ?? 'default.jpg' }}      {# Оператор null coalescing #}
{{ post.description|default('Нет описания') }}  {# Фильтр default #}
{{ post.tags is defined ? post.tags : [] }}    {# Тернарный оператор #}</code></pre>
</div>
{% endraw %}

<div class="key-points">
<h4>🔄 Циклы и условия в Twig:</h4>
{% raw %}
<pre><code>{# Расширенный цикл for #}
{% for post in posts %}
    {{ loop.index }}       {# Текущий индекс (начинается с 1) #}
    {{ loop.index0 }}      {# Текущий индекс (начинается с 0) #}
    {{ loop.first }}       {# true для первой итерации #}
    {{ loop.last }}        {# true для последней итерации #}
    {{ loop.length }}      {# Общее количество элементов #}
    {{ loop.revindex }}    {# Обратный индекс #}
    
    {# Пропуск итераций #}
    {% if loop.index is odd %}
        {# Нечетные элементы #}
    {% endif %}
{% else %}
    &lt;p&gt;Элементов нет&lt;/p&gt; {# Выполняется если массив пустой #}
{% endfor %}

{# Вложенные циклы #}
{% for category in categories %}
    &lt;h3&gt;{{ category.name }}&lt;/h3&gt;
    {% for post in category.posts %}
        {{ post.title }}
    {% endfor %}
{% endfor %}

{# Сложные условия #}
{% if user.isActive and user.hasPosts %}
    Пользователь активен и имеет статьи
{% elseif user.isActive or user.isAdmin %}
    Пользователь активен или является админом
{% else %}
    Неактивный пользователь
{% endif %}</code></pre>
{% endraw %}
</div>
</div>
</section>

<section class="section practice">
<h2 class="section-title">💻 Практическая часть (2 часа)</h2>

<div class="task">
<h3><span class="icon">✅</span> Шаг 1: Создаем улучшенную структуру папок</h3>

<p>Переорганизуем папку с шаблонами для лучшей структуризации:</p>

<div class="key-points">
<h4>📁 Новая структура папок шаблонов:</h4>
<pre><code>app/views/twig/
├── layout/                 # Базовые шаблоны
│   ├── base.html.twig     # Основной базовый шаблон
│   └── admin.html.twig    # Базовый шаблон для админки
├── components/            # Переиспользуемые компоненты
│   ├── header.html.twig   # Шапка сайта
│   ├── footer.html.twig   # Подвал сайта
│   ├── sidebar.html.twig  # Боковая панель
│   ├── post_card.html.twig # Карточка статьи
│   └── pagination.html.twig # Пагинация
├── pages/                 # Шаблоны страниц
│   ├── home.html.twig     # Главная страница
│   ├── post/              # Страницы статей
│   │   ├── show.html.twig # Просмотр статьи
│   │   └── list.html.twig # Список статей
│   ├── about.html.twig    # О блоге
│   └── contact.html.twig  # Контакты
├── includes/              # Включаемые части
│   ├── head.html.twig     # Секция &lt;head&gt;
│   ├── scripts.html.twig  # Скрипты
│   └── meta.html.twig     # Мета-теги
└── macros/                # Макросы (Twig-функции)
    └── post.html.twig     # Макросы для статей</code></pre>
</div>

<ol>
<li>Создайте указанную структуру папок в вашем проекте</li>
<li>Перенесите существующие файлы в соответствующие папки</li>
</ol>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 2: Создаем улучшенный базовый шаблон</h3>

<p>Обновите <code>app/views/twig/layout/base.html.twig</code>:</p>

{% raw %}
<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    {# Подключаем мета-теги из отдельного файла #}
    {{ include('includes/meta.html.twig') }}
    
    {# Блок для заголовка страницы #}
    &lt;title&gt;{% block title %}{{ site_name }}{% endblock %}&lt;/title&gt;
    
    {# Блок для дополнительных мета-тегов #}
    {% block meta %}{% endblock %}
    
    {# Подключаем CSS стили #}
    &lt;link rel="stylesheet" href="/css/main.css"&gt;
    
    {# Блок для дополнительных стилей страницы #}
    {% block styles %}{% endblock %}
&lt;/head&gt;
&lt;body class="{% block body_class %}{% endblock %}"&gt;
    {# Подключаем шапку сайта как компонент #}
    {{ include('components/header.html.twig') }}
    
    &lt;div class="container"&gt;
        &lt;div class="row"&gt;
            {# Блок для основного контента #}
            &lt;main class="col-md-9" role="main"&gt;
                {# Хлебные крошки #}
                {% block breadcrumbs %}{% endblock %}
                
                {# Сообщения (уведомления, ошибки) #}
                {% block messages %}
                    {% if flash_messages is defined %}
                        {{ include('components/flash_messages.html.twig') }}
                    {% endif %}
                {% endblock %}
                
                {# Основной контент страницы #}
                {% block content %}
                    &lt;p&gt;Контент не определен&lt;/p&gt;
                {% endblock %}
            &lt;/main&gt;
            
            {# Боковая панель #}
            &lt;aside class="col-md-3"&gt;
                {% block sidebar %}
                    {{ include('components/sidebar.html.twig') }}
                {% endblock %}
            &lt;/aside&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    
    {# Подключаем подвал сайта #}
    {{ include('components/footer.html.twig') }}
    
    {# Подключаем общие скрипты #}
    {{ include('includes/scripts.html.twig') }}
    
    {# Блок для скриптов конкретной страницы #}
    {% block scripts %}{% endblock %}
    
    {# Блок для модальных окон и всплывающих элементов #}
    {% block modals %}{% endblock %}
&lt;/body&gt;
&lt;/html&gt;</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 3: Создаем компоненты</h3>

<p>1. Создайте <code>app/views/twig/components/header.html.twig</code>:</p>
{% raw %}
<pre><code>&lt;header class="site-header"&gt;
    &lt;nav class="navbar navbar-expand-lg navbar-dark bg-dark"&gt;
        &lt;div class="container"&gt;
            &lt;a class="navbar-brand" href="{{ url('home') }}"&gt;
                {{ site_name }}
            &lt;/a&gt;
            
            &lt;button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"&gt;
                &lt;span class="navbar-toggler-icon"&gt;&lt;/span&gt;
            &lt;/button&gt;
            
            &lt;div class="collapse navbar-collapse" id="navbarNav"&gt;
                &lt;ul class="navbar-nav me-auto"&gt;
                    {% set nav_items = [
                        {'name': 'Главная', 'url': 'home', 'icon': '🏠'},
                        {'name': 'Блог', 'url': 'posts', 'icon': '📝'},
                        {'name': 'О блоге', 'url': 'about', 'icon': 'ℹ️'},
                        {'name': 'Контакты', 'url': 'contact', 'icon': '📞'}
                    ] %}
                    
                    {% for item in nav_items %}
                        &lt;li class="nav-item"&gt;
                            &lt;a class="nav-link {% if current_page == item.url %}active{% endif %}" 
                               href="{{ url(item.url) }}"&gt;
                                {{ item.icon }} {{ item.name }}
                            &lt;/a&gt;
                        &lt;/li&gt;
                    {% endfor %}
                &lt;/ul&gt;
                
                {# Поиск и пользователь #}
                &lt;div class="d-flex"&gt;
                    &lt;form class="d-flex me-2" action="{{ url('search') }}" method="GET"&gt;
                        &lt;input class="form-control me-2" type="search" name="q" placeholder="Поиск..."&gt;
                        &lt;button class="btn btn-outline-light" type="submit"&gt;Найти&lt;/button&gt;
                    &lt;/form&gt;
                    
                    {% if current_user is defined and current_user %}
                        &lt;div class="dropdown"&gt;
                            &lt;a class="btn btn-outline-light dropdown-toggle" href="#" role="button" 
                               data-bs-toggle="dropdown"&gt;
                                {{ current_user.name }}
                            &lt;/a&gt;
                            &lt;ul class="dropdown-menu"&gt;
                                &lt;li&gt;&lt;a class="dropdown-item" href="{{ url('profile') }}"&gt;Профиль&lt;/a&gt;&lt;/li&gt;
                                &lt;li&gt;&lt;a class="dropdown-item" href="{{ url('logout') }}"&gt;Выйти&lt;/a&gt;&lt;/li&gt;
                            &lt;/ul&gt;
                        &lt;/div&gt;
                    {% else %}
                        &lt;a class="btn btn-outline-light" href="{{ url('login') }}"&gt;Войти&lt;/a&gt;
                    {% endif %}
                &lt;/div&gt;
            &lt;/div&gt;
        &lt;/div&gt;
    &lt;/nav&gt;
&lt;/header&gt;</code></pre>
{% endraw %}

<p>2. Создайте <code>app/views/twig/components/post_card.html.twig</code>:</p>
{% raw %}
<pre><code>{# 
    Компонент карточки статьи
    Принимает переменные: post, show_excerpt (по умолчанию true), class (дополнительные классы)
#}

{% set show_excerpt = show_excerpt ?? true %}
{% set post_class = 'post-card ' ~ (class ?? '') %}

&lt;article class="{{ post_class|trim }}"&gt;
    &lt;div class="post-card-header"&gt;
        {# Категория статьи #}
        {% if post.category is defined and post.category %}
            &lt;span class="post-category badge bg-primary"&gt;
                {{ post.category.name }}
            &lt;/span&gt;
        {% endif %}
        
        {# Дата публикации #}
        &lt;time class="post-date text-muted" datetime="{{ post.created_at }}"&gt;
            {{ post.created_at|date('d.m.Y H:i') }}
        &lt;/time&gt;
    &lt;/div&gt;
    
    &lt;h3 class="post-title"&gt;
        &lt;a href="{{ url('post_show', {'id': post.id}) }}"&gt;
            {{ post.title }}
        &lt;/a&gt;
    &lt;/h3&gt;
    
    {# Автор статьи #}
    {% if post.author is defined and post.author %}
        &lt;div class="post-author"&gt;
            Автор: 
            {% if post.author.url %}
                &lt;a href="{{ post.author.url }}"&gt;{{ post.author.name }}&lt;/a&gt;
            {% else %}
                {{ post.author.name }}
            {% endif %}
        &lt;/div&gt;
    {% endif %}
    
    {# Краткое содержание #}
    {% if show_excerpt and post.excerpt is defined and post.excerpt %}
        &lt;div class="post-excerpt"&gt;
            {{ post.excerpt|truncate(200) }}
        &lt;/div&gt;
    {% endif %}
    
    {# Теги #}
    {% if post.tags is defined and post.tags|length > 0 %}
        &lt;div class="post-tags"&gt;
            {% for tag in post.tags %}
                &lt;a href="{{ url('tag', {'slug': tag.slug}) }}" class="tag"&gt;
                    #{{ tag.name }}
                &lt;/a&gt;
            {% endfor %}
        &lt;/div&gt;
    {% endif %}
    
    {# Статистика #}
    &lt;div class="post-stats"&gt;
        {% if post.views is defined %}
            &lt;span class="stat"&gt;👁️ {{ post.views }}&lt;/span&gt;
        {% endif %}
        
        {% if post.comments_count is defined %}
            &lt;span class="stat"&gt;💬 {{ post.comments_count }}&lt;/span&gt;
        {% endif %}
        
        {% if post.likes is defined %}
            &lt;span class="stat"&gt;👍 {{ post.likes }}&lt;/span&gt;
        {% endif %}
    &lt;/div&gt;
&lt;/article&gt;</code></pre>
{% endraw %}

<p>3. Создайте <code>app/views/twig/includes/meta.html.twig</code>:</p>
{% raw %}
<pre><code>&lt;meta charset="UTF-8"&gt;
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
&lt;meta name="description" content="{% block meta_description %}Блог о веб-разработке на PHP и Twig{% endblock %}"&gt;
&lt;meta name="keywords" content="{% block meta_keywords %}PHP, Twig, MVC, веб-разработка, программирование{% endblock %}"&gt;
&lt;meta name="author" content="{{ site_name }}"&gt;

{# Open Graph мета-теги для соцсетей #}
&lt;meta property="og:title" content="{% block og_title %}{{ block('title') }}{% endblock %}"&gt;
&lt;meta property="og:description" content="{{ block('meta_description') }}"&gt;
&lt;meta property="og:type" content="website"&gt;
&lt;meta property="og:url" content="{{ app.request.uri }}"&gt;
&lt;meta property="og:image" content="{% block og_image %}/images/og-default.jpg{% endblock %}"&gt;
&lt;meta property="og:site_name" content="{{ site_name }}"&gt;

{# Twitter Card мета-теги #}
&lt;meta name="twitter:card" content="summary_large_image"&gt;
&lt;meta name="twitter:title" content="{{ block('title') }}"&gt;
&lt;meta name="twitter:description" content="{{ block('meta_description') }}"&gt;
&lt;meta name="twitter:image" content="{{ block('og_image') }}"&gt;

{# Канонический URL #}
&lt;link rel="canonical" href="{% block canonical_url %}{{ app.request.uri }}{% endblock %}"&gt;

{# Favicon #}
&lt;link rel="icon" href="/favicon.ico" type="image/x-icon"&gt;
&lt;link rel="apple-touch-icon" href="/apple-touch-icon.png"&gt;</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 4: Переписываем главную страницу с наследованием</h3>

<p>Обновите <code>app/views/twig/pages/home.html.twig</code>:</p>

{% raw %}
<pre><code>{# Наследуем базовый шаблон #}
{% extends 'layout/base.html.twig' %}

{# Переопределяем заголовок страницы #}
{% block title %}Главная | {{ parent() }}{% endblock %}

{# Добавляем класс для body #}
{% block body_class %}home-page{% endblock %}

{# Добавляем мета-описание для главной #}
{% block meta_description %}
    Добро пожаловать в блог о веб-разработке! Изучаем PHP, Twig, MVC архитектуру и современные технологии.
{% endblock %}

{# Переопределяем основной контент #}
{% block content %}
    &lt;div class="hero-section text-center mb-5"&gt;
        &lt;h1 class="display-4"&gt;Добро пожаловать в наш блог!&lt;/h1&gt;
        &lt;p class="lead"&gt;Здесь мы делимся знаниями о веб-разработке, PHP, Twig и современных технологиях.&lt;/p&gt;
        &lt;a href="{{ url('posts') }}" class="btn btn-primary btn-lg"&gt;Читать статьи&lt;/a&gt;
    &lt;/div&gt;
    
    {# Рекомендуемые статьи #}
    {% if featured_posts is defined and featured_posts|length > 0 %}
        &lt;section class="featured-posts mb-5"&gt;
            &lt;h2 class="section-title"&gt;🔥 Рекомендуемые статьи&lt;/h2&gt;
            &lt;div class="row"&gt;
                {% for post in featured_posts %}
                    &lt;div class="col-md-4 mb-4"&gt;
                        {{ include('components/post_card.html.twig', {
                            'post': post,
                            'class': 'featured'
                        }) }}
                    &lt;/div&gt;
                {% endfor %}
            &lt;/div&gt;
        &lt;/section&gt;
    {% endif %}
    
    {# Последние статьи #}
    &lt;section class="recent-posts"&gt;
        &lt;h2 class="section-title"&gt;📝 Последние статьи&lt;/h2&gt;
        
        {% if posts is defined and posts|length > 0 %}
            &lt;div class="row"&gt;
                {% for post in posts %}
                    {# Чередование колонок: на больших экранах 2 колонки, на средних 2, на маленьких 1 #}
                    &lt;div class="col-lg-6 col-md-6 col-sm-12 mb-4"&gt;
                        {{ include('components/post_card.html.twig', {
                            'post': post,
                            'show_excerpt': true
                        }) }}
                    &lt;/div&gt;
                    
                    {# Добавляем разделитель после каждой второй статьи #}
                    {% if loop.index is even and not loop.last %}
                        &lt;div class="w-100 d-none d-lg-block"&gt;&lt;/div&gt;
                    {% endif %}
                {% endfor %}
            &lt;/div&gt;
            
            {# Пагинация, если есть #}
            {% if pagination is defined %}
                {{ include('components/pagination.html.twig', pagination) }}
            {% endif %}
        {% else %}
            &lt;div class="alert alert-info"&gt;
                Статей пока нет. Возвращайтесь позже!
            &lt;/div&gt;
        {% endif %}
    &lt;/section&gt;
    
    {# Категории #}
    {% if categories is defined and categories|length > 0 %}
        &lt;section class="categories mt-5"&gt;
            &lt;h2 class="section-title"&gt;🏷️ Категории&lt;/h2&gt;
            &lt;div class="row"&gt;
                {% for category in categories %}
                    &lt;div class="col-md-3 col-sm-6 mb-3"&gt;
                        &lt;div class="card category-card"&gt;
                            &lt;div class="card-body text-center"&gt;
                                &lt;h5 class="card-title"&gt;{{ category.name }}&lt;/h5&gt;
                                &lt;p class="card-text"&gt;
                                    {{ category.post_count }} статей
                                &lt;/p&gt;
                                &lt;a href="{{ url('category', {'slug': category.slug}) }}" 
                                   class="btn btn-outline-primary"&gt;
                                    Смотреть
                                &lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                {% endfor %}
            &lt;/div&gt;
        &lt;/section&gt;
    {% endif %}
{% endblock %}

{# Добавляем скрипты только для главной страницы #}
{% block scripts %}
    {{ parent() }}
    &lt;script&gt;
        // Инициализация слайдера для рекомендуемых статей
        document.addEventListener('DOMContentLoaded', function() {
            const featuredPosts = document.querySelector('.featured-posts');
            if (featuredPosts) {
                console.log('Главная страница загружена, слайдер готов к работе');
            }
        });
    &lt;/script&gt;
{% endblock %}</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 5: Создаем шаблон для отдельной статьи</h3>

<p>Создайте <code>app/views/twig/pages/post/show.html.twig</code>:</p>

{% raw %}
<pre><code>{# Шаблон для просмотра одной статьи #}
{% extends 'layout/base.html.twig' %}

{% block title %}{{ post.title }} | {{ parent() }}{% endblock %}

{% block meta_description %}{{ post.excerpt|default(post.content|truncate(160)) }}{% endblock %}

{% block meta_keywords %}
    {% if post.tags is defined %}
        {{ post.tags|map(tag => tag.name)|join(', ') }}
    {% else %}
        {{ parent() }}
    {% endif %}
{% endblock %}

{% block og_title %}{{ post.title }}{% endblock %}
{% block og_image %}{{ post.image|default('/images/og-default.jpg') }}{% endblock %}
{% block canonical_url %}{{ url('post_show', {'id': post.id}) }}{% endblock %}

{% block breadcrumbs %}
    &lt;nav aria-label="breadcrumb"&gt;
        &lt;ol class="breadcrumb"&gt;
            &lt;li class="breadcrumb-item"&gt;&lt;a href="{{ url('home') }}"&gt;Главная&lt;/a&gt;&lt;/li&gt;
            &lt;li class="breadcrumb-item"&gt;&lt;a href="{{ url('posts') }}"&gt;Блог&lt;/a&gt;&lt;/li&gt;
            {% if post.category %}
                &lt;li class="breadcrumb-item"&gt;
                    &lt;a href="{{ url('category', {'slug': post.category.slug}) }}"&gt;
                        {{ post.category.name }}
                    &lt;/a&gt;
                &lt;/li&gt;
            {% endif %}
            &lt;li class="breadcrumb-item active" aria-current="page"&gt;{{ post.title|truncate(50) }}&lt;/li&gt;
        &lt;/ol&gt;
    &lt;/nav&gt;
{% endblock %}

{% block content %}
    &lt;article class="single-post"&gt;
        {# Заголовок статьи #}
        &lt;header class="post-header"&gt;
            {% if post.category %}
                &lt;span class="post-category badge bg-primary"&gt;
                    {{ post.category.name }}
                &lt;/span&gt;
            {% endif %}
            
            &lt;h1 class="post-title"&gt;{{ post.title }}&lt;/h1&gt;
            
            &lt;div class="post-meta"&gt;
                {# Автор и дата #}
                &lt;div class="post-author-date"&gt;
                    {% if post.author %}
                        &lt;span class="post-author"&gt;
                            👤 
                            {% if post.author.url %}
                                &lt;a href="{{ post.author.url }}"&gt;{{ post.author.name }}&lt;/a&gt;
                            {% else %}
                                {{ post.author.name }}
                            {% endif %}
                        &lt;/span&gt;
                    {% endif %}
                    
                    &lt;span class="post-date"&gt;
                        📅 {{ post.created_at|date('d.m.Y H:i') }}
                    &lt;/span&gt;
                    
                    {% if post.updated_at and post.updated_at != post.created_at %}
                        &lt;span class="post-updated" title="Обновлено"&gt;
                            ✏️ {{ post.updated_at|date('d.m.Y H:i') }}
                        &lt;/span&gt;
                    {% endif %}
                &lt;/div&gt;
                
                {# Статистика #}
                &lt;div class="post-stats"&gt;
                    {% if post.views is defined %}
                        &lt;span class="stat" title="Просмотры"&gt;👁️ {{ post.views }}&lt;/span&gt;
                    {% endif %}
                    
                    {% if post.reading_time is defined %}
                        &lt;span class="stat" title="Время чтения"&gt;⏱️ {{ post.reading_time }} мин.&lt;/span&gt;
                    {% endif %}
                &lt;/div&gt;
            &lt;/div&gt;
            
            {# Изображение статьи #}
            {% if post.image %}
                &lt;div class="post-image"&gt;
                    &lt;img src="{{ post.image }}" alt="{{ post.title }}" class="img-fluid rounded"&gt;
                    {% if post.image_caption %}
                        &lt;div class="image-caption text-muted"&gt;{{ post.image_caption }}&lt;/div&gt;
                    {% endif %}
                &lt;/div&gt;
            {% endif %}
        &lt;/header&gt;
        
        {# Контент статьи #}
        &lt;div class="post-content"&gt;
            {{ post.content|raw }}
        &lt;/div&gt;
        
        {# Теги статьи #}
        {% if post.tags is defined and post.tags|length > 0 %}
            &lt;footer class="post-footer"&gt;
                &lt;div class="post-tags"&gt;
                    &lt;strong&gt;Теги:&lt;/strong&gt;
                    {% for tag in post.tags %}
                        &lt;a href="{{ url('tag', {'slug': tag.slug}) }}" class="tag badge bg-secondary"&gt;
                            #{{ tag.name }}
                        &lt;/a&gt;
                    {% endfor %}
                &lt;/div&gt;
                
                {# Кнопки действий #}
                &lt;div class="post-actions mt-3"&gt;
                    &lt;button class="btn btn-outline-primary btn-sm" onclick="window.print()"&gt;
                        🖨️ Печать
                    &lt;/button&gt;
                    &lt;button class="btn btn-outline-secondary btn-sm" id="share-button"&gt;
                        📤 Поделиться
                    &lt;/button&gt;
                    &lt;a href="#comments" class="btn btn-outline-success btn-sm"&gt;
                        💬 Комментарии ({{ post.comments_count|default(0) }})
                    &lt;/a&gt;
                &lt;/div&gt;
            &lt;/footer&gt;
        {% endif %}
    &lt;/article&gt;
    
    {# Навигация по статьям #}
    {% if prev_post or next_post %}
        &lt;nav class="post-navigation mt-5"&gt;
            &lt;div class="row"&gt;
                {% if prev_post %}
                    &lt;div class="col-md-6"&gt;
                        &lt;div class="card"&gt;
                            &lt;div class="card-body"&gt;
                                &lt;small class="text-muted"&gt;Предыдущая статья&lt;/small&gt;
                                &lt;h5 class="card-title"&gt;{{ prev_post.title }}&lt;/h5&gt;
                                &lt;a href="{{ url('post_show', {'id': prev_post.id}) }}" class="btn btn-link"&gt;
                                    ← Читать
                                &lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                {% endif %}
                
                {% if next_post %}
                    &lt;div class="col-md-6"&gt;
                        &lt;div class="card"&gt;
                            &lt;div class="card-body text-end"&gt;
                                &lt;small class="text-muted"&gt;Следующая статья&lt;/small&gt;
                                &lt;h5 class="card-title"&gt;{{ next_post.title }}&lt;/h5&gt;
                                &lt;a href="{{ url('post_show', {'id': next_post.id}) }}" class="btn btn-link"&gt;
                                    Читать →
                                &lt;/a&gt;
                            &lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                {% endif %}
            &lt;/div&gt;
        &lt;/nav&gt;
    {% endif %}
    
    {# Похожие статьи #}
    {% if related_posts is defined and related_posts|length > 0 %}
        &lt;section class="related-posts mt-5"&gt;
            &lt;h3&gt;📚 Похожие статьи&lt;/h3&gt;
            &lt;div class="row"&gt;
                {% for related in related_posts %}
                    &lt;div class="col-md-4 mb-3"&gt;
                        {{ include('components/post_card.html.twig', {
                            'post': related,
                            'show_excerpt': false
                        }) }}
                    &lt;/div&gt;
                {% endfor %}
            &lt;/div&gt;
        &lt;/section&gt;
    {% endif %}
    
    {# Комментарии (будет в следующем уроке) #}
    &lt;section id="comments" class="comments mt-5"&gt;
        &lt;h3&gt;💬 Комментарии&lt;/h3&gt;
        &lt;p class="text-muted"&gt;Система комментариев будет добавлена в следующем уроке.&lt;/p&gt;
    &lt;/section&gt;
{% endblock %}

{% block sidebar %}
    {# Переопределяем сайдбар для страницы статьи #}
    &lt;div class="sidebar-widget"&gt;
        &lt;h4&gt;📊 Статистика статьи&lt;/h4&gt;
        &lt;ul class="list-group"&gt;
            {% if post.views is defined %}
                &lt;li class="list-group-item d-flex justify-content-between"&gt;
                    Просмотры
                    &lt;span class="badge bg-primary rounded-pill"&gt;{{ post.views }}&lt;/span&gt;
                &lt;/li&gt;
            {% endif %}
            {% if post.comments_count is defined %}
                &lt;li class="list-group-item d-flex justify-content-between"&gt;
                    Комментарии
                    &lt;span class="badge bg-success rounded-pill"&gt;{{ post.comments_count }}&lt;/span&gt;
                &lt;/li&gt;
            {% endif %}
            {% if post.likes is defined %}
                &lt;li class="list-group-item d-flex justify-content-between"&gt;
                    Лайки
                    &lt;span class="badge bg-danger rounded-pill"&gt;{{ post.likes }}&lt;/span&gt;
                &lt;/li&gt;
            {% endif %}
        &lt;/ul&gt;
    &lt;/div&gt;
    
    {# Поделиться в соцсетях #}
    &lt;div class="sidebar-widget mt-4"&gt;
        &lt;h4&gt;📤 Поделиться&lt;/h4&gt;
        &lt;div class="social-share"&gt;
            &lt;button class="btn btn-outline-primary btn-sm me-1"&gt;Facebook&lt;/button&gt;
            &lt;button class="btn btn-outline-info btn-sm me-1"&gt;Twitter&lt;/button&gt;
            &lt;button class="btn btn-outline-danger btn-sm"&gt;VK&lt;/button&gt;
        &lt;/div&gt;
    &lt;/div&gt;
    
    {{ parent() }} {# Подключаем стандартный сайдбар #}
{% endblock %}

{% block scripts %}
    {{ parent() }}
    &lt;script&gt;
        // Скрипт для кнопки "Поделиться"
        document.getElementById('share-button').addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: '{{ post.title }}',
                    text: '{{ post.excerpt|default("") }}',
                    url: window.location.href
                });
            } else {
                // Фолбэк для старых браузеров
                navigator.clipboard.writeText(window.location.href);
                alert('Ссылка скопирована в буфер обмена!');
            }
        });
        
        // Подсветка кода в статье (если есть)
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    &lt;/script&gt;
{% endblock %}</code></pre>
{% endraw %}
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 6: Обновляем контроллер для передачи данных</h3>

<p>Обновите <code>app/controllers/HomeController.php</code> для передачи расширенных данных:</p>

<pre><code>&lt;?php
// app/controllers/HomeController.php

namespace App\Controllers;

class HomeController
{
    private $twig;
    
    public function __construct(\Twig\Environment $twig)
    {
        $this->twig = $twig;
    }
    
    public function index()
    {
        // Сложная структура данных для главной страницы
        $data = [
            'current_page' => 'home',
            'title' => 'Главная | MVC Блог с Twig',
            
            // Рекомендуемые статьи
            'featured_posts' => [
                [
                    'id' => 1,
                    'title' => 'Введение в Twig: наследование шаблонов',
                    'excerpt' => 'Узнайте, как использовать мощную систему наследования Twig для создания чистых и структурированных шаблонов.',
                    'content' => 'Полное содержание статьи...',
                    'created_at' => '2026-01-01 10:30:00',
                    'author' => ['name' => 'Иван Петров', 'url' => '/author/1'],
                    'category' => ['name' => 'Twig', 'slug' => 'twig'],
                    'views' => 150,
                    'comments_count' => 5,
                    'likes' => 42,
                    'image' => '/images/twig-intro.jpg',
                    'tags' => [
                        ['name' => 'Twig', 'slug' => 'twig'],
                        ['name' => 'Шаблоны', 'slug' => 'templates']
                    ]
                ],
                // ... другие рекомендованные статьи
            ],
            
            // Последние статьи
            'posts' => [
                [
                    'id' => 2,
                    'title' => 'MVC архитектура для начинающих',
                    'excerpt' => 'Разбираем принципы Model-View-Controller на простых примерах.',
                    'created_at' => '2026-01-02 14:20:00',
                    'author' => ['name' => 'Анна Сидорова'],
                    'views' => 89,
                    'comments_count' => 3
                ],
                [
                    'id' => 3,
                    'title' => 'Работа с базами данных в PHP',
                    'excerpt' => 'Подробное руководство по PDO и безопасным запросам.',
                    'created_at' => '2026-01-03 09:15:00',
                    'author' => ['name' => 'Петр Иванов'],
                    'views' => 120,
                    'comments_count' => 7
                ],
                // ... больше статей
            ],
            
            // Категории блога
            'categories' => [
                ['name' => 'PHP', 'slug' => 'php', 'post_count' => 15],
                ['name' => 'Twig', 'slug' => 'twig', 'post_count' => 8],
                ['name' => 'Базы данных', 'slug' => 'databases', 'post_count' => 12],
                ['name' => 'Веб-разработка', 'slug' => 'webdev', 'post_count' => 25]
            ],
            
            // Пагинация (если есть)
            'pagination' => [
                'current' => 1,
                'total' => 5,
                'path' => '/?page=home'
            ],
            
            // Пользователь (заглушка)
            'current_user' => null
        ];
        
        echo $this->twig->render('pages/home.html.twig', $data);
    }
    
    public function postShow($id)
    {
        // Данные для отдельной статьи (заглушка)
        $data = [
            'current_page' => 'post',
            'post' => [
                'id' => $id,
                'title' => 'Полное руководство по Twig: наследование, блоки и инклюды',
                'excerpt' => 'Исчерпывающее руководство по всем возможностям Twig шаблонизатора.',
                'content' => '&lt;h2&gt;Введение&lt;/h2&gt;
                            &lt;p&gt;Twig — это современный шаблонизатор для PHP...&lt;/p&gt;
                            &lt;h2&gt;Наследование шаблонов&lt;/h2&gt;
                            &lt;p&gt;Одна из самых мощных возможностей Twig...&lt;/p&gt;
                            &lt;pre&gt;&lt;code class="php"&gt;
                            // Пример кода
                            $twig-&gt;render(\'template.html.twig\', $data);
                            &lt;/code&gt;&lt;/pre&gt;',
                'created_at' => '2026-01-01 10:30:00',
                'updated_at' => '2026-01-02 11:45:00',
                'author' => ['name' => 'Иван Петров', 'url' => '/author/1'],
                'category' => ['name' => 'Twig', 'slug' => 'twig'],
                'views' => 250,
                'reading_time' => 8,
                'comments_count' => 15,
                'likes' => 78,
                'image' => '/images/twig-guide.jpg',
                'image_caption' => 'Twig - современный шаблонизатор для PHP',
                'tags' => [
                    ['name' => 'Twig', 'slug' => 'twig'],
                    ['name' => 'PHP', 'slug' => 'php'],
                    ['name' => 'Шаблоны', 'slug' => 'templates'],
                    ['name' => 'Разработка', 'slug' => 'development']
                ]
            ],
            
            // Похожие статьи
            'related_posts' => [
                [
                    'id' => 4,
                    'title' => 'Фильтры и функции в Twig',
                    'excerpt' => 'Изучаем встроенные и создаем свои фильтры.',
                    'created_at' => '2026-01-04 16:40:00',
                    'views' => 95
                ],
                // ... другие похожие статьи
            ],
            
            // Навигация по статьям
            'prev_post' => [
                'id' => $id - 1,
                'title' => 'Предыдущая статья: Введение в MVC'
            ],
            'next_post' => $id < 10 ? [
                'id' => $id + 1,
                'title' => 'Следующая статья: Работа с формами в Twig'
            ] : null,
            
            'current_user' => null
        ];
        
        echo $this->twig->render('pages/post/show.html.twig', $data);
    }
    
    // ... остальные методы
}</code></pre>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 7: Тестирование обновленного блога</h3>

<ol>
<li>Запустите локальный сервер и откройте главную страницу:
<pre><code>http://localhost/mvc_blog/public/?page=home</code></pre>
Проверьте:
<ul>
<li>Наследование шаблона работает</li>
<li>Все компоненты (header, footer, sidebar) отображаются</li>
<li>Карточки статей используют компонент post_card</li>
<li>Мета-теги корректно заполнены</li>
</ul>
</li>

<li>Создайте временный маршрут для просмотра статьи:
<pre><code>// Добавьте в public/index.php
case 'post':
    $controller = 'App\\Controllers\\HomeController';
    $action = 'postShow';
    $id = $_GET['id'] ?? 1;
    $controllerInstance = new $controller($twig);
    $controllerInstance->$action($id);
    break;</code></pre>
</li>

<li>Откройте страницу статьи:
<pre><code>http://localhost/mvc_blog/public/?page=post&id=1</code></pre>
Проверьте:
<ul>
<li>Блоки корректно переопределяются</li>
<li>Хлебные крошки работают</li>
<li>Сайдбар переопределен для страницы статьи</li>
<li>Мета-теги специфичны для статьи</li>
<li>Навигация по статьям отображается</li>
</ul>
</li>

<li>Проверьте исходный код страниц (Ctrl+U):
<ul>
<li>HTML чистый, без PHP тегов</li>
<li>Структура соответствует базовому шаблону</li>
<li>Скрипты подключаются в правильном порядке</li>
</ul>
</li>
</ol>

<div class="note">
<p><strong>🔍 Важное наблюдение:</strong> Обратите внимание, как Twig автоматически экранирует все переменные. В статье с тегом <code>&lt;script&gt;</code> в заголовке, тег отображается как текст, а не выполняется!</p>
</div>
</div>

<div class="task">
<h3><span class="icon">🧪</span> Эксперименты с наследованием и инклюдами</h3>

<div class="key-points">
<h4>Эксперимент 1: Создайте шаблон для админ-панели</h4>
<ol>
<li>Создайте <code>app/views/twig/layout/admin.html.twig</code>:
{% raw %}
<pre><code>{# Базовый шаблон для админки #}
{% extends 'layout/base.html.twig' %}

{% block body_class %}{{ parent() }} admin-panel{% endblock %}

{% block header %}
    {# Упрощенная шапка для админки #}
    &lt;header class="admin-header"&gt;
        &lt;nav&gt;
            &lt;a href="{{ url('admin_dashboard') }}"&gt;Панель управления&lt;/a&gt;
            &lt;a href="{{ url('admin_posts') }}"&gt;Статьи&lt;/a&gt;
            &lt;a href="{{ url('admin_users') }}"&gt;Пользователи&lt;/a&gt;
        &lt;/nav&gt;
    &lt;/header&gt;
{% endblock %}

{% block sidebar %}
    {# Сайдбар админки #}
    {{ include('admin/components/sidebar.html.twig') }}
{% endblock %}

{% block footer %}
    {# Упрощенный футер для админки #}
    &lt;footer class="admin-footer"&gt;
        &lt;p&gt;Админ-панель &copy; {{ current_year }}&lt;/p&gt;
    &lt;/footer&gt;
{% endblock %}</code></pre>
{% endraw %}
</li>
<li>Создайте дочерний шаблон: <code>admin/dashboard.html.twig</code></li>
<li>Посмотрите, как работает наследование второго уровня</li>
</ol>

<h4>Эксперимент 2: Создайте динамический сайдбар</h4>
<ol>
<li>В базовом шаблоне добавьте передачу данных в инклюд:
{% raw %}
<pre><code>{{ include('components/sidebar.html.twig', {
    'widgets': ['categories', 'popular_posts', 'tags_cloud']
}) }}</code></pre>
{% endraw %}
</li>
<li>В компоненте сайдбара проверяйте, какие виджеты показывать</li>
<li>Разные страницы могут иметь разные наборы виджетов</li>
</ol>

<h4>Эксперимент 3: Используйте макросы для форм</h4>
<ol>
<li>Создайте <code>app/views/twig/macros/form.html.twig</code>:
{% raw %}
<pre><code>{# Макрос для создания полей формы #}
{% macro input(name, value = '', type = 'text', class = '') %}
    &lt;input type="{{ type }}" 
           name="{{ name }}" 
           value="{{ value }}" 
           class="form-control {{ class }}"
           id="{{ name }}"&gt;
{% endmacro %}

{% macro textarea(name, value = '', rows = 5, class = '') %}
    &lt;textarea name="{{ name }}" 
              class="form-control {{ class }}"
              rows="{{ rows }}"
              id="{{ name }}"&gt;{{ value }}&lt;/textarea&gt;
{% endmacro %}</code></pre>
{% endraw %}
</li>
<li>Используйте в шаблоне:
{% raw %}
<pre><code>{% import 'macros/form.html.twig' as form %}

{{ form.input('username', user.username) }}
{{ form.textarea('bio', user.bio, 3) }}</code></pre>
{% endraw %}
</li>
</ol>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">📋 Домашнее задание</h2>

<div class="homework">
<h3><span class="icon">✏️</span> Задание на день 3</h3>

<ol>
<li>Реорганизуйте структуру шаблонов как показано в уроке</li>
<li>Создайте полноценный базовый шаблон с использованием блоков:
<ul>
<li>Минимум 6 блоков (title, content, sidebar, scripts, styles, meta)</li>
<li>Используйте <code>parent()</code> для наследования содержимого</li>
</ul>
</li>
<li>Создайте 3 компонента (инклюда):
<ul>
<li>Компонент "подвал сайта" с контактами и соцсетями</li>
<li>Компонент "хлебные крошки" с динамическими данными</li>
<li>Компонент "пагинация" с параметрами</li>
</ul>
</li>
<li>Создайте страницу списка статей (<code>posts.html.twig</code>):
<ul>
<li>Наследует базовый шаблон</li>
<li>Использует компонент post_card для каждой статьи</li>
<li>Имеет пагинацию (можно заглушку)</li>
<li>Имеет фильтры по категориям и датам</li>
</ul>
</li>
<li>Реализуйте шаблон для страницы "О блоге" (<code>about.html.twig</code>):
<ul>
<li>Использует уникальный макет (двухколоночный)</li>
<li>Содержит информацию о проекте и команде</li>
<li>Имеет блок "преимущества" с иконками</li>
</ul>
</li>
<li><strong>Бонус:</strong> Создайте шаблон для 404 ошибки с наследованием, но своим уникальным дизайном</li>
<li><strong>Бонус 2:</strong> Реализуйте систему виджетов для сайдбара, где разные страницы могут показывать разные наборы виджетов</li>
</ol>
</div>
</section>

<section class="section">
<h2 class="section-title">🧠 Проверка понимания</h2>

<div class="quiz">
<h3><span class="icon">❓</span> Вопросы для самопроверки</h3>

<ol>
<li>Как работает система наследования в Twig и чем она лучше простых инклюдов?</li>
<li>Что делает функция <code>parent()</code> и когда её нужно использовать?</li>
<li>Чем отличается <code>include</code> от <code>extends</code> в Twig?</li>
<li>Как передать переменные в инклюдируемый компонент?</li>
<li>Какие преимущества дает разбиение шаблонов на компоненты?</li>
<li>Как организовать разные сайдбары для разных страниц?</li>
<li>Что такое блоки в Twig и как они помогают в создании шаблонов?</li>
<li>Как Twig обрабатывает отсутствие переопределенного блока в дочернем шаблоне?</li>
</ol>

<button onclick="toggleAnswers()" class="button button--primary" style="margin-top: 20px;">Показать ответы</button>

<div id="answers" style="display: none; margin-top: 20px; padding: 20px; background: var(--light-color); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
<h4>Ответы:</h4>
<ol>
<li>Наследование создает иерархию: базовый шаблон определяет структуру, дочерние переопределяют блоки. Это лучше инклюдов, так как позволяет создавать четкую иерархию и избегать дублирования.</li>
<li><code>parent()</code> вызывает содержимое блока из родительского шаблона. Используется, когда нужно добавить что-то к содержимому родителя, а не полностью заменить его.</li>
<li><code>extends</code> — для наследования структуры, <code>include</code> — для вставки готовых компонентов. <code>extends</code> может быть только один, <code>include</code> — сколько угодно.</li>
<li>Вторым параметром: <code>{{ include('component.html.twig', {'var': value}) }}</code></li>
<li>Переиспользование, упрощение поддержки, возможность тестирования компонентов отдельно, единообразие интерфейса.</li>
<li>Переопределить блок sidebar в дочернем шаблоне или передать разные параметры в инклюд сайдбара.</li>
<li>Блоки — это именованные участки шаблона, которые можно переопределить в дочерних шаблонах. Они позволяют создавать гибкую структуру.</li>
<li>Если блок не переопределен, используется содержимое блока из родительского шаблона (или остается пустым, если в родителе нет содержимого).</li>
</ol>
</div>
</div>
</section>

<section class="section tips">
<h2 class="section-title">💡 Продвинутые советы по Twig</h2>

<div class="tips-grid">
<div class="tip-card">
<div class="tip-icon">🏗️</div>
<h3>Планируйте иерархию шаблонов</h3>
<p>Создайте схему наследования перед началом разработки. Например: base → layout → section → page. Это упростит поддержку.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🧩</div>
<h3>Декомпозируйте на компоненты</h3>
<p>Разбивайте интерфейс на маленькие переиспользуемые компоненты. Компонент должен делать одну вещь и делать её хорошо.</p>
</div>

<div class="tip-card">
<div class="tip-icon">⚡</div>
<h3>Используйте кэширование блоков</h3>
<p>Для редко меняющихся блоков используйте: {% raw %}<code>{% cache 'block_name' 3600 %}...{% endcache %}</code>{% endraw %}. Это ускорит рендеринг.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🔧</div>
<h3>Создайте библиотеку макросов</h3>
<p>Часто используемые элементы (кнопки, формы, алерты) выносите в макросы. Это обеспечит единообразие интерфейса.</p>
</div>

<div class="tip-card">
<div class="tip-icon">📱</div>
<h3>Учитывайте mobile-first</h3>
<p>Проектируйте шаблоны сначала для мобильных, затем адаптируйте для десктопов. Twig отлично работает с CSS-фреймворками.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🔍</div>
<h3>Оптимизируйте для SEO</h3>
<p>Используйте блоки для мета-тегов, Open Graph и структурированных данных. Каждая страница должна иметь уникальные мета-данные.</p>
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