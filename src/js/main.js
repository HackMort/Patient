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