document.querySelectorAll('.sliders__content').forEach(sliderWrapper => {
  const slider = sliderWrapper.querySelector('.slider-track');
  const btnLeft = sliderWrapper.querySelector('.slider-btn-left');
  const btnRight = sliderWrapper.querySelector('.slider-btn-right');

  let slides = Array.from(slider.children);
  let slideWidth = slides[0].offsetWidth;

  // клонируем слайды для бесконечности
  slides.forEach(slide => slider.appendChild(slide.cloneNode(true)));

  let position = 0;
  const totalSlides = slider.children.length;
  const halfSlides = totalSlides / 2;
  let isAnimating = false;

  function scrollRight() {
    if (isAnimating) return;
    isAnimating = true;

    position++;
    slider.style.transition = 'transform 0.4s ease';
    slider.style.transform = `translateX(${-slideWidth * position}px)`;

    slider.addEventListener('transitionend', () => {
      if (position >= halfSlides) {
        slider.style.transition = 'none';
        position = 0;
        slider.style.transform = `translateX(0px)`;
      }
      isAnimating = false;
    }, { once: true });
  }

  function scrollLeft() {
    if (isAnimating) return;
    isAnimating = true;

    if (position === 0) {
      slider.style.transition = 'none';
      position = halfSlides;
      slider.style.transform = `translateX(${-slideWidth * position}px)`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          position--;
          slider.style.transition = 'transform 0.4s ease';
          slider.style.transform = `translateX(${-slideWidth * position}px)`;
        });
      });
    } else {
      position--;
      slider.style.transition = 'transform 0.4s ease';
      slider.style.transform = `translateX(${-slideWidth * position}px)`;
    }

    slider.addEventListener('transitionend', () => {
      isAnimating = false;
    }, { once: true });
  }

  btnRight.addEventListener('click', scrollRight);
  btnLeft.addEventListener('click', scrollLeft);

  // === Свайп для мобильных ===
  let startX = 0;
  let endX = 0;

  sliderWrapper.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  sliderWrapper.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    let diff = endX - startX;

    if (Math.abs(diff) > 50) { // порог свайпа
      if (diff < 0) {
        scrollRight(); // свайп влево → следующий слайд
      } else {
        scrollLeft(); // свайп вправо → предыдущий слайд
      }
    }
  });

  window.addEventListener('resize', () => {
    slideWidth = slides[0].offsetWidth;
    slider.style.transition = 'none';
    slider.style.transform = `translateX(${-slideWidth * position}px)`;
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