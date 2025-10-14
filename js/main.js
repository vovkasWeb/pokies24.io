import { category } from './obj.js'
const btns = document.querySelectorAll('.category__btn-block .category__btn')
const blockPartners = document.querySelector('.category__partners-block')
let filter = 'slots'

const element = element => {
	return `
    <div class="category__item-block">
        <div class="category__img-item">
            <img src="${element.img.url}" alt="${element.img.alt}" />
        </div>
        <div class="category__info-item">
            <h3 class="category__title-item">${element.title}</h3>
            <span class="category__text-item">
               ${element.text}
            </span>
            <div class="category__btns-item">
                <a class="category__btn-review btn-blue" href="${element.review}">Review</a>
                <a class="category__btn-play btn-yello" href="${element.play}">Play</a>
            </div>
        </div>
    </div>
`
}

const viewElements = filter => {
      blockPartners.innerHTML = ''
    if (category[filter]){
        btns.forEach(btn => {
            btn.classList.remove('active')
            if(btn.dataset.filter == filter){
                btn.classList.add('active')
            }
        })
        let arrElement = category[filter].map(el => element(el));
        blockPartners.innerHTML = arrElement.join(""); 
    }else{
        blockPartners.innerHTML = 'No elements';
    }
    
}
btns.forEach(btn => {
	btn.addEventListener('click', e => {
		if (filter == e.currentTarget.dataset.filter) {
			//console.log(filter)
			return
		}
		filter = e.currentTarget.dataset.filter
		viewElements(filter)
	})
})

viewElements(filter)