---
layout: news
name: "День 64: Архитектура MVC и простой роутинг"
title: "PHP обучение: Веб-разработка. День 64 - Принципы MVC и первый роутинг"
description: "Изучаем архитектурный шаблон Model-View-Controller (MVC), создаем структуру проекта и реализуем 'наивный' роутинг."
date: 2026-01-01
image: "/assets/images/news/2af1e42092f92ec5a2b305a2498411f5.jpg"
category: php
news_id: 8c5267779i5s47c4
---

<div class="goal-box">
<h3 class="goal-title">🎯 Цель урока</h3>
<p>Понять, зачем нужна архитектура MVC для веб-приложений. Создать базовую структуру проекта, реализовать простой роутинг и разделить код по ответственностям (логика, данные, представление).</p>
</div>

<section class="section theory">
<h2 class="section-title">📚 Теоретическая часть (40 минут)</h2>

<div class="card">
<h3><span class="icon">🏗️</span> Почему нельзя просто писать весь код в одном файле?</h3>

<p><strong>"Спагетти-код"</strong> — это когда HTML, PHP-логика, работа с базой данных и проверки форм перемешаны в одном или нескольких файлах без четкой структуры.</p>

<div class="key-points">
<h4>🔍 Проблемы монолитного кода:</h4>
<ul>
<li><strong>Сложно поддерживать</strong> — чтобы изменить отображение, нужно искать код среди логики</li>
<li><strong>Трудно тестировать</strong> — нельзя проверить отдельные части приложения</li>
<li><strong>Невозможно повторно использовать</strong> — код заточен под конкретную страницу</li>
<li><strong>Опасно для безопасности</strong> — легко допустить ошибку при смешивании логики и вывода</li>
<li><strong>Затруднена командная работа</strong> — несколько разработчиков не могут работать одновременно</li>
</ul>
</div>

<div class="note">
<p><strong>💡 Реальная аналогия:</strong> Представьте кухню, где продукты, ножи, посуда и готовые блюда разбросаны по всему столу без порядка. Шеф-повар (разработчик) тратит 80% времени на поиск нужного, а не на готовку.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">📐</span> Архитектурный шаблон MVC (Model-View-Controller)</h3>
<p>MVC — это способ организации кода, который разделяет приложение на три основных компонента, каждый со своей ответственностью.</p>

<div class="comparison-table table--hover">
<table>
<caption>Компоненты MVC и их ответственность</caption>
<thead>
<tr>
<th>Компонент</th>
<th>Ответственность</th>
<th>Аналогия в ресторане</th>
<th>Что содержит</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Model (Модель)</strong></td>
<td>Работа с данными, бизнес-логика</td>
<td>Кухня и склад</td>
<td>Классы для работы с БД, расчеты, валидация</td>
</tr>
<tr>
<td><strong>View (Вид/Представление)</strong></td>
<td>Отображение данных пользователю</td>
<td>Зал и официант</td>
<td>HTML-шаблоны, CSS, JavaScript для интерфейса</td>
</tr>
<tr>
<td><strong>Controller (Контроллер)</strong></td>
<td>Прием запроса и координация Модели и Вида</td>
<td>Администратор ресторана</td>
<td>Логика обработки запросов, выбор шаблона</td>
</tr>
</tbody>
</table>
</div>

<div class="key-points">
<h4>✨ Как работает поток данных в MVC:</h4>
<ol>
<li><strong>Пользователь</strong> совершает действие (переходит по URL, отправляет форму)</li>
<li><strong>Роутер</strong> определяет, какой контроллер и метод вызвать</li>
<li><strong>Контроллер</strong> принимает запрос, запрашивает данные у Модели</li>
<li><strong>Модель</strong> работает с базой данных, выполняет бизнес-логику</li>
<li><strong>Контроллер</strong> получает данные от Модели и передает их во Вид</li>
<li><strong>Вид</strong> отрисовывает HTML-страницу с полученными данными</li>
<li><strong>Пользователь</strong> видит результат в браузере</li>
</ol>
</div>

<div class="note">
<p><strong>📝 Важно:</strong> В классическом MVC компоненты общаются только в одном направлении: Контроллер → Модель → Контроллер → Вид. Вид никогда не обращается напрямую к Модели.</p>
</div>
</div>

<div class="card">
<h3><span class="icon">🛣️</span> Что такое роутинг (маршрутизация)?</h3>
<p>Роутинг — это процесс определения, какой код выполнить для конкретного URL-адреса.</p>

<div class="key-points">
<h4>Примеры URL и их обработка:</h4>
<ul>
<li><code>https://site.ru/</code> → Главная страница</li>
<li><code>https://site.ru/about</code> → Страница "О нас"</li>
<li><code>https://site.ru/posts/5</code> → Статья с ID 5</li>
<li><code>https://site.ru/contact</code> → Страница контактов</li>
</ul>
</div>

<div class="key-points">
<h4>Типы роутинга:</h4>
<ul>
<li><strong>"Наивный" (простой) роутинг</strong> — через параметры в URL (<code>?page=about</code>)</li>
<li><strong>ЧПУ (Человеко-Понятные Урлы)</strong> — красивые пути (<code>/about</code>, <code>/posts/5</code>)</li>
<li><strong>Роутинг в фреймворках</strong> — сложные системы с регулярными выражениями</li>
</ul>
</div>

<div class="note">
<p><strong>💡 Простая аналогия:</strong> Роутинг — это как секретарь в приемной. Клиент (браузер) говорит "Мне нужно к менеджеру по продажам" (URL /sales), а секретарь (роутер) направляет его в нужный кабинет (контроллер).</p>
</div>
</div>

<div class="card">
<h3><span class="icon">⚙️</span> Подготовка проекта: новая структура папок</h3>
<p>Для работы с MVC нужно правильно организовать файлы проекта.</p>

<div class="key-points">
<h4>📁 Новая структура папок для блога:</h4>
<pre><code>myblog/                      # Корневая папка проекта
├── app/                     # Ядро приложения
│   ├── controllers/         # Контроллеры
│   │   └── HomeController.php
│   ├── models/              # Модели
│   │   └── Post.php
│   └── views/               # Представления (пока обычные PHP-файлы)
│       ├── home.php
│       └── layout.php
├── public/                  # Публичная папка (точка входа)
│   └── index.php           # Единая точка входа
├── config/                  # Конфигурационные файлы
└── vendor/                  # Зависимости (позже добавим через Composer)</code></pre>
</div>

<div class="key-points">
<h4>🔒 Почему public/index.php — точка входа?</h4>
<ul>
<li>Все запросы идут через один файл</li>
<li>Повышается безопасность — основной код находится вне public</li>
<li>Упрощается конфигурация сервера</li>
<li>Легче реализовать роутинг</li>
</ul>
</div>
</div>
</section>

<section class="section practice">
<h2 class="section-title">💻 Практическая часть (2 часа)</h2>

<div class="task">
<h3><span class="icon">✅</span> Шаг 1: Создание структуры проекта</h3>

<ol>
<li>Создайте новую папку <code>mvc_blog</code> в папке вашего локального сервера:
<pre><code>Для OpenServer: C:\OpenServer\domains\mvc_blog\
Для XAMPP: C:\xampp\htdocs\mvc_blog\</code></pre>
</li>
<li>Внутри создайте структуру папок как показано выше</li>
<li>Откройте проект в VS Code</li>
</ol>

<div class="note">
<p><strong>📁 Важно:</strong> Папка <code>public</code> будет доступна из браузера, а папка <code>app</code> — нет. Это повышает безопасность.</p>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 2: Создание единой точки входа</h3>

<p>В файле <code>public/index.php</code> напишите:</p>

<pre><code>&lt;?php
// public/index.php - Единая точка входа

// Включение отображения ошибок (только для разработки!)
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Базовая конфигурация
define('ROOT_PATH', dirname(__DIR__));
define('APP_PATH', ROOT_PATH . '/app');
define('VIEW_PATH', APP_PATH . '/views');

// Простейший "наивный" роутинг через GET-параметр
$page = $_GET['page'] ?? 'home';

// Обработка роутов
switch ($page) {
    case 'home':
        $controller = 'HomeController';
        $action = 'index';
        break;
    case 'about':
        $controller = 'HomeController';
        $action = 'about';
        break;
    default:
        // Если страница не найдена
        $controller = 'HomeController';
        $action = 'notFound';
        break;
}

// Подключаем контроллер
$controllerFile = APP_PATH . "/controllers/{$controller}.php";
if (file_exists($controllerFile)) {
    require_once $controllerFile;
    
    // Создаем объект контроллера и вызываем метод
    $controllerInstance = new $controller();
    if (method_exists($controllerInstance, $action)) {
        $controllerInstance->$action();
    } else {
        die("Метод {$action} не найден в контроллере {$controller}");
    }
} else {
    die("Контроллер {$controller} не найден");
}
?&gt;</code></pre>

<div class="key-points">
<h4>📖 Разбор кода роутинга:</h4>
<ul>
<li><code>$_GET['page'] ?? 'home'</code> — получаем параметр page или используем 'home' по умолчанию</li>
<li><code>switch</code> — определяем, какой контроллер и метод вызвать</li>
<li><code>define()</code> — создаем константы для путей к папкам</li>
<li><code>file_exists()</code> — проверяем, существует ли файл контроллера</li>
<li><code>require_once</code> — подключаем файл контроллера</li>
<li><code>new $controller()</code> — создаем объект контроллера (динамически по имени)</li>
<li><code>method_exists()</code> — проверяем, существует ли метод в контроллере</li>
</ul>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 3: Создание первого контроллера</h3>

<p>В файле <code>app/controllers/HomeController.php</code> напишите:</p>

<pre><code>&lt;?php
// app/controllers/HomeController.php

class HomeController
{
    public function index()
    {
        // Данные для главной страницы
        $data = [
            'title' => 'Добро пожаловать в MVC блог!',
            'posts' => [
                ['id' => 1, 'title' => 'Первая статья', 'content' => 'Содержание первой статьи...'],
                ['id' => 2, 'title' => 'Вторая статья', 'content' => 'Содержание второй статьи...'],
            ],
            'current_date' => date('d.m.Y'),
        ];
        
        // Подключаем вид (представление)
        $this->render('home', $data);
    }
    
    public function about()
    {
        $data = [
            'title' => 'О нашем блоге',
            'description' => 'Этот блог создан для изучения MVC архитектуры.',
            'author' => 'Команда разработчиков',
        ];
        
        $this->render('about', $data);
    }
    
    public function notFound()
    {
        $data = [
            'title' => 'Страница не найдена',
            'message' => 'Запрошенная страница не существует.',
        ];
        
        $this->render('404', $data);
    }
    
    /**
     * Метод для отображения вида
     */
    private function render($viewName, $data = [])
    {
        // Извлекаем переменные из массива данных
        // ['title' => '...'] превратится в $title = '...';
        extract($data);
        
        // Подключаем основной шаблон (layout)
        require_once VIEW_PATH . '/layout.php';
    }
}
?&gt;</code></pre>

<div class="key-points">
<h4>📖 Разбор кода контроллера:</h4>
<ul>
<li><code>class HomeController</code> — объявляем класс контроллера</li>
<li><code>public function index()</code> — метод для главной страницы</li>
<li><code>$data</code> — массив данных, которые передаются в вид</li>
<li><code>$this->render()</code> — вызов метода для отображения вида</li>
<li><code>extract($data)</code> — преобразует массив в переменные (ключи → имена переменных)</li>
<li><code>require_once</code> — подключаем файл шаблона</li>
</ul>
</div>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 4: Создание базового шаблона (layout)</h3>

<p>В файле <code>app/views/layout.php</code> напишите:</p>

<pre><code>&lt;!DOCTYPE html&gt;
&lt;html lang="ru"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;&lt;?php echo $title ?? 'MVC Блог'; ?&gt;&lt;/title&gt;
    &lt;style&gt;
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        header { background: #2c3e50; color: white; padding: 1rem 0; }
        nav ul { display: flex; list-style: none; gap: 20px; }
        nav a { color: white; text-decoration: none; }
        nav a:hover { text-decoration: underline; }
        main { padding: 2rem 0; }
        .post { background: #f9f9f9; padding: 1rem; margin-bottom: 1rem; border-left: 4px solid #3498db; }
        footer { background: #34495e; color: white; padding: 1rem 0; margin-top: 2rem; }
        .error { color: #e74c3c; padding: 2rem; text-align: center; }
    &lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;header&gt;
        &lt;div class="container"&gt;
            &lt;h1&gt;MVC Блог&lt;/h1&gt;
            &lt;nav&gt;
                &lt;ul&gt;
                    &lt;li&gt;&lt;a href="/mvc_blog/public/?page=home"&gt;Главная&lt;/a&gt;&lt;/li&gt;
                    &lt;li&gt;&lt;a href="/mvc_blog/public/?page=about"&gt;О блоге&lt;/a&gt;&lt;/li&gt;
                &lt;/ul&gt;
            &lt;/nav&gt;
        &lt;/div&gt;
    &lt;/header&gt;
    
    &lt;main class="container"&gt;
        &lt;!-- Здесь будет динамический контент из отдельных видов --&gt;
        &lt;?php
        // Определяем, какой конкретный вид загрузить
        $viewFile = VIEW_PATH . '/' . ($viewName ?? 'home') . '.php';
        if (file_exists($viewFile)) {
            require_once $viewFile;
        } else {
            echo '&lt;div class="error"&gt;Шаблон не найден&lt;/div&gt;';
        }
        ?&gt;
    &lt;/main&gt;
    
    &lt;footer&gt;
        &lt;div class="container"&gt;
            &lt;p&gt;© &lt;?php echo date('Y'); ?&gt; MVC Блог. Все права защищены.&lt;/p&gt;
            &lt;p&gt;Сегодня: &lt;?php echo $current_date ?? date('d.m.Y'); ?&gt;&lt;/p&gt;
        &lt;/div&gt;
    &lt;/footer&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 5: Создание отдельных видов (views)</h3>

<p>1. Создайте <code>app/views/home.php</code>:</p>
<pre><code>&lt;h2&gt;&lt;?php echo $title; ?&gt;&lt;/h2&gt;
&lt;p&gt;Это главная страница нашего блога на MVC архитектуре.&lt;/p&gt;

&lt;h3&gt;Последние статьи:&lt;/h3&gt;
&lt;?php if (!empty($posts)): ?&gt;
    &lt;?php foreach ($posts as $post): ?&gt;
        &lt;div class="post"&gt;
            &lt;h4&gt;&lt;?php echo htmlspecialchars($post['title']); ?&gt;&lt;/h4&gt;
            &lt;p&gt;&lt;?php echo htmlspecialchars($post['content']); ?&gt;&lt;/p&gt;
            &lt;a href="#"&gt;Читать далее...&lt;/a&gt;
        &lt;/div&gt;
    &lt;?php endforeach; ?&gt;
&lt;?php else: ?&gt;
    &lt;p&gt;Статей пока нет.&lt;/p&gt;
&lt;?php endif; ?&gt;</code></pre>

<p>2. Создайте <code>app/views/about.php</code>:</p>
<pre><code>&lt;h2&gt;&lt;?php echo $title; ?&gt;&lt;/h2&gt;
&lt;p&gt;&lt;?php echo $description; ?&gt;&lt;/p&gt;
&lt;p&gt;&lt;strong&gt;Автор:&lt;/strong&gt; &lt;?php echo $author; ?&gt;&lt;/p&gt;
&lt;p&gt;Этот проект демонстрирует:&lt;/p&gt;
&lt;ul&gt;
    &lt;li&gt;Архитектуру MVC&lt;/li&gt;
    &lt;li&gt;Простую маршрутизацию&lt;/li&gt;
    &lt;li&gt;Разделение логики и представления&lt;/li&gt;
    &lt;li&gt;Использование базового шаблона (layout)&lt;/li&gt;
&lt;/ul&gt;</code></pre>

<p>3. Создайте <code>app/views/404.php</code>:</p>
<pre><code>&lt;div class="error"&gt;
    &lt;h2&gt;&lt;?php echo $title; ?&gt;&lt;/h2&gt;
    &lt;p&gt;&lt;?php echo $message; ?&gt;&lt;/p&gt;
    &lt;a href="/mvc_blog/public/?page=home"&gt;Вернуться на главную&lt;/a&gt;
&lt;/div&gt;</code></pre>
</div>

<div class="task">
<h3><span class="icon">✅</span> Шаг 6: Тестирование приложения</h3>

<ol>
<li>Откройте браузер и перейдите по адресу:
<pre><code>http://localhost/mvc_blog/public/?page=home</code></pre>
Должна открыться главная страница со списком статей.
</li>
<li>Проверьте другие страницы:
<pre><code>http://localhost/mvc_blog/public/?page=about
http://localhost/mvc_blog/public/?page=non_existent</code></pre>
</li>
<li>Нажмите Ctrl+U (просмотр исходного кода) - вы увидите чистый HTML без PHP!</li>
</ol>

<div class="key-points">
<h4>🔍 Что произошло:</h4>
<ol>
<li>Браузер запросил <code>?page=home</code></li>
<li><code>index.php</code> определил, что нужно вызвать <code>HomeController::index()</code></li>
<li>Контроллер подготовил данные (массив статей)</li>
<li>Контроллер вызвал <code>render('home', $data)</code></li>
<li>Был подключен <code>layout.php</code>, который в свою очередь подключил <code>home.php</code></li>
<li>В браузер отправился готовый HTML</li>
</ol>
</div>
</div>

<div class="task">
<h3><span class="icon">🧪</span> Эксперименты с кодом</h3>

<div class="key-points">
<h4>Эксперимент 1: Добавьте новую страницу "Контакты"</h4>
<ol>
<li>Добавьте новый case в switch в <code>index.php</code></li>
<li>Добавьте метод <code>contact()</code> в <code>HomeController</code></li>
<li>Создайте файл <code>app/views/contact.php</code></li>
<li>Проверьте: <code>?page=contact</code></li>
</ol>

<h4>Эксперимент 2: Измените роутинг</h4>
<p>Попробуйте изменить параметр по умолчанию с 'home' на 'about' и посмотрите, что изменится.</p>

<h4>Эксперимент 3: Создайте простую Модель</h4>
<p>Создайте файл <code>app/models/Post.php</code>:</p>
<pre><code>&lt;?php
class Post
{
    public static function getAll()
    {
        return [
            ['id' => 1, 'title' => 'Статья из модели', 'content' => '...'],
            ['id' => 2, 'title' => 'Еще статья', 'content' => '...'],
        ];
    }
}
?&gt;</code></pre>
<p>Измените в контроллере: <code>$posts = Post::getAll();</code></p>
</div>
</div>
</section>

<section class="section">
<h2 class="section-title">📋 Домашнее задание</h2>

<div class="homework">
<h3><span class="icon">✏️</span> Задание на день 1</h3>

<ol>
<li>Создайте структуру MVC-проекта как в уроке и убедитесь, что всё работает</li>
<li>Добавьте страницу "Контакты" с формой (пока без обработки):
<pre><code>&lt;form method="POST"&gt;
    &lt;input type="text" name="name" placeholder="Ваше имя"&gt;
    &lt;input type="email" name="email" placeholder="Email"&gt;
    &lt;textarea name="message" placeholder="Сообщение"&gt;&lt;/textarea&gt;
    &lt;button type="submit"&gt;Отправить&lt;/button&gt;
&lt;/form&gt;</code></pre>
</li>
<li>Создайте простую Модель Post как в эксперименте 3</li>
<li>Модифицируйте роутинг так, чтобы по умолчанию открывалась страница "about"</li>
<li><strong>Бонус:</strong> Создайте отдельный контроллер <code>PostController</code> с методом <code>show($id)</code> и страницей отдельной статьи. URL: <code>?page=post&id=1</code></li>
<li><strong>Бонус 2:</strong> Добавьте в навигационное меню автоматическое выделение активной страницы (например, через добавление класса "active")</li>
</ol>
</div>
</section>

<section class="section">
<h2 class="section-title">🧠 Проверка понимания</h2>

<div class="quiz">
<h3><span class="icon">❓</span> Вопросы для самопроверки</h3>

<ol>
<li>Какие три компонента MVC и что делает каждый из них?</li>
<li>Почему "наивный" роутинг через GET-параметры не идеален для реальных проектов?</li>
<li>Что делает функция <code>extract()</code> и почему мы её используем?</li>
<li>Зачем нужна единая точка входа (public/index.php)?</li>
<li>Почему мы разделили layout и отдельные views?</li>
<li>Какой путь проходит запрос от браузера до отображения страницы в MVC?</li>
<li>Что произойдет, если пользователь запросит несуществующую страницу?</li>
<li>Почему в папке public только index.php, а остальной код в app/?</li>
</ol>

<button onclick="toggleAnswers()" class="button button--primary" style="margin-top: 20px;">Показать ответы</button>

<div id="answers" style="display: none; margin-top: 20px; padding: 20px; background: var(--light-color); border-radius: var(--border-radius); border-left: 4px solid var(--primary-color);">
<h4>Ответы:</h4>
<ol>
<li>Model (данные и логика), View (отображение), Controller (координация).</li>
<li>Не SEO-дружественный, некрасивый, ограниченные возможности.</li>
<li>Преобразует ассоциативный массив в переменные. Упрощает передачу данных в вид.</li>
<li>Для централизованной обработки всех запросов, безопасности, единой конфигурации.</li>
<li>Чтобы повторно использовать общую разметку (header, footer, меню) на всех страницах.</li>
<li>Браузер → index.php → роутинг → контроллер → модель → контроллер → вид → HTML → браузер.</li>
<li>Сработает default case в switch, вызовется метод notFound, покажется страница 404.</li>
<li>Для безопасности — только публичные файлы доступны извне, основной код защищен.</li>
</ol>
</div>
</div>
</section>

<section class="section tips">
<h2 class="section-title">💡 Полезные советы по MVC</h2>

<div class="tips-grid">
<div class="tip-card">
<div class="tip-icon">🚀</div>
<h3>Начинайте с простого</h3>
<p>Не пытайтесь сразу реализовать идеальный MVC. Ваш "наивный" роутинг — отличный первый шаг. Позже вы замените его на более продвинутый.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🔧</div>
<h3>Используйте автозагрузку классов</h3>
<p>Вместо множества require_once используйте автозагрузчик. Добавьте в index.php: <code>spl_autoload_register(function($class) { require_once APP_PATH . '/' . str_replace('\\', '/', $class) . '.php'; });</code></p>
</div>

<div class="tip-card">
<div class="tip-icon">📁</div>
<h3>Создайте конфигурационный файл</h3>
<p>Вынесите настройки базы данных, пути и константы в отдельный файл <code>config.php</code>. Это упростит развертывание на разных серверах.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🛡️</div>
<h3>Безопасность входа в приложение</h3>
<p>Всегда проверяйте входные данные в контроллерах. Используйте <code>htmlspecialchars()</code> для вывода пользовательского контента в шаблонах.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🧩</div>
<h3>Создайте базовый контроллер</h3>
<p>Вынесите общие методы (render, redirect, проверка авторизации) в <code>BaseController</code>. Все остальные контроллеры будут наследовать от него.</p>
</div>

<div class="tip-card">
<div class="tip-icon">🎯</div>
<h3>Тестируйте компоненты отдельно</h3>
<p>Модели можно тестировать без контроллеров, контроллеры — без видов. Это главное преимущество MVC для разработки и отладки.</p>
</div>
</div>
</section>

<!-- JavaScript для оглавления будет добавлен в общий скрипт -->

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