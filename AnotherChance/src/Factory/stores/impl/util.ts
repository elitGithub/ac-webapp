import { Invalidator, Readable, Subscriber } from "./types";

/** @returns {void} */
export function noop() {}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
export function is_function(thing: unknown) {
	return typeof thing === "function";
}

/** @returns {boolean} */
export function safe_not_equal(a: unknown, b: unknown) {
	return a != a ? b == b : a !== b || (a && typeof a === "object") || typeof a === "function";
}

export function subscribe(store: Readable, ...callbacks: (Subscriber | Invalidator)[]) {
	if (store == null) {
		for (const callback of callbacks) {
			callback(undefined);
		}
		return noop;
	}

	// @ts-ignore
	const unsub = store.subscribe(...(callbacks as const));
	// @ts-ignore
	return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}

/**
 * Get the current value from a store by subscribing and immediately unsubscribing.
 *
 * https://svelte.dev/docs/svelte-store#get
 * @template T
 * @param {import('../store/public.js').Readable<T>} store
 * @returns {T}
 */
export function get_store_value<T>(store: Readable<T>) {
	let value!: T;
	const cb: Subscriber = (_) => (value = _);
	subscribe(store, cb)();

	return value;
}

export function run(fn: Function) {
	return fn();
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
export function run_all(fns: Function[]) {
	fns.forEach(run);
}
