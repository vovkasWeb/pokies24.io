import { bestPartner,titles } from './obj.js';

let width = 0;
const url = new URL(window.location.href); // текущий URL
const params = new URLSearchParams(url.search);

const btnsFirst = document.querySelectorAll('.best-casinos__btn');
const btnsSecond= document.querySelectorAll('.best-casinos__link-payment');
const btnsOpen = document.querySelector('.best-casinos__btn-content');
const btnsBlock = document.querySelector('.best-casinos__links-payment');
const casinoList = document.querySelector('.best-casinos__list');
const title = document.querySelector('.best-casinos__title');

btnsOpen.addEventListener('click', () => {
    btnsBlock.classList.toggle('open');
})

const clierActiveClass = ()=>{
    btnsFirst.forEach(btn => {
        btn.classList.remove('active');
    });
    btnsSecond.forEach(btn => {
        btn.classList.remove('active');
    });
}

const activeClass=(target)=>{
    const filterValue = target.currentTarget.dataset.filter; 
    console.log('data-filter нажатой кнопки:', filterValue);
    url.searchParams.set('category', filterValue);
    window.history.replaceState(null, '', url.toString());
    sort(filterValue)
}
btnsFirst.forEach(btn => {
    btn.addEventListener('click', (e) => {
       clierActiveClass()
       activeClass(e)
    
    });
})
btnsSecond.forEach(btn => {
     btn.addEventListener('click', (e) => {
        clierActiveClass()
        activeClass(e)
     });
})



function findObject(obj, key) {
  for (const k in obj) {
    if (k === key) return obj[k]; // нашли объект с нужным ключом
    if (typeof obj[k] === 'object' && obj[k] !== null) {
      const result = findObject(obj[k], key); // рекурсивный поиск
      if (result) return result;
    }
  }
  return null; // если не найдено
}

function addActiveClass(category) {
  btnsFirst.forEach(btn => {
    if (btn.dataset.filter === category) {
      btn.classList.add('active');
      return true;
    }
  });
  btnsSecond.forEach(btn => {
    if (btn.dataset.filter === category) {
      btnsBlock.classList.add('open'); // открываем btnsBlock
      btn.classList.add('active');
      return true;
    }
  });
}

const sort=(category='best-online-casinos-au')=>{
console.log(category)
  const foundObj = findObject(bestPartner, category);
  if (foundObj) {
    title.textContent = titles[category];
    casinoList.innerHTML = '';
    foundObj.forEach(casino => {
        casinoList.appendChild(render(casino))
    })
    addActiveClass(category)

  } else {
    console.log('Объект с таким ключом не найден');
  }

}
const generateRating = (rating) => {
    let elements = '';
    for (let i = 0; i < 5; i++) {
        let id = Math.random().toString(36).substring(10, 100);
        let width =rating-i>=1 ? 100 : (rating-i)*100
        elements += `
            <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
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
}

const render=(casino)=>{
    let rating = (generateRating(casino.rating))
    let card ='';
    if(width < 500) {
        console.log(casino.bonus.includes('+')? casino.bonus.replace(/\+/g, '<br>+') : casino.bonus);
        card = document.createElement('div');
        card.className = 'best-casinos__item-mob';
        card.innerHTML =`
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
                        ${casino.bonus.includes('+')? casino.bonus.replace(/\+/g, '<br>+') : casino.bonus}
                    </p>
                    <div class="best-casinos__btns-mob">
                        <a href="${casino.review}" class="best-casinos__btn-mob best-casinos__review-mob">Review</a>
                        <a href="${casino.play}" class="best-casinos__btn-mob best-casinos__play-mob">Play</a>
                    </div>
                </div>
        `
    }else{

        card = document.createElement('div');
        card.className = 'best-casinos__item';
        card.innerHTML =`
            <div class="best-casinos__left">
                <img class="best-casinos__img" src="${casino.img.url}" alt="${casino.img.alt}" />
                <div class="best-casinos__main-info">
                    <h4 class="best-casinos__title-item">${casino.name}</h4>
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
                <p>Welcome bonus: ${casino.bonus.includes('+')? casino.bonus.replace(/\+/g, '<br>+') : casino.bonus}</p>
            </div>
            <div class="best-casinos__links">
                <a class="best-casinos__link best-casinos__link-review" href="${casino.review}">
                    Review
                </a>
                <a class="best-casinos__link best-casinos__link-now" href="${casino.play}">
                    Play Now
                </a>
            </div>
`
    }
return card
}

function start(){
    width = window.innerWidth;
if (params.get('category')) {
    sort(params.get('category'))
}else{
    sort()
}
}
start()

let resizeTimeout; 

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout); 
    resizeTimeout = setTimeout(() => {
        start(); 
    }, 200);
});