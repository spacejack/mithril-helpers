/**
 * Forces DOM layout for this element so that toggled
 * classes/styles will trigger transitions.
 */
export declare function readyDom(element: Element): void;
/**
 * Assuming the supplied class name triggers a transition, this toggles the class to trigger it.
 */
export declare function triggerTransition(element: Element, toggleClass: string): void;
/**
 * @param element The element that is transitioning.
 * @param toggleClass If supplied, this function will toggle this class to
 * trigger the transition. Otherwise it is assumed the application has
 * already done so.
 * @returns A promise that resolves when the transition ends.
 */
export declare function transitionPromise(element: Element, toggleClass?: string): Promise<Event>;
