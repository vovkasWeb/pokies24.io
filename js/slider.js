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

  let startX = 0;
  let startY = 0;
  let isTouching = false;

  sliderWrapper.addEventListener('touchstart', (e) => {
    if (isAnimating) return;
    isTouching = true;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });

  sliderWrapper.addEventListener('touchmove', (e) => {
    if (!isTouching) return;

    const diffX = e.touches[0].clientX - startX;
    const diffY = e.touches[0].clientY - startY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      e.preventDefault(); 
    } else {
      isTouching = false; 
    }
  }, { passive: false });

  sliderWrapper.addEventListener('touchend', (e) => {
    if (!isTouching) return;
    isTouching = false;

    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
      if (diff < 0) scrollRight();
      else scrollLeft();
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
  if(window.innerWidth <= 550){
    const root = document.documentElement;
    console.log(cards[0].offsetWidth);
    root.style.setProperty('--after-width', `${cards[0].offsetWidth}px`);
   
  }
  if (window.innerWidth <= 1024) { 
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  } else {
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