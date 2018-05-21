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
 * Assuming the supplied class name triggers a transition, this toggles the class to trigger it.
 */
function triggerTransition(element, toggleClass) {
    readyDom(element);
    element.classList.add(toggleClass);
}
exports.triggerTransition = triggerTransition;
/**
 * @param element The element that is transitioning.
 * @param toggleClass If supplied, this function will toggle this class to
 * trigger the transition. Otherwise it is assumed the application has
 * already done so.
 * @returns A promise that resolves when the transition ends.
 */
function transitionPromise(element, toggleClass) {
    if (toggleClass) {
        element.classList.toggle(toggleClass);
    }
    return new Promise(function (r) {
        element.addEventListener('transitionend', r);
    });
}
exports.transitionPromise = transitionPromise;
