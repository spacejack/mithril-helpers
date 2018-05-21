/**
 * Forces DOM layout for this element so that toggled
 * classes/styles will trigger transitions.
 */
export function readyDom (element: Element) {
	const rc = element.getBoundingClientRect()
}

/**
 * Assuming the supplied class name triggers a transition, this toggles the class to trigger it.
 */
export function triggerTransition (element: Element, toggleClass: string) {
	readyDom(element)
	element.classList.add(toggleClass)
}

/**
 * @param element The element that is transitioning.
 * @param toggleClass If supplied, this function will toggle this class to
 * trigger the transition. Otherwise it is assumed the application has
 * already done so.
 * @returns A promise that resolves when the transition ends.
 */
export function transitionPromise (element: Element, toggleClass?: string) {
	if (toggleClass) {
		element.classList.toggle(toggleClass)
	}
	return new Promise<Event>(r => {
		element.addEventListener('transitionend', r)
	})
}
