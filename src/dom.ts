/**
 * Forces DOM layout for this element so that toggled
 * classes/styles will trigger transitions.
 */
export function readyDom (element: Element) {
	const rc = element.getBoundingClientRect()
}

/**
 * Assuming the supplied class name or style properties trigger a
 * transition, this prepares the element then toggles the class or
 * applies the style(s) to initiate the transition.
 */
export function triggerTransition (element: Element, toggle: string | Record<string, string | null>) {
	readyDom(element)
	if (typeof toggle === 'string') {
		element.classList.toggle(toggle)
	} else {
		Object.assign((element as HTMLElement).style, toggle)
	}
}

/**
 * @param element The element that is transitioning.
 * @param toggle If supplied, this function will toggle this class or
 * apply the style properties to trigger the transition. Otherwise
 * it is assumed the application has already done so.
 * @returns A promise that resolves when the transition ends.
 */
export function transitionPromise (element: Element, toggle?: string | Record<string, string | null>) {
	if (typeof toggle === 'string') {
		element.classList.toggle(toggle)
	} else if (toggle != null) {
		Object.assign((element as HTMLElement).style, toggle)
	}
	return new Promise<Event>(r => {
		element.addEventListener('transitionend', r)
	})
}

/** A map-like object for environments that don't support Map */
export interface KeyNavLock {
	elements: HTMLElement[]
	tabIndices: number[]
}

/**
 * Constrains keyboard navigation to children of the supplied element.
 * Useful for modal/dialogs.
 * @returns A lock object that can then be used to restore full keyboard nav.
 */
export function lockKeyNav (element: Element) {
	return (Array.from(document.querySelectorAll(
		'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
	)) as HTMLElement[]).filter(
		el => el.tabIndex != null && el.tabIndex >= 0 && !element.contains(el)
	).reduce((map, el) => {
		// Remember previous setting
		map.elements.push(el)
		map.tabIndices.push(el.tabIndex)
		// Set to -1
		el.tabIndex = -1
		return map
	}, {elements: [], tabIndices: []} as KeyNavLock)
}

/**
 * Given a lock object returned by lockKeyNav, this will restore
 * tab indices to all elements that were temporarily disabled.
 */
export function unlockKeyNav (lock: KeyNavLock) {
	for (let i = 0; i < lock.elements.length; ++i) {
		lock.elements[i].tabIndex = lock.tabIndices[i]
	}
	lock.elements = []
	lock.tabIndices = []
}
