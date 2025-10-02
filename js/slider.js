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

// Отдельные обработчики
function mouseEnterHandler() {
  this.classList.add('active');
}

function mouseLeaveHandler() {
  this.classList.remove('active');
}

function clickHandler() {
  slides.forEach(slide => slide.classList.remove('active'));
  this.classList.add('active');
}

function enableSlideClick() {
  slides.forEach(slide => {
    // Сначала снимаем старые обработчики, чтобы не дублировались
    slide.removeEventListener('mouseenter', mouseEnterHandler);
    slide.removeEventListener('mouseleave', mouseLeaveHandler);
    slide.removeEventListener('click', clickHandler);

    // Навешиваем обработчики
    slide.addEventListener('mouseenter', mouseEnterHandler);
    slide.addEventListener('mouseleave', mouseLeaveHandler);
    slide.addEventListener('click', clickHandler);
  });
}

// Инициализация
enableSlideClick();


window.addEventListener('resize', () => {
    updateSlideWidth();
    updateButtons();
  });
})

