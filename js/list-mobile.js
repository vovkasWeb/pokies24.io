import { pagas } from './obj.js';

const popup = document.querySelector('.header__menu-mobile');
const openPopupBtn = document.querySelector('.header__burger-btn');
const closePopupBtn = document.querySelector('.header__close-menu-mobile');
const listPage = document.querySelector('.header__list-mobile-content');
const nameCategory = document.querySelector('.header__title-menu-mobile');
const backMenu = document.querySelector('.header__back-menu-mobile');

let menuStack = [];

function renderMenu(menuObj, title = '') {
  listPage.innerHTML = '';

  if (title) {
    nameCategory.textContent = title;
    nameCategory.classList.remove('noneVisible');
    backMenu.classList.remove('noneVisible');
  } else {
    nameCategory.classList.add('noneVisible');
    backMenu.classList.add('noneVisible');
  }

  for (let key in menuObj) {
    if (menuObj[key].pages && Object.keys(menuObj[key].pages).length > 0) {
      listPage.innerHTML += `
        <li>
          <button class="header__menu-button header__menu-link" data-key="${key}">
            <span style="padding-right: 5px;">${menuObj[key].name}</span>
            <svg width="7" height="12" viewBox="0 0 7 12" xmlns="http://www.w3.org/2000/svg">
              <line x1="1" y1="10.5858" x2="5.58579" y2="6" stroke-width="2" stroke-linecap="round"/>
              <line x1="1" y1="-1" x2="7.48528" y2="-1" transform="matrix(0.707107 0.707107 0.707107 -0.707107 1 0)" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </li>
      `;
    } else {
      listPage.innerHTML += `
        <li>
          <a class="header__menu-href header__menu-link" href="${menuObj[key].url}">
            <span>${menuObj[key].name}</span>
          </a>
        </li>
      `;
    }
  }

  // вешаем обработчики на кнопки с вложенными страницами
  listPage.querySelectorAll('.header__menu-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-key');
      menuStack.push({ obj: menuObj, title }); // сохраняем текущий уровень
      renderMenu(menuObj[key].pages, menuObj[key].name);
    });
  });
}

// обработчик кнопки назад
backMenu.addEventListener('click', () => {
  const prev = menuStack.pop();
  if (prev) {
    renderMenu(prev.obj, prev.title);
  }
});

openPopupBtn.addEventListener('click', () => {
  openPopup();
  menuStack = [];
  renderMenu(pagas); // стартовый рендер
});

closePopupBtn.addEventListener('click', () => {
  closePopup();
});

function openPopup() {
  popup.classList.add('active');
  document.body.classList.add('lock');
  openPopupBtn.style = 'display:none;';
}

function closePopup() {
  popup.classList.remove('active');
  document.body.classList.remove('lock');
  openPopupBtn.style = 'display:flex;';
}
