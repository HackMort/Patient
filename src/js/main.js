/* Toggle Menu Stuff */
const body = document.querySelector('body');
const toggleMenuBtn = document.querySelector('.header__nav--toggle');
document.addEventListener("DOMContentLoaded", () => {
  toggleMenuBtn.addEventListener('click', () => {
    toggleMenu();
  });
  toggleSubmenu();
});

function toggleMenu() {
  const toggleTextSpan = document.querySelector('.nav__toggle--text');
  const overlayDiv = document.querySelector('.overlay');
  if (overlayDiv) {
    overlayDiv.remove();
  }
  const overlay = document.createElement('div');
  toggleTextSpan.innerHTML === 'Menu' ? toggleTextSpan.innerHTML = 'Close' : toggleTextSpan.innerHTML = 'Menu';
  overlay.classList.add('overlay');
  body.prepend(overlay);
  body.classList.toggle('mobile__nav--open');
  overlay.addEventListener('click', () => {
    toggleMenu();
  });
}

// Submenu Functionality on Desktop

function toggleSubmenu() {
  const subMenuItems = document.querySelectorAll('.header__nav--menu_item.has--dropdown');
  if (subMenuItems && subMenuItems.length > 0) {
    subMenuItems.forEach((item) => {
      item.addEventListener('mouseenter', () => {
        item.classList.add('active');
      });
      item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
      });
      item.addEventListener('touchstart', () => {
        item.classList.add('active');
      });
      item.addEventListener('touchend', () => {
        item.classList.remove('active');
      });
    })
  }
}


// NUMBER COUNTER ANIMATION
import numberAnimation from './utils/number-increment-animation';

const elements = document.querySelectorAll('.icon-card .icon-card__amount');

if (elements && elements.length > 0) {
  elements.forEach((element) => {
    const start = 0;
    const end = parseInt(element.getAttribute('data-end'));
    const duration = parseInt(element.getAttribute('data-duration'));
    const increment = parseInt(element.getAttribute('data-increment'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const animated = element.getAttribute('data-animated').toString() === 'true';
        if (!animated && entry.isIntersecting) {
          numberAnimation(element, start, end, duration, increment);
          element.setAttribute('data-animated', 'true');
        }
      })
    }, { threshold: .5 });

    observer.observe(element);
  })
}
// NUMBER COUNTER ANIMATION