let readyCheck: CallableFunction;

function handleKeyDown(ev: KeyboardEvent) {
	readyCheck?.();
}

function handleKeyUp(ev: KeyboardEvent) {
	readyCheck?.();
}

export default {
	init: (cb: CallableFunction) => {
		// readyCheck = cb;
		document.addEventListener("keyup", handleKeyUp);
		document.addEventListener("keydown", handleKeyDown);
	}
};
