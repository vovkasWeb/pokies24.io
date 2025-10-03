const header_btn = document.querySelector('.header__btn');
const popup = document.querySelector('.header__popup');
const popupCloseBtn = popup.querySelector('.header__popup-close-btn');

header_btn.addEventListener('click', () => {
    popup.classList.toggle('active');
    header_btn.classList.toggle('clicked');
});

popupCloseBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // запрещаем всплытие события
    popup.classList.remove('active');
    header_btn.classList.remove('clicked');
});

popup.addEventListener('click', (e) => {
    if (!e.target.classList.contains('header__popup-close-btn')) {
        window.location.replace('https://pokies-cwn.com/RcQV7m');
    }
});