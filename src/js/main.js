
/* Toggle Menu Stuff */
const body = document.querySelector('body');
const toggleMenuBtn = document.querySelector('.header__nav--toggle');
document.addEventListener("DOMContentLoaded", () => {
  const accessCookie = document.cookie.split(';').filter((item) => item.trim().startsWith('accessCookie=')).pop();
  if (!accessCookie && accessCookie !== 'accessCookie=P4Ti3Nt2023' && window.location.pathname !== '/validate.html') {
    window.location.href = '/validate.html';
  }
  // Validate Form
  const form = document.querySelector('.form__validate');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const accessCode = form.querySelector('input[name="access-code"]').value;
      if (accessCode === 'P4Ti3Nt2023') {
        document.cookie = `accessCookie=${accessCode};max-age=604800`; // 1 week
        window.location.href = '/';
      } else {
        alert('Invalid Access Code');
      }
    });
  }

  if (toggleMenuBtn) {
    toggleMenuBtn.addEventListener('click', () => {
      toggleMenu();
    });
  }
  toggleSubmenu();

  // set active class on menu item depending on page
  const menuItems = document.querySelectorAll('.header__nav--menu_item');
  if (menuItems && menuItems.length > 0) {
    menuItems.forEach((item) => {
      const link = item.querySelector('a');
      if (link && link.href === window.location.href) {
        item.classList.add('current-menu-item');
      }
    })
  }

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

// Submenu Functionality 
function toggleSubmenu() {
  console.log('I am here');
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


// Wistia Video Sample

document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector('.wistia_embed');
  const button = document.querySelector('.video__control');
  const playIcon = document.querySelector('.control--icon.play');
  const pauseIcon = document.querySelector('.control--icon.pause');
  let video;

  window._wq = window._wq || [];

  _wq.push({
    id: 'wistia-747xnmy4p8-1', onReady: function (v) {
      video = v
      console.log(video)
      console.log(video.state())
    }
  });

  const onPlay = function () {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }

  const onPause = function () {
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
  }

  // Add listener
  if (button) {
    button.addEventListener('click', function () {
      const isPlaying = video.state() === 'playing';

      if (isPlaying) {
        video.pause()
        onPause()
      } else {
        video.play()
        onPlay()
      }
    })
  }
})


