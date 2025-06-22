// Конфигурация (ЗАМЕНИТЕ значения!)
const BOT_TOKEN = '7763273598:AAFpDkG7beD4ow6nPD6o6-VLncJfbaV0wF0';
const CHAT_ID = '660109551'; // Получите через @userinfobot

// Функция отправки в Telegram (без изменений)
async function sendToTelegram(formData) {
  let message = `📌 Новая заявка\nТип: ${formData.form_type || 'Не указан'}\nИмя: ${formData.name}`;
  
  // Добавляем поля, если они есть в форме
  if (formData.phone) message += `\nТелефон: ${formData.phone}`;
  if (formData.email) message += `\nEmail: ${formData.email}`;
  if (formData.message) message += `\nСообщение: ${formData.message}`;
  
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = new URLSearchParams();
  body.append('chat_id', CHAT_ID);
  body.append('text', message);
  
  try {
    const img = new Image();
    img.src = `${url}?${body.toString()}`;
    return true;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
}

// Обработчик для всех форм
function setupForm(formId, modalId = null) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Отправка...';

    // Собираем данные формы
    const formData = {
      form_type: form.querySelector('[name="form_type"]')?.value || formId,
      name: form.querySelector('[name="name"]')?.value,
      phone: form.querySelector('[name="phone"]')?.value,
      email: form.querySelector('[name="email"]')?.value,
      message: form.querySelector('[name="message"]')?.value
    };

    try {
      const success = await sendToTelegram(formData);
      if (success) {
        alert('✅ Спасибо! Мы скоро свяжемся с вами.');
        form.reset();
        if (modalId) {
          document.getElementById(modalId)?.classList.remove('active');
        }
      } else {
        throw new Error('Не удалось отправить заявку');
      }
    } catch (error) {
      console.error('Form Error:', error);
      alert('⚠️ Ошибка отправки. Позвоните нам напрямую!');
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });
}

// Инициализация всех форм при загрузке
document.addEventListener('DOMContentLoaded', () => {
  setupForm('consultation-form', 'consultation-modal');
  setupForm('callback-form', 'callback-modal');
  setupForm('contact-form'); // Для формы без модального окна
});