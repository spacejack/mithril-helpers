/**
 * Forces DOM layout for this element so that toggled
 * classes/styles will trigger transitions.
 */
export declare function readyDom(element: Element): void;
/**
 * Assuming the supplied class name or style properties trigger a
 * transition, this prepares the element then toggles the class or
 * applies the style(s) to initiate the transition.
 */
export declare function triggerTransition(element: Element, toggle: string | Record<string, string | null>): void;
/**
 * @param element The element that is transitioning.
 * @param toggle If supplied, this function will toggle this class or
 * apply the style properties to trigger the transition. Otherwise
 * it is assumed the application has already done so.
 * @returns A promise that resolves when the transition ends.
 */
export declare function transitionPromise(element: Element, toggle?: string | Record<string, string | null>): Promise<Event>;
/** A map-like object for environments that don't support Map */
export interface KeyNavLock {
    elements: HTMLElement[];
    tabIndices: number[];
}
/**
 * Constrains keyboard navigation to children of the supplied element.
 * Useful for modal/dialogs.
 * @returns A lock object that can then be used to restore full keyboard nav.
 */
export declare function lockKeyNav(element: Element): KeyNavLock;
/**
 * Given a lock object returned by lockKeyNav, this will restore
 * tab indices to all elements that were temporarily disabled.
 */
export declare function unlockKeyNav(lock: KeyNavLock): void;
