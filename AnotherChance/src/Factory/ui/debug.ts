import { Container, Graphics } from "pixi.js";
import { useGameStage } from "../stores/base";
import { useGameContainer } from ".";

export function dbHighlight(el: Container, fill: number = 0xdd0000) {
	const parent = el.parent;
	const g = new Graphics();
	g.beginFill(fill, 0.4);
	g.drawRect(el.x, el.y, el.width, el.height);
	g.endFill();
	parent.addChild(g);

	return;
}
