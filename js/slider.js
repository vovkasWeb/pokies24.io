const slider = document.querySelector('.slider-track');
const btnLeft = document.querySelector('.slider-btn-left');
const btnRight = document.querySelector('.slider-btn-right');

const slideWidth = slider.querySelector('.slide').offsetWidth + 10; // gap

function updateButtons() {
  // Слайдер в начале
  if (slider.scrollLeft <= 0) {
    btnLeft.classList.add('disabled');
  } else {
    btnLeft.classList.remove('disabled');
  }

  // Слайдер в конце
  if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
    btnRight.classList.add('disabled');
  } else {
    btnRight.classList.remove('disabled');
  }
}

// Прокрутка кнопками
btnRight.addEventListener('click', () => {
  slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
});

btnLeft.addEventListener('click', () => {
  slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
});

// Обновление кнопок при скролле мышью или тачем
slider.addEventListener('scroll', updateButtons);

// Инициализация состояния
updateButtons();