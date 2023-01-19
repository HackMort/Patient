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
 * @param element {HTMLElement} - The element that will be updated with the number.
 * @param end {number} - The number to end at.
 * @param duration {number} - The total duration of the animation in milliseconds.
 */
function numberIncrementAnimation(element, end, duration) {

    // Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
    const frameDuration = 1000 / 60;
    // Use that to calculate how many frames we need to complete the animation
    const totalFrames = Math.round(duration / frameDuration);
    // An ease-out function that slows the count as it progresses
    let easeOutQuad;

    if (end > 2000) {
        easeOutQuad = x => 1 - Math.pow(1 - x, 8);
    } else {
        easeOutQuad = x => Math.sqrt(1 - Math.pow(x - 1, 2));
    }

    let frame = 0;
    // Start the animation running 60 times per second
    const counter = setInterval(() => {
        frame++;
        // Calculate our progress as a value between 0 and 1
        // Pass that value to our easing function to get our
        // progress on a curve
        const progress = easeOutQuad(frame / totalFrames);
        // Use the progress value to calculate the current count
        const value = Math.round(end * progress);

        // If the current count has changed, update the element
        element.textContent = new Intl.NumberFormat().format(value);

        // If we’ve reached our last frame, stop the animation
        if (frame === totalFrames) {
            clearInterval(counter);
        }
    }, frameDuration);
}

/**
 * This function validate form control
 * @param event {FocusEvent} - The event object that was triggered.
 */
function validateFormControl(event) {
    const parentClassName = 'form__control';
    const formClassName = 'form';

    /**
     * If the parent element of the child element has the class name, return the parent
     * element, otherwise, call the function again with the parent element as the child
     * element.
     * @param child {HTMLElement} - the child element that you want to find the parent of
     * @param className {string} - The class name of the parent element you're looking for.
     * @returns {HTMLElement} The parent element of the child element.
     */
    const getParent = function (child, className) {

        const parent = child.parentElement;
        const isControlParent = parent.classList.contains(className);

        if ((parent === null) || isControlParent) {
            return parent;
        } else {
            return getParent(parent, className);
        }
    }

    /**
     * If any of the radio buttons in the group are checked, return true.
     * @param name {string} - The name of the radio group.
     * @returns {boolean} A boolean value.
     */
    const radioGroupIsValid = function (name) {
        let radioGroup = document.getElementsByName(`input[type="radio"][name=${name}]`);
        let isValid = false;
        for (let i = 0; i < radioGroup.length; i++) {
            if (radioGroup[i].checked) {
                isValid = true;
                break;
            }
        }

        return isValid;
    }

    const control = event.target;
    const parent = getParent(control, parentClassName);
    const controlIndex = +parent.dataset.fieldIndex;
    const form = getParent(parent, formClassName);
    const submitButton = form.querySelector("[type='submit']");
    const controls = Array.from(form.querySelectorAll('.' + parentClassName));

    /**
     * If the form is valid, remove the disabled attribute from the submit button,
     * otherwise add the disabled attribute to the submit button
     */
    const toggleSubmitButtonState = function () {
        if (form && form.checkValidity()) {
            submitButton && submitButton.removeAttribute('disabled');
            form.classList.remove('form--invalid');
        } else {
            submitButton && submitButton.setAttribute('disabled', 'true');
            form.classList.add('form--invalid');
        }
    }

    toggleSubmitButtonState();

    if (control.type === "radio" && !control.checked) {
        const groupIsValid = radioGroupIsValid(control.name);

        if (groupIsValid) {
            parent.classList.remove('form__control--invalid');
            parent.dataset.isValid = 'true'
        } else {
            parent.classList.add('form__control--invalid');
            parent.dataset.isValid = 'false'
        }
    } else {
        if (control.checkValidity()) {
            parent.classList.remove('form__control--invalid');
            parent.dataset.isValid = 'true'
        } else {
            parent.classList.add('form__control--invalid');
            parent.dataset.isValid = 'false'
        }
    }

    if (event.type === 'blur') {
        for (let i = 0; i < controls.length; i++) {
            const previousControl = controls[i];
            const { fieldIndex, required, isValid } = previousControl.dataset;

            if ((+fieldIndex < controlIndex) && !(isValid === 'true') && (required === 'true')) {
                previousControl.classList.add('form__control--invalid')
            }
        }
    }

    toggleSubmitButtonState();
}

/* Toggle Menu Stuff */
const body = document.querySelector('body');
const toggleMenuBtn = document.querySelector('.header__nav--toggle');
document.addEventListener("DOMContentLoaded", () => {
    const accessCookie = document.cookie.split(';').filter((item) => item.trim().startsWith('accessCookie=')).pop();
    // const host = window.location.host;
    // console.log('Host: ', host);
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
            // if (mediaQuery.matches) {
            //     item.addEventListener('mouseenter', () => {
            //         item.classList.add('active');
            //     });
            //     item.addEventListener('mouseleave', () => {
            //         item.classList.remove('active');
            //     });
            // }
            // else {
            // anchor.addEventListener('click', (e) => {
            //     e.preventDefault();
            //     item.classList.toggle('active');
            // });
            // }
            // mediaQuery.addEventListener('change', (e) => {
            //     if (e.matches) {
            //         body.classList.remove('mobile__nav--open');
            //         subMenuItems.forEach((item) => {
            //             item.classList.remove('active');
            //         });
            //     }
            // });

            // show menu if the user clicks on the menu item
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                item.classList.toggle('active');
            });

            document.addEventListener('click', (e) => {
                if (e.target !== item && !item.contains(e.target)) {
                    item.classList.remove('active');
                }
            });
            // Just in case we need this later 
            // item.addEventListener('mouseleave', () => {
            //     item.classList.remove('active');
            // });
        });
    }
}


// NUMBER COUNTER ANIMATION
const elements = document.querySelectorAll('.icon-card .icon-card__amount');

if (elements && elements.length > 0) {
    elements.forEach((element) => {
        try {
            const { end, duration } = element.dataset;

            const observe = (end !== undefined) && (duration !== undefined);

            if (observe) {

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach((entry) => {
                        let animated = element.hasAttribute('data-animated') ? true : false;
                        if (animated && entry.isIntersecting) {
                            numberIncrementAnimation(element, end, duration);
                            observer.unobserve(element);
                        }

                    })
                }, { threshold: 1 }); // Untill element is fully visible
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


// Modal Functionality only all links with target="_blank" are affected
const externalLinks = document.querySelectorAll('a[target="_blank"]');
if (externalLinks && externalLinks.length > 0) {
    externalLinks.forEach((link) => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            const exitModal = document.getElementById('exitModal');
            const continueButton = exitModal.querySelector('.button--continue');
            const stayButton = exitModal.querySelector('.button--stay');
            continueButton.setAttribute('href', href);
            stayButton.addEventListener('click', () => {
                Fancybox.close();
            });
            if (link.classList.contains('button--continue')) {
                stayButton.click();
                setTimeout(() => {
                    window.open(href, '_blank');
                }, 100);
                return;
            }
            Fancybox.show([
                {
                    src: exitModal,
                    type: 'inline',
                    autoFocus: false,
                }],
                {
                    on: {
                        closing: () => {
                            continueButton.setAttribute('href', '');
                        }
                    }
                }
            );
        });
    });
}

// Form control mask
const inputsWithMask = Array.from(document.querySelectorAll('input[type="text"][data-mask="true"]'));

inputsWithMask.forEach((input) => {
    const { maskPattern } = input.dataset;

    IMask(input, {
        mask: maskPattern,
        lazy: false,
        placeholderChar: '_'
    });
})

// 


// get all images with .gif extension
const lazyImages = document.querySelectorAll('img[src$=".gif"]');
if (lazyImages && lazyImages.length > 0) {
    lazyImages.forEach((image) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const src = image.getAttribute('src');
                    image.setAttribute('src', src);
                    observer.unobserve(image);
                }
            });
        }, { threshold: 1 });
        observer.observe(image);
    });
}