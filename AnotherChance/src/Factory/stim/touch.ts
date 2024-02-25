import { InteractionManager, InteractionEvent } from "@pixi/interaction";
import { useRenderer } from "src/game/stores/base";

let readyCheck: CallableFunction;
export let TouchManager!: InteractionManager;

function handlePointerDown(ev: InteractionEvent) {
	readyCheck();
}

function init(cb: CallableFunction) {
	readyCheck = cb;

	const manager = new InteractionManager(useRenderer(), {});
	manager.on("pointerdown", handlePointerDown);

	TouchManager = manager;
}

export default {
	init
};
