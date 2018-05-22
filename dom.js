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
/**
 * Constrains keyboard navigation to children of the supplied element.
 * Useful for modal/dialogs.
 * @returns A lock object that can then be used to restore full keyboard nav.
 */
function lockKeyNav(element) {
    return Array.from(document.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(function (el) { return el.tabIndex != null && el.tabIndex >= 0 && !element.contains(el); }).reduce(function (map, el) {
        // Remember previous setting
        map.elements.push(el);
        map.tabIndices.push(el.tabIndex);
        // Set to -1
        el.tabIndex = -1;
        return map;
    }, { elements: [], tabIndices: [] });
}
exports.lockKeyNav = lockKeyNav;
/**
 * Given a lock object returned by lockKeyNav, this will restore
 * tab indices to all elements that were temporarily disabled.
 */
function unlockKeyNav(lock) {
    for (var i = 0; i < lock.elements.length; ++i) {
        lock.elements[i].tabIndex = lock.tabIndices[i];
    }
    lock.elements = [];
    lock.tabIndices = [];
}
exports.unlockKeyNav = unlockKeyNav;
