import { bestPartner, titles } from './obj.js';

let width = window.innerWidth;
let currentCategory = 'best-online-casinos-au'; // значение по умолчанию

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);

const btnsOpen = document.querySelector('.best-casinos__btn-content');
const containerPaumentBtns = document.querySelector('.best-casinos__btn-best');
const btnsBlock = document.querySelector('.best-casinos__links-payment');
const casinoList = document.querySelector('.best-casinos__list');
const title = document.querySelector('.best-casinos__title');

// Открытие/закрытие блока фильтров
btnsOpen.addEventListener('click', () => {
  btnsBlock.classList.toggle('open');
});

// Очистка активных кнопок
const clearActiveClass = () => {
  document.querySelectorAll('.best-casinos__btn.active, .best-casinos__link-payment.active')
    .forEach(btn => btn.classList.remove('active'));
};

// Назначение активного класса и фильтрация
const activeClass = (filterValue) => {
  url.searchParams.set('category', filterValue);
  window.history.replaceState(null, '', url.toString());
  currentCategory = filterValue;
  sort(filterValue);
};

// Назначение обработчиков на кнопки
const attachButtonHandlers = () => {
  const btnsFirst = document.querySelectorAll('.best-casinos__btn');
  const btnsSecond = document.querySelectorAll('.best-casinos__link-payment');

  btnsFirst.forEach(btn => {
    btn.onclick = (e) => {
      clearActiveClass();
      activeClass(e.currentTarget.dataset.filter);
    };
  });

  btnsSecond.forEach(btn => {
    btn.onclick = (e) => {
      clearActiveClass();
      activeClass(e.currentTarget.dataset.filter);
    };
  });
};

function findObject(obj, key) {
  for (const k in obj) {
    if (k === key) return obj[k];
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      const result = findObject(obj[k], key);
      if (result) return result;
    }
  }
  return null;
}

function addActiveClass(category) {
  const btnsFirst = document.querySelectorAll('.best-casinos__btn');
  const btnsSecond = document.querySelectorAll('.best-casinos__link-payment');

  btnsFirst.forEach(btn => {
    if (btn.dataset.filter === category) {
      containerPaumentBtns.classList.remove('active');
      btn.classList.add('active');
    }
  });

  btnsSecond.forEach(btn => {
    if (btn.dataset.filter === category) {
      containerPaumentBtns.classList.add('active');
      btnsBlock.classList.add('open');
      btn.classList.add('active');
    }
  });
}

const sort = (category = 'best-online-casinos-au') => {
  const foundObj = findObject(bestPartner, category);
  if (foundObj) {
    title.textContent = titles[category];
    casinoList.innerHTML = '';
    foundObj.forEach(casino => casinoList.appendChild(render(casino)));
    addActiveClass(category);
  } else {
    console.warn('Объект с таким ключом не найден:', category);
  }
  attachButtonHandlers(); // 👈 теперь обработчики добавляются только на свежие кнопки
};

// Рейтинг
const generateRating = (rating) => {
  let elements = '';
  for (let i = 0; i < 5; i++) {
    const id = Math.random().toString(36).substring(10, 100);
    const width = rating - i >= 1 ? 100 : (rating - i) * 100;
    elements += `
      <svg width="60" height="60" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="redPink${id}" x1="0" y1="0" x2="1" y2="0">
            <stop offset="50%" stop-color="#f64747"/>
            <stop offset="50%" stop-color="#ff6060"/>
          </linearGradient>
          <clipPath id="grayMask${id}">
            <rect x="${width}%" y="0" width="100%" height="100%"/>
          </clipPath>
        </defs>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
          C13.09 3.81 14.76 3 16.5 3
          19.58 3 22 5.42 22 8.5
          c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#redPink${id})"/>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
          2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
          C13.09 3.81 14.76 3 16.5 3
          19.58 3 22 5.42 22 8.5
          c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#10324C9E" clip-path="url(#grayMask${id})"/>
      </svg>`;
  }
  return elements;
};

const render = (casino) => {
  const rating = generateRating(casino.rating);
  const card = document.createElement('div');

  if (width < 500) {
    card.className = 'best-casinos__item-mob';
    card.innerHTML = `
      <img class="best-casinos__img-mob" src="${casino.img.url}" alt="${casino.img.alt}">
      <div class="best-casinos__info-mob">
        <div class="best-casinos__line-mob">
          <h3 class="best-casinos__title-mob">${casino.name}</h3>
          <div class="best-casinos__rating-mob">
            ${rating}
            <div class="best-casinos__reting-num">
              <span class="rating__current">${casino.rating}</span>
              <span class="rating__divider">/</span>
              <span class="rating__total">5</span>
            </div>
          </div>
        </div>
        <p class="best-casinos__text-num">
          ${casino.bonus.includes('+') ? casino.bonus.replace(/\+/g, '<br>+') : casino.bonus}
        </p>
        <div class="best-casinos__btns-mob">
          <a href="${casino.review}" class="best-casinos__btn-mob btn-blue">Review</a>
          <a href="${casino.play}" class="best-casinos__btn-mob btn-yello">Play</a>
        </div>
      </div>`;
  } else {
    card.className = 'best-casinos__item';
    card.innerHTML = `
      <div class="best-casinos__left">
        <img class="best-casinos__img" src="${casino.img.url}" alt="${casino.img.alt}" />
        <div class="best-casinos__main-info">
          <h3 class="best-casinos__title-item">${casino.name}</h3>
          <div class="best-casinos__rating-item">
            ${rating}
            <div class="best-casinos__reting-num">
              <span class="rating__current">${casino.rating}</span>
              <span class="rating__divider">/</span>
              <span class="rating__total">5</span>
            </div>
          </div>
        </div>
      </div>
      <div class="best-casinos__text-item">
        <p>Welcome bonus: ${casino.bonus.includes('+') ? casino.bonus.replace(/\+/g, '<br>+') : casino.bonus}</p>
      </div>
      <div class="best-casinos__links">
        <a class="best-casinos__link btn-blue" href="${casino.review}">Review</a>
        <a class="best-casinos__link btn-yello" href="${casino.play}">Play Now</a>
      </div>`;
  }

  return card;
};

function start() {
  width = window.innerWidth;
  const category = params.get('category') || currentCategory;
  sort(category);
}

start();

// ⚙️ оптимизированный resize — не ломает мобильный scroll
let resizeTimeout;
let prevWidth = window.innerWidth;

window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const newWidth = window.innerWidth;
    if ((prevWidth < 500 && newWidth >= 500) || (prevWidth >= 500 && newWidth < 500)) {
      start();
      prevWidth = newWidth;
    }
  }, 300);
});
