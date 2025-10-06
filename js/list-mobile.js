import { pagas } from './obj.js';

const popup = document.querySelector('.header__menu-mobile');
const openPopupBtn = document.querySelector('.header__burger-btn');
const closePopupBtn = document.querySelector('.header__close-menu-mobile');
const listPage = document.querySelector('.header__list-mobile-content');
const nameCategory = document.querySelector('.header__title-menu-mobile');
const backMenu = document.querySelector('.header__back-menu-mobile');

let menuStack = [];

// рендер меню
function renderMenu(menuObj, title = '') {
  listPage.innerHTML = '';

  nameCategory.textContent = title;
  nameCategory.classList.toggle('noneVisible', !title);
  backMenu.classList.toggle('noneVisible', !title);

  const html = Object.keys(menuObj).map(key => {
    const item = menuObj[key];
    if (item.pages && Object.keys(item.pages).length) {
      return `
        <li>
          <button class="header__menu-button header__menu-link" data-key="${key}">
            <span style="padding-right:5px">${item.name}</span>
            <svg width="7" height="12" viewBox="0 0 7 12">
              <path d="M1 1 L6 6 L1 11" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </li>
      `;
    }
    return `
      <li>
        <a class="header__menu-href header__menu-link" href="${item.url}">
          <span>${item.name}</span>
        </a>
      </li>
    `;
  }).join('');

  listPage.innerHTML = html;

  // обработка вложенных меню
  listPage.querySelectorAll('.header__menu-button').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.key;
      menuStack.push({ obj: menuObj, title }); // сохраняем текущий уровень
      renderMenu(menuObj[key].pages, menuObj[key].name);
    });
  });
}

// кнопка назад
backMenu.addEventListener('click', () => {
  const prev = menuStack.pop();
  if (prev) {
    renderMenu(prev.obj, prev.title);
  }
});

// открыть меню
openPopupBtn.addEventListener('click', () => {
  menuStack = [];
  renderMenu(pagas);
  openPopup();
});

// закрыть меню
closePopupBtn.addEventListener('click', () => {
  closePopup();
});

// функции открытия/закрытия
function openPopup() {
  popup.classList.add('active');
  document.body.classList.add('lock');  // блокируем прокрутку
  openPopupBtn.style.display = 'none';
}

function closePopup() {
  popup.classList.remove('active');
  document.body.classList.remove('lock');
  openPopupBtn.style.display = 'flex';
}
