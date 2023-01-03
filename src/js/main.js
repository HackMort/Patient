const toggleMenuBtn = document.querySelector('.header__nav--toggle');
const body = document.querySelector('body');
document.addEventListener("DOMContentLoaded", () => {
  toggleMenuBtn.addEventListener('click', () => {
    toggleMenu();
  });

});

function toggleMenu() {
  const toggleTextSpan = document.querySelector('.nav__toggle--text');
  const overlay = document.createElement('div');
  toggleTextSpan.innerHTML === 'Menu' ? toggleTextSpan.innerHTML = 'Close' : toggleTextSpan.innerHTML = 'Menu';
  overlay.classList.add('overlay');
  body.prepend(overlay);
  body.classList.toggle('mobile__nav--open');
  overlay.addEventListener('click', () => {
    toggleMenu();
  });
}

function closeMenu() {
  console.log('In?')
  body.classList.remove('mobile__nav--open');

}