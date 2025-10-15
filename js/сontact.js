const textarea = document.querySelector('textarea');

textarea.addEventListener('input', () => {
  textarea.style.height = 'auto'; // сбрасываем, чтобы корректно пересчитать
  textarea.style.height = textarea.scrollHeight + 'px'; // подгоняем под контент
});

const checkbox = document.querySelector('.switch input');

// Добавляем обработчик изменения состояния
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    console.log('Переключатель активирован ✅');
    // здесь можно включить кнопку, изменить стиль и т.д.
  } else {
    console.log('Переключатель неактивен ❌');
    // здесь можно выключить кнопку, изменить стиль и т.д.
  }
});

const form = document.getElementById('form-contact');
const formComfirm = document.querySelector('.contact-form__confirmed');

 form.addEventListener('submit', (event) => {
    event.preventDefault();
    formComfirm.classList.add('active');
    // if (checkbox.checked) {
    //   console.log('Форма отправлена ✅');
    // } else {
    //   console.log('Сначала примите условия ❌');
    // }
  });