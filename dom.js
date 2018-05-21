"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Forces DOM layout for this element so that toggled
 * classes/styles will trigger transitions.
 */
function readyDom(element) {
    var rc = element.getBoundingClientRect();
}
exports.readyDom = readyDom;
/**
 * Assuming the supplied class name or style properties trigger a
 * transition, this prepares the element then toggles the class or
 * applies the style(s) to initiate the transition.
 */
function triggerTransition(element, toggle) {
    readyDom(element);
    if (typeof toggle === 'string') {
        element.classList.toggle(toggle);
    }
    else {
        Object.assign(element.style, toggle);
    }
}
exports.triggerTransition = triggerTransition;
/**
 * @param element The element that is transitioning.
 * @param toggle If supplied, this function will toggle this class or
 * apply the style properties to trigger the transition. Otherwise
 * it is assumed the application has already done so.
 * @returns A promise that resolves when the transition ends.
 */
function transitionPromise(element, toggle) {
    if (typeof toggle === 'string') {
        element.classList.toggle(toggle);
    }
    else if (toggle != null) {
        Object.assign(element.style, toggle);
    }
    return new Promise(function (r) {
        element.addEventListener('transitionend', r);
    });
}
exports.transitionPromise = transitionPromise;
