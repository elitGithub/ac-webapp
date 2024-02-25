import { Container, Graphics, Text } from "pixi.js";
import UIModal from "./modal";
import UIText from "./text";
import UILayout from "./layout";
import { space } from "./spacing";

const pd = space(80, 60, 80, 100);
const xmin = 500;
const xmax = 800;
const ymin = 400;

type NotifyKind = "quest" | "achievement";

function boxText(text: Text) {
	const content = new Container();

	const padL = pd.left ?? 0;
	const padT = pd.top ?? 0;
	const padR = pd.right ?? 0;
	const padB = pd.bottom ?? 0;

	const padX = padL + padR;
	const padY = padT + padB;

	const dim = UIText.measureText(text);
	const w = UILayout.constrain(dim.w + padX, xmin, xmax);
	const h = dim.h + padY;

	content.addChild(text);

	return {
		content,
		w,
		h
	};
}

function notify(title: string, content: Container | Text, kind?: NotifyKind, duration = 5000) {
	let asset: string;
	const titleAsset = "notification_modal_frame_title";
	if (kind == "quest") {
		asset = "notification_modal_frame_quest";
	} else {
		asset = "notification_modal_frame_achievement";
	}

	const modal = UIModal.modal(title, asset, titleAsset, undefined, space(128, 36, 64, 36));
	const hd = modal.hd;
	UILayout.scaleH(hd, 130);

	const body = modal.body;
	const bodyBg = modal.bg;

	const padL = pd.left ?? 0;
	const padT = pd.top ?? 0;
	const padR = pd.right ?? 0;
	const padB = pd.bottom ?? 0;

	const padX = padL + padR;
	const padY = padT + padB;

	let w = 0;
	let h = 0;

	if (content instanceof Text) {
		let { content: cn, w: width, h: height } = boxText(content);
		content = cn;
		w = width;
		h = height;
	} else {
		w = UILayout.constrain(content.width + padX, xmin, xmax);
		h = content.height + padY;

		if (kind == "quest") {
			h = UILayout.constrain(h, ymin);
		}

		console.log("notify", content.height, padY, h);
	}

	body.addChild(content);
	// dbHighlight(content);
	bodyBg.width = w;
	bodyBg.height = h;

	UILayout.centerX(content, undefined, padL, padR);
	UILayout.centerY(content, undefined, padT, padB);
	UILayout.centerX(hd, w);
	UILayout.globalCenter(modal.diag);

	modal.show();

	const delay = new Promise((resolve) => setTimeout(resolve, duration));

	/*
	  on show,replace:
    alpha 0.0
    easein 0.25 alpha 1.0
  on hide,replaced:
    easeout 0.25 alpha 0.0
	*/

	return delay.then(() => {
		modal.hide();
	});
}

async function notifyQuest(title: string, name: string, desc: string) {
	const cn = new Container();

	const nameText = UIText.simpleText(name, "modal_text");
	const bodyText = UIText.simpleText(desc, "modal_text");

	cn.addChild(nameText);
	cn.addChild(bodyText);
	const spacing = 8;

	const line = new Graphics().beginFill(0xab835e).drawRect(0, 0, cn.width, 5).endFill();
	line.position.set(line.x, nameText.y + nameText.height + spacing);
	bodyText.y = line.y + line.height + spacing;
	cn.addChild(line);

	UILayout.centerX(nameText);

	const res = await notify(title, cn, "quest");
	return res;
}

async function nofityAchievement(desc: string) {
	const title = "Achievement";
	const bodyText = UIText.simpleText(desc, "ach_text");

	const res = await notify(title, bodyText, "achievement");

	return res;
}

export const UINotify = {
	notifyQuest,
	nofityAchievement
};

export default {
	...UINotify
};
