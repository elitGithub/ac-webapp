import { Container, Text, Sprite } from "pixi.js";
import UIText, { UITextStyle } from "./text";
import UILayout from "./layout"
import { HighlightFilter } from "./filters";
import { Observable } from "rxjs";
import { gameSize } from "../stores/base";
import { Thickness } from "./spacing";
const highlight = [HighlightFilter];

const HUD_SPACING = 8;
const HUD_OFFSET = 30;
const HUD_PADDING = 16;

const leftHud: Container[] = [];
const rightHud: Container[] = [];

type HudAlign = "left" | "right";

interface Constraints {
	xmin: number;
	xmax: number;
	ymin: number;
	ymax: number;
}

function container(parent?: Container, init?: Partial<Container>) {
	const container = new Container();
	if (parent) {
		parent.addChild(container);
	}

	if (init) {
		Object.assign(container, init);
	}

	return container;
}

function sprites(parent: Container, srcs: string[], init?: Partial<Sprite>) {
	const res: Sprite[] = [];
	for (const src of srcs) {
		const sprite = Sprite.from(src);
		if (init) {
			Object.assign(sprite, init);
		}

		parent.addChild(sprite);
		res.push(sprite);
	}

	return res;
}

function iconButton(
	parent: Container,
	asset: string,
	action?: CallableFunction,
	init?: Partial<Sprite>
) {
	const btn = Sprite.from(asset);
	btn.interactive = true;
	btn.eventMode = "dynamic";
	// const hoverBg = new Texture()
	if (init) {
		Object.assign(btn, init);
	}

	// TODO: Register for hover, etc
	btn.onclick = (ev) => {
		action?.();
	};

	btn.onpointerover = (ev) => {
		// text.style.fill = 0x841;
		btn.filters = highlight;
	};

	btn.onpointerleave = (ev) => {
		// text.style.fill = fill;

		btn.filters = [];
	};

	parent.addChild(btn);
	return btn;
}

function button(
	parent: Container,
	label?: string,
	action?: CallableFunction,
	init?: Partial<Sprite>
) {
	const btn = Sprite.from("ui_frame_button");
	btn.interactive = true;
	btn.eventMode = "dynamic";
	// const hoverBg = new Texture()
	if (init) {
		Object.assign(btn, init);
	}

	if (label) {
		UIText.gameText(btn, label, "Button");
	}

	// TODO: Register for hover, etc
	btn.onclick = (ev) => {
		console.log("Clicked", label, ev);
		action?.();
	};

	btn.onpointerover = (ev) => {
		// text.style.fill = 0x841;
		btn.filters = highlight;
	};

	btn.onpointerleave = (ev) => {
		// text.style.fill = fill;

		btn.filters = [];
	};

	// btn.anchor.set(0.5, 0.5);
	parent.addChild(btn);
	return btn;
}

function hudButton(
	hud: Container,
	asset: string,
	init?: Partial<Container>,
	text?: Observable<string>,
	constraints: Constraints = {
		xmin: 250,
		ymin: 50,
		xmax: 600,
		ymax: 50
	},
	pad: Partial<Thickness> = {
		left: 24,
		top: 8,
		right: 24,
		bottom: 8,
	},
	align: HudAlign = "left",
	action?: CallableFunction
) {
	const container = new Container();
	hud.addChild(container);

	const bg = Sprite.from(asset);
	container.addChild(bg);

	const padL = pad.left ?? HUD_PADDING;
	const padR = pad.right ?? HUD_PADDING;
	const padT = pad.top ?? 0;
	const padB = pad.bottom ?? 0;

	if (text) {
		// const txtCn = UIControl.container(container);
		const txt = UIText.simpleText("", "Hud");

		text.subscribe((value) => {
			txt.text = value;
			// Align text here
			const dim = UIText.measureText(txt);
			
			let width = padL + dim.w + padR;

			width = UILayout.constrain(width, constraints.xmin, constraints.xmax)

			// TODO: propagate width change to next hud
			bg.width = width;
			UILayout.centerX(txt, width, padL, padR);

			// txt.x = bg.width / 2;
			resizeHud(align, container);
		});

		container.addChild(txt);
		UILayout.centerY(txt, undefined, padT, padB);
	}

	if (init) {
		Object.assign(container, init);
	}

	if (action) {
		const btn = container;
		btn.eventMode = "dynamic";
		// btn.interactive = true;
		btn.onclick = (ev) => {
			action?.();
		};

		btn.onpointerover = (ev) => {
			bg.filters = highlight;
		};

		btn.onpointerleave = (ev) => {
			// text.style.fill = fill;

			bg.filters = [];
		};
	}

	alignContainer(container, align);

	return container;
}

function hudStatus(
	hud: Container,
	status: Container,
	text?: Observable<string>,
	constraints: Constraints = {
		xmin: 250,
		ymin: 50,
		xmax: 600,
		ymax: 50
	},
	align: HudAlign = "left",
	textStyle: UITextStyle = "Hud"
) {
	const container = new Container();
	hud.addChild(container);

	container.addChild(status);

	let width = status.width;
	if (width < constraints.xmin) {
		width = constraints.xmin;
	} else if (width > constraints.xmax) {
		width = constraints.xmax;
	}

	status.width = width;

	if (text) {
		const txt = UIText.gameText(container, "", textStyle);

		text.subscribe((value) => {
			txt.text = value;
			txt.x = container.width / 2;
		});
	}

	alignContainer(container, align);

	return container;
}

function alignContainer(container: Container, align: HudAlign, add = true) {
	if (align == "left") {
		if (leftHud.length > 0) {
			const prev = leftHud.indexOf(container) - 1;

			console.log("prev index",prev)

			let last;

			if (prev < 0) {
				last = leftHud[leftHud.length - 1]
			} else {
				last = leftHud[prev]
			}
			

			// const last = leftHud[leftHud.length - 1];
			// if (container == last) {
			// 	return;
			// }

			console.log("Aligning: ", last.x, last.width, prev)

			container.x = last.width + HUD_SPACING + last.x;
		} else {
			container.x = HUD_OFFSET;
		}

		if (add) {
			leftHud.push(container);
		}
	} else {
		if (rightHud.length > 0) {
			const last = rightHud[rightHud.length - 1];
			if (container == last) {
				return;
			}

			container.x = last.x - (container.width + HUD_SPACING);
			console.log(container.x);
		} else {
			container.x = gameSize.w - (HUD_OFFSET + container.width);
		}

		if (add) {
			rightHud.push(container);
		}
	}
}

function resizeHud(align: HudAlign, src: Container) {
	let arr: Container[];

	if (align == "left") {
		arr = leftHud;
	} else {
		arr = rightHud;
	}

	let n = arr.indexOf(src);
	if (n < 0) {
		return;
	}

	n++;
	for (; n < arr.length; n++) {
		alignContainer(arr[n], align, false);
	}

	// let offset = src.width + HUD_SPACING + src.x;

	// if (align == "left") {
	// 	for (; n < arr.length; n++) {
	// 		offset += src.width + HUD_SPACING;
	// 		arr[n].x = offset;
	// 	}
	// } else {
	// 	for (; n < arr.length; n++) {
	// 		offset -= src.width + HUD_SPACING;
	// 		arr[n].x = offset;

	// 		console.log(offset);
	// 	}
	// }
}

function measureText(text: Text) {
	// TODO: Cache this object
	const temp = new Text();
	temp.style = text.style;

	temp.text = text.text;

	return {
		width: temp.width,
		height: temp.height
	};
}

export const UIControl = {
	button,
	hudButton,
	iconButton,
	hudStatus,
	sprites,
	container
};

export default {
	...UIControl
};
