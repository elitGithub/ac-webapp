import { Container, Graphics } from "pixi.js";
import { UIControl } from "./controls";
import { gameCenter, gameSize } from "../stores/base";
import Anim from "src/game/anim";
import UIModal from "src/game/ui/modal";

let backdrop: Container;
let backdropBg: Graphics;
let container: Container;
let launcher: Container;

let active = true;
let busy = false;

let phoneY = 0;
function init() {
	backdropBg = UIModal.backdrop(
		hide,
	{
		y: gameSize.h
	},
		{
			alpha: 0
		}
	);

	backdrop = backdropBg.parent;

	container = UIControl.container(backdrop);
	container.eventMode = "dynamic";

	UIControl.sprites(container, ["phone_bg"]);

	container.x = gameCenter.x - container.width / 2;
	container.y = gameSize.h;

	phoneY = gameCenter.y - container.height / 2;

	launcher = UIControl.container(container, {
		x: 30,
		y: 148
	});

	UIControl.sprites(launcher, ["phone_app_bg"]);
}

function show() {
	if (busy) {
		return;
	}

	busy = true;
	active = true;

	backdrop.y = 0;

	const p1 = Anim.tween(backdropBg, {
		offset: {
			alpha: 1
		},
		duration: 500
	});

	const p2 = Anim.tween(container, {
		offset: {
			y: phoneY
		},
		easing: "easeIn",
		duration: 500
	});

	Promise.all([p1, p2]).then(() => (busy = false));

	// TODO: update phone context based on store
}

function hide() {
	if (busy) {
		return;
	}

	busy = true;
	active = false;

	const p1 = Anim.tween(backdropBg, {
		offset: {
			alpha: 0
		},
		duration: 500
	}).then(() => {
		backdrop.y = gameSize.h;
	});

	const p2 = Anim.tween(container, {
		offset: {
			y: gameSize.h
		},
		easing: "easeOut",
		duration: 500
	});

	Promise.all([p1, p2]).then(() => (busy = false));
}

export const UIPhone = {
	show,
	hide
};

export default {
	init,
	...UIPhone
};
