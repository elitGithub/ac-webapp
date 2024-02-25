import Touch from "./touch";
import Keyboard from "./keyboard";
import Sound from "../sound";

let ready = false;

function ensureReady() {
	if (!ready) {
		ready = true;
		prepareAudio();
	}
}

function prepareAudio() {
	Sound.prepare();
}

export default {
	init: () => {
		Touch.init(ensureReady);
		Keyboard.init(ensureReady);
	}
};
