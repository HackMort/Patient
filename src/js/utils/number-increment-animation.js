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
export default function numberIncrementAnimation(element, start, end, duration, increment) {
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