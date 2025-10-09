import { bestPartner } from './obj.js';


const url = new URL(window.location.href); // текущий URL
const params = new URLSearchParams(url.search);

const btnsFirst = document.querySelectorAll('.best-casinos__btn');
const btnsSecond= document.querySelectorAll('.best-casinos__link-payment');
const btnsOpen = document.querySelector('.best-casinos__btn-content');
const btnsBlock = document.querySelector('.best-casinos__links-payment');
const casinoList = document.querySelector('.best-casinos__list');

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
    console.log('Объект найден:');
    console.log(foundObj);
    casinoList.innerHTML = '';
    foundObj.forEach(casino => {
        casinoList.appendChild(render(casino))
    })
    addActiveClass(category)
    

  } else {
    console.log('Объект с таким ключом не найден');
  }

}

const render=(casino)=>{
    const card = document.createElement('div');
      card.className = 'best-casinos__item';
      card.innerHTML =`
        <div class="best-casinos__left">
            <img class="best-casinos__img" src="${casino.img.url}" alt="${casino.img.alt}" />
            <div class="best-casinos__main-info">
                <h4 class="best-casinos__title-item">${casino.name}</h4>
                <div class="best-casinos__rating-item">
                    <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stop-color="#f64747"/>
                            <stop offset="50%" stop-color="#ff6060"/>
                            </linearGradient>
                            <clipPath id="grayMask">
                            <rect x="60%" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="url(#redPink)"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="#10324C9E" clip-path="url(#grayMask)"/>
                    </svg>
                    <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stop-color="#f64747"/>
                            <stop offset="50%" stop-color="#ff6060"/>
                            </linearGradient>
                            <clipPath id="grayMask">
                            <rect x="60%" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="url(#redPink)"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="#10324C9E" clip-path="url(#grayMask)"/>
                    </svg>
                    <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stop-color="#f64747"/>
                            <stop offset="50%" stop-color="#ff6060"/>
                            </linearGradient>
                            <clipPath id="grayMask">
                            <rect x="60%" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="url(#redPink)"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="#10324C9E" clip-path="url(#grayMask)"/>
                    </svg>
                    <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stop-color="#f64747"/>
                            <stop offset="50%" stop-color="#ff6060"/>
                            </linearGradient>
                            <clipPath id="grayMask">
                            <rect x="60%" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="url(#redPink)"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="#10324C9E" clip-path="url(#grayMask)"/>
                    </svg>
                    <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="50%" stop-color="#f64747"/>
                            <stop offset="50%" stop-color="#ff6060"/>
                            </linearGradient>
                            <clipPath id="grayMask">
                            <rect x="60%" y="0" width="100%" height="100%"/>
                            </clipPath>
                        </defs>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="url(#redPink)"/>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                                2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                                C13.09 3.81 14.76 3 16.5 3
                                19.58 3 22 5.42 22 8.5
                                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                fill="#10324C9E" clip-path="url(#grayMask)"/>
                    </svg>
                    <div class="best-casinos__reting-num">
                        <span class="rating__current">5</span>
                        <span class="rating__divider">/</span>
                        <span class="rating__total">${casino.rating}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="best-casinos__text-item">
            <p>${casino.bonus}</p>
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
return card
}




if (params.get('category')) {
    sort(params.get('category'))
}else{
    sort()
}




    // Object.values(data).forEach(casino => {
    //   const card = document.createElement('div');
    //   card.className = 'best-casinos__item';
    //   card.innerHTML =`
    //                             <div class="best-casinos__left">
    //                                 <img class="best-casinos__img" src="${casino.img.url}" alt="${casino.img.alt}" />
    //                                 <div class="best-casinos__main-info">
    //                                     <h4 class="best-casinos__title-item">${casino.name}</h4>
    //                                     <div class="best-casinos__rating-item">
    //                                         <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                             <defs>
    //                                                 <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
    //                                                 <stop offset="50%" stop-color="#f64747"/>
    //                                                 <stop offset="50%" stop-color="#ff6060"/>
    //                                                 </linearGradient>
    //                                                 <clipPath id="grayMask">
    //                                                 <rect x="60%" y="0" width="100%" height="100%"/>
    //                                                 </clipPath>
    //                                             </defs>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="url(#redPink)"/>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="#10324C9E" clip-path="url(#grayMask)"/>
    //                                         </svg>
    //                                         <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                             <defs>
    //                                                 <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
    //                                                 <stop offset="50%" stop-color="#f64747"/>
    //                                                 <stop offset="50%" stop-color="#ff6060"/>
    //                                                 </linearGradient>
    //                                                 <clipPath id="grayMask">
    //                                                 <rect x="60%" y="0" width="100%" height="100%"/>
    //                                                 </clipPath>
    //                                             </defs>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="url(#redPink)"/>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="#10324C9E" clip-path="url(#grayMask)"/>
    //                                         </svg>
    //                                         <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                             <defs>
    //                                                 <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
    //                                                 <stop offset="50%" stop-color="#f64747"/>
    //                                                 <stop offset="50%" stop-color="#ff6060"/>
    //                                                 </linearGradient>
    //                                                 <clipPath id="grayMask">
    //                                                 <rect x="60%" y="0" width="100%" height="100%"/>
    //                                                 </clipPath>
    //                                             </defs>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="url(#redPink)"/>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="#10324C9E" clip-path="url(#grayMask)"/>
    //                                         </svg>
    //                                         <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                             <defs>
    //                                                 <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
    //                                                 <stop offset="50%" stop-color="#f64747"/>
    //                                                 <stop offset="50%" stop-color="#ff6060"/>
    //                                                 </linearGradient>
    //                                                 <clipPath id="grayMask">
    //                                                 <rect x="60%" y="0" width="100%" height="100%"/>
    //                                                 </clipPath>
    //                                             </defs>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="url(#redPink)"/>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="#10324C9E" clip-path="url(#grayMask)"/>
    //                                         </svg>
    //                                         <svg width="60" height="60" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    //                                             <defs>
    //                                                 <linearGradient id="redPink" x1="0" y1="0" x2="1" y2="0">
    //                                                 <stop offset="50%" stop-color="#f64747"/>
    //                                                 <stop offset="50%" stop-color="#ff6060"/>
    //                                                 </linearGradient>
    //                                                 <clipPath id="grayMask">
    //                                                 <rect x="60%" y="0" width="100%" height="100%"/>
    //                                                 </clipPath>
    //                                             </defs>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="url(#redPink)"/>
    //                                             <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
    //                                                     2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
    //                                                     C13.09 3.81 14.76 3 16.5 3
    //                                                     19.58 3 22 5.42 22 8.5
    //                                                     c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
    //                                                     fill="#10324C9E" clip-path="url(#grayMask)"/>
    //                                         </svg>
    //                                         <div class="best-casinos__reting-num">
    //                                             <span class="rating__current">5</span>
    //                                             <span class="rating__divider">/</span>
    //                                             <span class="rating__total">${casino.rating}</span>
    //                                         </div>
    //                                     </div>
    //                                 </div>
    //                             </div>
    //                             <div class="best-casinos__text-item">
    //                                 <p>${casino.bonus}</p>
    //                             </div>
    //                             <div class="best-casinos__links">
    //                                 <a class="best-casinos__link best-casinos__link-review" href="${casino.review}">
    //                                     Review
    //                                 </a>
    //                                 <a class="best-casinos__link best-casinos__link-now" href="${casino.play}">
    //                                     Play Now
    //                                 </a>
    //                             </div>

    //   `
    //   casinoList.appendChild(card);
    // });
  
