import type {
	SubscribeInvalidateTuple,
	StartStopNotifier,
	Invalidator,
	Subscriber,
	Updater,
	UpdateAction,
	CallableState,
	ReadonlyCallableState,
	MutableCallableState
} from "./types";
import { get_store_value, is_function, noop, run_all, safe_not_equal, subscribe } from "./util";

const subscriber_queue: /*SubscribeInvalidateTuple*/ any[] = [];

/**
 * Creates a `Readable` store that allows reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#readable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Readable<T>}
 */
export function readable<T>(value: T, start: StartStopNotifier<T> = noop) {
	return {
		subscribe: writable(value, start).subscribe
	};
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
export function writable<T>(value: T, start: StartStopNotifier<T> = noop) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop: Invalidator<T> | null;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set<SubscribeInvalidateTuple<T>>();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value: T) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn: Updater<T>) {
		// @ts-ignore
		set(fn(value));
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop) {
		const subscriber: SubscribeInvalidateTuple = [run, invalidate];
		subscribers.add(subscriber);

		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
export function mutable<T extends object>(value: T, start: StartStopNotifier<T> = noop) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop: Invalidator<T> | null;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set<SubscribeInvalidateTuple<T>>();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value: T) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn: Updater<T>) {
		// @ts-ignore
		set(fn(value));
	}

	/**
	 * Adds object mutation without a return statement
	 * @param {UpdateAction<T>} fn
	 * @returns {void}
	 */
	function mutate(action: UpdateAction<T>) {
		action(value);
		set(value);
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop) {
		const subscriber: SubscribeInvalidateTuple = [run, invalidate];
		subscribers.add(subscriber);

		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, mutate, subscribe };
}

/**
 * @template {import('./private.js').Stores} S
 * @template T
 * @param {S} stores
 * @param {Function} fn
 * @param {T} [initial_value]
 * @returns {import('./public.js').Readable<T>}
 */
export function derived<S, T>(stores: S, fn: Function, initial_value: T) {
	const single = !Array.isArray(stores);
	/** @type {Array<import('./public.js').Readable<any>>} */
	const stores_array = single ? [stores] : stores;
	if (!stores_array.every(Boolean)) {
		throw new Error("derived() expects stores as input, got a falsy value");
	}
	const auto = fn.length < 2;
	return readable(initial_value, (set, update) => {
		let started = false;
		const values: T[] = [];
		let pending = 0;
		let cleanup = noop;
		const sync = () => {
			if (pending) {
				return;
			}
			cleanup();
			const result = fn(single ? values[0] : values, set, update);
			if (auto) {
				set(result);
			} else {
				cleanup = is_function(result) ? result : noop;
			}
		};

		const unsubscribers = stores_array.map((store, i) =>
			subscribe(
				store,
				// @ts-ignore
				(value) => {
					values[i] = value;
					pending &= ~(1 << i);
					if (started) {
						sync();
					}
				},
				() => {
					pending |= 1 << i;
				}
			)
		);
		started = true;
		sync();
		return function stop() {
			run_all(unsubscribers);
			cleanup();
			// We need to set this to false because callbacks can still happen despite having unsubscribed:
			// Callbacks might already be placed in the queue which doesn't know it should no longer
			// invoke this derived store.
			started = false;
		};
	});
}

// /**
//  * Takes a store and returns a new one derived from the old one that is readable.
//  *
//  * https://svelte.dev/docs/svelte-store#readonly
//  * @template T
//  * @param {import('./public.js').Readable<T>} store  - store to make readonly
//  * @returns {import('./public.js').Readable<T>}
//  */
// export function readonly<T>(store: Readable<T>) {
// 	return {
// 		subscribe: store.subscribe.bind(store as any)
// 	};
// }

/**
 * Provides an immutable version of a store
 *
 * https://svelte.dev/docs/svelte-store#readonly
 * @template T
 * @param {import('./public.js').Readable<T>} store  - store to make readonly
 * @returns {import('./public.js').Readable<T>}
 */
export function readonly<T>(store: T): Omit<T, "set" | "update" | "mutate"> {
	const clone = {
		...store
	} as any;

	delete clone["set"];
	delete clone["update"];
	delete clone["mutate"];

	return clone;
}

/**
 * Provides an immutable version of a callable store
 *
 * @template T
 * @param {import('./public.js').Readable<T>} store  - store to make readonly
 * @returns {import('./public.js').Readable<T>}
 */
export function creadonly<T>(store: CallableState<T>) {
	const clone = {
		...store
	} as any;

	// I think I hate typescript too
	delete clone["set"];
	delete clone["update"];
	delete clone["mutate"];

	return clone as ReadonlyCallableState<T>;
}

export function persist<T>(initial: T, start: StartStopNotifier<T> = noop) {
	let value: T;
	const state = writable(initial, start);
	state.subscribe((x) => (value = x));

	function get() {
		return value;
	}

	const getter = get;
	Object.assign(getter, { ...state });

	return getter as CallableState<T>;
}

export function mPersist<T extends object>(initial: T, start: StartStopNotifier<T> = noop) {
	let value: T;
	const state = mutable(initial, start);
	state.subscribe((x) => (value = x));

	function get() {
		return { ...value };
	}

	const getter = get;
	Object.assign(getter, { ...state });

	return getter as MutableCallableState<T>;
}

export { get_store_value as get };
