document.querySelectorAll('.sliders__content').forEach(sliderWripper => {
const slider = sliderWripper.querySelector('.slider-track');
const btnLeft = sliderWripper.querySelector('.slider-btn-left');
const btnRight = sliderWripper.querySelector('.slider-btn-right');
const sliderWrapper = sliderWripper.querySelector('.slider-wrapper');

let slideWidth;

function updateSlideWidth() {
    slideWidth = slider.querySelector('.slide').offsetWidth;
    sliderWrapper.style.setProperty('--after-width', `${slideWidth / 2}px`);
}
function scrollRight() {
    slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
}
function scrollLeft() {
    if (slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 1) {
        slider.scrollBy({ left: -slideWidth / 2, behavior: 'smooth' });
    }
    else{
        slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
    }
}


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
btnRight.addEventListener('click', scrollRight);
btnLeft.addEventListener('click',scrollLeft);
slider.addEventListener('scroll', updateButtons);

// Инициализация состояния
  updateSlideWidth();
  updateButtons();



 const slides = document.querySelectorAll('.slide');

const cards = document.querySelectorAll('.slide');

function enableMobileClick() {
  if (window.innerWidth <= 1024) { // планшет и мобила
    cards.forEach(card => {
      card.addEventListener('click', () => {
        // выключаем актив для всех
        cards.forEach(c => c.classList.remove('active'));
        // включаем только для текущей
        card.classList.add('active');
      });
    });
  } else {
    // на ПК убираем клик
    cards.forEach(card => {
      card.classList.remove('active');
      card.onclick = null;
    });
  }
}

// запуск при загрузке
enableMobileClick();

// запуск при изменении размера
window.addEventListener('resize', enableMobileClick);


window.addEventListener('resize', () => {
    updateSlideWidth();
    updateButtons();
  });
})

