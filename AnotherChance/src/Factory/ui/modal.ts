import {
	Container,
	FederatedEventHandler,
	FederatedPointerEvent,
	Graphics,
	Sprite,
	Ticker
} from "pixi.js";
import UIControls from "./controls";
import UIText from "./text";
import { useGameContainer } from ".";
import { gameCenter, gameSize } from "../stores/base";
import { Thickness } from "./spacing";
import { dbHighlight } from "./debug";

const spacing = 16;
interface ModalDimensions {
	w?: number;
	h?: number;
}

function backdrop(
	clickHandler?: FederatedEventHandler,
	init?: Partial<Container>,
	initG?: Partial<Graphics>
) {
	const gc = useGameContainer();

	const g = new Graphics();
	const cn = UIControls.container(gc);
	cn.addChild(g);

	g.beginFill(0x000, 0.53333);
	g.drawRect(0, 0, gameSize.w, gameSize.h);
	g.endFill();

	Object.assign(cn, init);
	Object.assign(g, initG);

	g.eventMode = "dynamic";

	if (clickHandler) {
		g.onclick = clickHandler;
	}

	gc.addChild(cn);

	return g;
}

function modal(
	title: string,
	bgAsset?: string,
	titleAsset?: string,
	dim?: ModalDimensions,
	titleSpace?: Partial<Thickness>,
	closeHandler?: FederatedEventHandler
) {
	bgAsset ??= "modal_frame_achievement";
	titleAsset ??= "modal_frame_title";

	const overlay = backdrop(handleClose);
	const root = overlay.parent;
	const diag = UIControls.container(root);
	const body = UIControls.container(diag);

	const bg = Sprite.from(bgAsset);
	const hd = UIText.textSprite(diag, title, "modal_text", titleAsset, titleSpace ?? {});

	let w = dim?.w ?? bg.width;
	let h = dim?.h ?? bg.height;

	let x = gameCenter.x - w / 2;
	let y = gameCenter.y - h / 2;

	bg.width = w;
	bg.height = h;

	body.addChild(bg);
	body.position.set(bg.x, hd.height + spacing);
	body.eventMode = "dynamic";

	hd.position.set(w / 2 - hd.width / 2, hd.y);

	diag.addChild(body);
	diag.position.set(x, y);

	function show() {
		root.position.set(root.x, 0);
	}

	function hide() {
		root.position.set(root.x, gameSize.h);
	}

	function handleClose(ev: FederatedPointerEvent) {
		hide();
		closeHandler?.(ev);
	}

	hide();

	return {
		root,
		diag,
		body,
		bg,
		hd,
		show,
		hide
	};
}

export default {
	backdrop,
	modal
};
