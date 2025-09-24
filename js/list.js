const menuBtns = document.querySelectorAll('.faq__menu-button')

menuBtns.forEach(menuBtn => {
	menuBtn.addEventListener('click', function () {
		const activeAccordion = document.querySelector('.faq__menu-button.open')
		if (activeAccordion && activeAccordion !== menuBtn) {
			activeAccordion.nextElementSibling.style.height = 0
			activeAccordion.nextElementSibling.style.padding = '0px 20px'
			activeAccordion.classList.remove('open')
		}
		menuBtn.classList.toggle('open')
		const icon = menuBtn.querySelector('.icon')
		const content = menuBtn.nextElementSibling
		if (menuBtn.classList.contains('open')) {
			content.style.height = content.scrollHeight + 10 + 'px'
			content.style.padding = '10px 10px 10px 0px'
			icon.style.transform = 'rotate(180deg)'
			menuBtn.parentElement.style =
				'background: linear-gradient(90deg, #00223B 1.44%, #0D6EB9 100%);'
		} else {
			content.style.height = 0
			content.style.padding = '0px 20px'
			icon.style.transform = 'rotate(0deg)'
			menuBtn.parentElement.style = 'background:#10324C;'
		}
	})
})
