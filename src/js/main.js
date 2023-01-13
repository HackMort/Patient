/**
 * "Increment a number from a start value to an end value over a duration of time,
 * and display the number in a specified element."
 * 
 * The function takes five parameters:
 * 
 * element: The element that will display the number.
 * start: The starting number.
 * end: The ending number.
 * duration: The duration of the animation in milliseconds.
 * increment: The amount to increment the number by.
 * The function uses the following variables:
 * 
 * current: The current number.
 * range: The difference between the start and end numbers.
 * step: The amount of time in milliseconds between each increment.
 * timer: The timer that controls the animation.
 * The function uses the setInterval() method to increment the number and display
 * it in the element. The setInterval() method is called once, and it calls a
 * function that increments the number and displays it in the element. The function
 * is called repeatedly until the current number reaches the end number
 * @param element {Element} - The element that will be updated with the number.
 * @param start {number} - The starting number
 * @param end {number} - The number to end at.
 * @param duration {number} - The total duration of the animation in milliseconds.
 * @param increment {number} - The amount to increment the number by.
 */
function numberIncrementAnimation(element, start, end, duration, increment) {
  let current = start;
  const range = end - start;
  increment = end > start ? increment : (increment * -1);
  const step = Math.abs(Math.floor(duration / range));
  const timer = setInterval(() => {
    current += increment;
    element.textContent = new Intl.NumberFormat().format(current);
    if (current == end) {
      clearInterval(timer);
    }
  }, step);
}

/* Toggle Menu Stuff */
const body = document.querySelector('body');
const toggleMenuBtn = document.querySelector('.header__nav--toggle');
document.addEventListener("DOMContentLoaded", () => {
  const accessCookie = document.cookie.split(';').filter((item) => item.trim().startsWith('accessCookie=')).pop();
  const host = window.location.host;
  console.log('Host: ', host);
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
      if (item.classList.contains('has--dropdown')) {
        const subMenuItems = item.querySelectorAll('.sub__menu_item a');
        if (subMenuItems && subMenuItems.length > 0) {
          subMenuItems.forEach((subItem) => {
            if (subItem.href === window.location.href) {
              item.classList.add('current-menu-item');
            }
          });
        }
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
  const subMenuItems = document.querySelectorAll('.header__nav--menu_item.has--dropdown');
  if (subMenuItems && subMenuItems.length > 0) {
    subMenuItems.forEach((item) => {
      const anchor = item.querySelector('a');
      const mediaQuery = window.matchMedia('(min-width: 1200px)');
      if (mediaQuery.matches) {
        item.addEventListener('mouseenter', () => {
          item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
          item.classList.remove('active');
        });
      }
      else {
        anchor.addEventListener('click', (e) => {
          e.preventDefault();
          item.classList.toggle('active');
        });
      }
      mediaQuery.addEventListener('change', (e) => {
        if (e.matches) {
          body.classList.remove('mobile__nav--open');
          subMenuItems.forEach((item) => {
            item.classList.remove('active');
          });
        }
      });
    });
  }
}


// NUMBER COUNTER ANIMATION
const elements = document.querySelectorAll('.icon-card .icon-card__amount');

if (elements && elements.length > 0) {
  elements.forEach((element) => {
    try {
      const start = 0;

      const dataEnd = element.getAttribute('data-end');
      const dataDuration = element.getAttribute('data-duration');
      const dataIncrement = element.getAttribute('data-increment');

      const observe = (dataEnd !== null) && (dataDuration !== null) && (dataIncrement !== null);

      if (observe) {

        const end = parseInt(dataEnd);
        const duration = parseInt(dataDuration);
        const increment = parseInt(dataIncrement);

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            let animated = false;

            if (element.getAttribute('data-animated')) {
              animated = element.getAttribute('data-animated').toString() === 'true' || false;
            }

            if (!animated && entry.isIntersecting) {
              numberIncrementAnimation(element, start, end, duration, increment);
              element.setAttribute('data-animated', 'true');
            }
          })
        }, { threshold: .5 });

        observer.observe(element);
      }
    } catch (error) {
      console.log(`Number animation error: `, error)
    }
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

  const setPlayButtonState = function () {
    playIcon.style.display = 'none';
    pauseIcon.style.display = 'block';
  }

  const setPauseButtonState = function () {
    pauseIcon.style.display = 'none';
    playIcon.style.display = 'block';
  }

  window._wq = window._wq || [];

  _wq.push({
    id: 'wistia-747xnmy4p8-1', onReady: function (v) {
      video = v;
      const isPlaying = video.state() === 'playing';

      if (isPlaying) {
        setPauseButtonState()
      } else {
        setPlayButtonState()
      }
    }
  });

  // Add listener
  if (button) {
    button.addEventListener('click', function () {
      const isPlaying = video.state() === 'playing';

      if (isPlaying) {
        video.pause()
        setPauseButtonState()
      } else {
        video.play()
        setPlayButtonState()
      }
    })
  }
})

// list--toggle functionality only 2 list items are visible (Show More / Show Less)
const listToggles = document.querySelectorAll('.list--toggle');
if (listToggles && listToggles.length > 0) {
  listToggles.forEach((listToggle) => {
    const listItems = listToggle.querySelectorAll('.list__element');
    if (listItems && listItems.length > 2) {
      listItems.forEach((item, index) => {
        if (index > 1) {
          item.classList.add('hidden');
        }
      });
      const button = listToggle.querySelector('.list--toggle_button');
      button.addEventListener('click', () => {
        listItems.forEach((item, index) => {
          if (index > 1) {
            item.classList.toggle('hidden');
          }
        });
        button.classList.toggle('active');
      });
    }
  });
}


// Modal Functionality only to links with .link--external class
const externalLinks = document.querySelectorAll('.link--external');
if (externalLinks && externalLinks.length > 0) {
  externalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      const externaLModal = document.getElementById('externalModal');
      const resourceButton = externaLModal.querySelector('.button--resource');
      resourceButton.setAttribute('href', href);
      const stayButton = externaLModal.querySelector('.button--stay');
      Fancybox.show([
        {
          src: externalModal,
          type: 'inline',
        }],
        {
          on: {
            closing: () => {
              console.log('closing');
              resourceButton.setAttribute('href', '');
            }
          }
        }
      )
      stayButton.addEventListener('click', () => {
        Fancybox.close();
      });
    });
  });
}