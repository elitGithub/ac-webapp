import { Container, Sprite } from "pixi.js";
import UIM from "src/game/ui/modal";
import UIText from "src/game/ui/text";
import { space } from "./spacing";
import { UIControl } from "./controls";
import { HighlightFilter } from "./filters";
import anim from "../anim";
import { gameSize } from "../stores/base";

let modal: Container;

const rows = 3;
const cols = 4;

const itemOffsetY = 70;

const colSpacing = 0;
const rowSpacing = 0;

// const diagSize = { w: 1350, h: 870 };
const diagSize = { w: 1350, h: 870 };

const slotZoom = 0.75;
const slotSize = { w: 300, h: 210 };
const slotSizeZ = { w: slotSize.w * slotZoom, h: slotSize.h * slotZoom };

const slotPadX = slotSizeZ.w / 2; //(diagSize.w - slotSize.w * cols) / (cols + 1);
const slotPadY = slotSizeZ.h / 2; //(diagSize.h - slotSize.h * rows) / (rows + 1);

let showFn: Function | undefined = undefined;

function init() {
	// TODO: Known issue, inventory bag is slimmer because of text stretch
	// clipping the midsection of the sprite should do the trick
	const {
		diag: modal,
		body,
		show
	} = UIM.modal(
		"Inventory",
		"inventory_bg",
		"inventory_frame_title",
		diagSize,
		space(90, 20, 40, 20)
	);

	const itemCn = UIControl.container(modal);

	for (let y = 0; y < rows; y++) {
		for (let x = 0; x < cols; x++) {
			const slot = UIControl.container(itemCn);

			const bg = Sprite.from("inventory_item_bg_empty");
			const bg2 = Sprite.from("inventory_item_bg");
			const label = UIText.textSprite(
				modal,
				"Lorem Ipsum",
				"label_title",
				undefined,
				space(45, 14, 45, 34)
			);

			bg.width = slotSizeZ.w;
			bg.height = slotSizeZ.h;

			bg2.width = slotSizeZ.w;
			bg2.height = slotSizeZ.h;

			slot.x = x * slotSize.w;
			slot.y = y * slotSize.h;

			label.y = body.y + slot.y - 20;
			label.x = slot.x + slotSizeZ.w - label.width / 2; // - label.width / 2;
			label.alpha = 0;

			console.log(body.x, slot.x);

			slot.addChild(bg);

			if (y < 2) {
				slot.addChild(bg2);
			}

			bg2.eventMode = "dynamic";
			bg2.onpointerover = () => {
				bg2.filters = [HighlightFilter];
				anim.tween(label, {
					offset: {
						alpha: 1
					},
					duration: 100
				});
			};

			slot.onpointerleave = () => {
				bg2.filters = [];
				anim.tween(label, {
					offset: {
						alpha: 0
					},
					duration: 100
				});
			};
		}
	}

	itemCn.x = body.x + body.width / 2 - itemCn.width / 2;
	itemCn.y = body.y + itemOffsetY;

	const pageText = UIText.gameText(modal, "Page 1 of 1", "modal_text");
	pageText.y = itemCn.y + itemCn.height + 48;

	showFn = show;

	// root.position.set(undefined, gameSize.h);
}

function show() {
	return showFn?.();
}

export const UIInventory = {
	show
};

export default {
	init,
	...UIInventory
};
