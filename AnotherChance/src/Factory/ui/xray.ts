import { Container, FederatedPointerEvent, Sprite, Texture } from "pixi.js";
import { useGameStage } from "../stores/base";
import { TouchManager } from "../stim/touch";

let mask: Sprite;
let wo = 0;
let ho = 0;

function xray(parent: Container, assets: string[], init?: Partial<Container>) {
	const cnt = new Container();
	cnt.sortableChildren = true;
	parent.addChild(cnt);

	if (init) {
		Object.assign(cnt, init);
	}

	for (let i = 0; i < assets.length; i++) {
		const asset = assets[i];
		const sprite = Sprite.from(asset);
		sprite.zIndex = i;
		cnt.addChild(sprite);
	}

	cnt.children[cnt.children.length - 1].mask = mask;
	return cnt;
}

function handlePointerMove(ev: FederatedPointerEvent) {
	const coord = ev.data.global;
	mask.x = coord.x - wo;
	mask.y = coord.y - ho;
}

const Xray = {
	init: () => {
		const stage = useGameStage();

		mask = Sprite.from(Texture.from("ui_xray_mask_white"));
		mask.zIndex = -999;
		wo = mask.width / 2;
		ho = mask.height / 2;

		stage.addChild(mask);

		TouchManager.on("pointermove", handlePointerMove);
	},
	xray
};

export default Xray;
