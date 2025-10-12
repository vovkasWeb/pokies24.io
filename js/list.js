const menuBtns = document.querySelectorAll('.faq__menu-button')

menuBtns.forEach(menuBtn => {
  menuBtn.addEventListener('click', () => {
    const isOpen = menuBtn.classList.contains('open')
    const activeBtn = document.querySelector('.faq__menu-button.open')

    // Закрыть другой аккордеон, если он открыт
    if (activeBtn && activeBtn !== menuBtn) {
      closeAccordion(activeBtn)
    }

    // Переключаем текущий
    if (isOpen) {
      closeAccordion(menuBtn)
    } else {
      openAccordion(menuBtn)
    }
  })
})

function openAccordion(button) {
  const content = button.closest('dt').nextElementSibling
  const icon = button.querySelector('.icon')

  button.classList.add('open')
  button.setAttribute('aria-expanded', 'true')

  content.hidden = false

// Сначала сбрасываем высоту и пересчитываем layout
content.style.height = '0px'
content.offsetHeight 

// Теперь плавно задаём нужную высоту
content.style.height = content.scrollHeight + 'px'
content.style.padding = '0px 0px'

// После завершения анимации сбрасываем высоту на auto
content.addEventListener('transitionend', () => {
  content.style.height = 'auto'
}, { once: true })

  icon.style.transform = 'rotate(180deg)'
  button.closest('.faq__accordion').style.background =
    'linear-gradient(90deg, #00223B 1.44%, #0D6EB9 100%)'
}

function closeAccordion(button) {
  const content = button.closest('dt').nextElementSibling
  const icon = button.querySelector('.icon')

  button.classList.remove('open')
  button.setAttribute('aria-expanded', 'false')

  content.style.height = content.scrollHeight + 'px'
  content.offsetHeight // принудительный reflow

  content.style.transition = 'height 0.3s ease'
  content.style.height = '0px'
  content.style.padding = '0px 20px'
  setTimeout(() => (content.hidden = true), 300)

  icon.style.transform = 'rotate(0deg)'
  button.closest('.faq__accordion').style.background = '#10324C'
}
