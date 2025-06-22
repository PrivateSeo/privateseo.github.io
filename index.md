---
layout: default
title: "Частный SEO специалист и Web-разработчик"
description: "Создание, поддержка и продвижение сайтов"
---

<!-- Первый экран (Hero section) -->
<section class="hero" id="hero" itemscope itemtype="http://schema.org/WPAdBlock">
  <div class="container hero__container">
    <div class="hero__content">
      <h1 class="hero__title" itemprop="headline">Частный разработчик и SEO специалист </br><span>создание и продвижение сайтов</span></h1>
      <p class="hero__subtitle" itemprop="description">Надежный частный SEO оптимизатор и web разработчик с опытом более 15 лет — индивидуальный подход и максимальная эффективность для вашего проекта</p>
      
      <div class="hero__actions">
        <button class="button button--primary hero__button" data-modal="consultation" itemprop="potentialAction" itemscope itemtype="http://schema.org/CommunicateAction">
          <span itemprop="name">Получить консультацию</span>
        </button>
        
        <a href="tel:{{ site.phone }}" class="hero__phone-link" aria-label="Позвонить" itemprop="telephone">
          <svg class="hero__phone-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 4H9L11 9L8 10C9.5 12.5 12 15 14.5 16.5L15.5 13.5L20.5 15.5V19.5C20.5 20.5 19.5 21.5 18.5 21.5C10 21.5 3 14.5 3 6C3 5 4 4 5 4Z" fill="currentColor"/>
          </svg>
        </a>
      </div>
      
      <div class="hero__social" itemscope itemtype="http://schema.org/ContactPoint">
        <div class="hero__social-links">
          {% for social in site.socials %}
            <a href="{{ social.url }}" class="hero__social-link" target="_blank" rel="noopener noreferrer" aria-label="{{ social.name }}" itemprop="url">
              <img src="{{ '/assets/images/' | append: social.icon | relative_url }}" alt="{{ social.name | downcase }}">
            </a>
          {% endfor %}
        </div>
      </div>
    </div>
    <div class="hero__image">
      <img src="{{ '/assets/images/hero-image.webp' | relative_url }}" alt="Веб-разработчик за работой" class="hero__img" itemprop="image">
    </div>
  </div>
</section>

<!-- Остальные секции (About, Services и т.д.) -->
{% include about-section.html %}
{% include services-section.html %}
{% include portfolio-section.html %}
{% include reviews-section.html %}
{% include advantages-section.html %}
{% include contact-section.html %}