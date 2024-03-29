'use strict'

const menuItens = document.querySelectorAll('#menu a[href^="#"]')

menuItens.forEach(item => {
  item.addEventListener('click', scrollToOnClick)
})

function getScrollToByHref(element) {
  const id = element.getAttribute('href')
  return document.querySelector(id).offsetTop
}
    
function scrollToOnClick (event) {
  event.preventDefault()
  const section = getScrollToByHref(event.path[0]) - 80

 smoothScrollTo(0, section, 800)
 abrirMenu()

}


/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
 function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};

// Menu hamburguer

const btnMobile = document.getElementById('hamburguer')

function abrirMenu () {
  const menu = document.getElementById('menu')
  menu.classList.toggle('active')
}

btnMobile.addEventListener('click', abrirMenu)

