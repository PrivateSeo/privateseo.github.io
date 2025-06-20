// Конфигурация (ЗАМЕНИТЕ значения!)
const BOT_TOKEN = '7763273598:AAFpDkG7beD4ow6nPD6o6-VLncJfbaV0wF0';
const CHAT_ID = '660109551'; // Получите через @userinfobot

async function sendToTelegram(formData) {
  const message = `📌 Новая заявка\nИмя: ${formData.name}\nТелефон: ${formData.phone}`;
  
  // Альтернативный endpoint (без CORS проблем)
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  
  const body = new URLSearchParams();
  body.append('chat_id', CHAT_ID);
  body.append('text', message);
  
  try {
    // Используем метод, который обходит CORS
    const img = new Image();
    img.src = `${url}?${body.toString()}`;
    
    return true;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
}

// Инициализация формы
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultation-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Отправка...';
    
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      form_type: form.form_type.value
    };
    
    try {
      const success = await sendToTelegram(formData);
      
      if (success) {
        alert('✅ Спасибо! Мы скоро свяжемся с вами.');
        form.reset();
        document.getElementById('consultation-modal').classList.remove('active');
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
});


document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('callback-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Отправка...';
    
    const formData = {
      name: form.name.value,
      phone: form.phone.value,
      form_type: form.form_type.value
    };
    
    try {
      const success = await sendToTelegram(formData);
      
      if (success) {
        alert('✅ Спасибо! Мы скоро свяжемся с вами.');
        form.reset();
        document.getElementById('consultation-modal').classList.remove('active');
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
});