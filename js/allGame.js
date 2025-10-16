const btn = document.querySelector('.game-all__open-provider');
const block = document.querySelector('.game-all__provider-list');



btn.addEventListener('click', () => {
    block.classList.toggle('open');
    btn.classList.toggle('open');
});

const wrapper = document.querySelector('.game-all__slider-wrapper');
const items = document.querySelectorAll('.game-all__slider-item');
const leftBtn = document.querySelector('.game-all-left-btn');
const rightBtn = document.querySelector('.game-all-right-btn');
const gap = 10;
const step = items[0].offsetWidth + gap;

function updateButtons() {
    // Если прокрутка влево возможна
    if (wrapper.scrollLeft > 0) {
        leftBtn.classList.add('active');
    } else {
        leftBtn.classList.remove('active');
    }

    // Если прокрутка вправо возможна
    if (wrapper.scrollLeft + wrapper.clientWidth < wrapper.scrollWidth) {
        rightBtn.classList.add('active');
    } else {
        rightBtn.classList.remove('active');
    }
}

// Инициализация
updateButtons();

leftBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: -step, behavior: 'smooth' });
    setTimeout(updateButtons, 300); // обновляем после анимации
});

rightBtn.addEventListener('click', () => {
    wrapper.scrollBy({ left: step, behavior: 'smooth' });
    setTimeout(updateButtons, 300); // обновляем после анимации
});

// Если пользователь может скроллить мышкой или тачем
wrapper.addEventListener('scroll', updateButtons);
