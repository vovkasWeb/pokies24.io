document.querySelectorAll('.sliders__content').forEach(sliderWrapper => {
  const slider = sliderWrapper.querySelector('.slider-track');
  const btnLeft = sliderWrapper.querySelector('.slider-btn-left');
  const btnRight = sliderWrapper.querySelector('.slider-btn-right');

  let slides = Array.from(slider.children);
  let slideWidth = slides[0].offsetWidth;
  slides.forEach(slide => slider.appendChild(slide.cloneNode(true)));

  let position = 0;
  const totalSlides = slider.children.length;
  const halfSlides = totalSlides / 2;
  let isAnimating = false;

  function goToPosition(pos, instant = false) {
    slider.style.transition = instant ? 'none' : 'transform 0.3s ease';
    slider.style.transform = `translateX(${-slideWidth * pos}px)`;
  }

  function scrollRight() {
    if (isAnimating) return;
    isAnimating = true;

    position++;
    goToPosition(position);

    slider.addEventListener('transitionend', () => {
      if (position >= halfSlides) {
        position = 0;
        goToPosition(position, true);
      }
      isAnimating = false;
    }, { once: true });
  }

  function scrollLeft() {
    if (isAnimating) return;
    isAnimating = true;

    if (position === 0) {
      position = halfSlides;
      goToPosition(position, true);
    }

    position--;
    goToPosition(position);

    slider.addEventListener('transitionend', () => {
      isAnimating = false;
    }, { once: true });
  }

  btnRight.addEventListener('click', scrollRight);
  btnLeft.addEventListener('click', scrollLeft);

  // === Плавный свайп пальцем ===
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;
  let isDragging = false;

  sliderWrapper.addEventListener('touchstart', e => {
    if (isAnimating) return;
    startX = e.touches[0].clientX;
    isDragging = true;
    slider.style.transition = 'none';
  });

  sliderWrapper.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - startX;
    // двигаем слайдер за пальцем
    slider.style.transform = `translateX(${ -position * slideWidth + diff }px)`;
  });

  sliderWrapper.addEventListener('touchend', e => {
    if (!isDragging) return;
    isDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > slideWidth / 3) {
      if (diff < 0) scrollRight();
      else scrollLeft();
    } else {
      goToPosition(position); // "прилипание" к текущему слайду
    }
  });

  window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    goToPosition(position, true);
  });
});

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