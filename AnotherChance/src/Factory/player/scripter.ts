import Sound from "src/game/sound";
import UI, { useGameScreen } from "src/game/ui";
import type { ScriptLine, MainMenuScriptAction } from "./types";
import { gameSize, useGameStage } from "../stores/base";
import { Assets, Container } from "pixi.js";
import Anim from "src/game/anim";
import loader from "./loader";

export async function playScript({ script }: { script: ScriptLine[] }) {
	for (let i = 0; i < script.length; i++) {
		const line = script[i];

		if (typeof line == "string") {
			console.log(line);
		} else {
			switch (line.action) {
				case "music":
					const name = `music_${line.name}`;
					await Sound.playMusic(name, line.loopTimestamp);
					break;

				case "main_menu":
					// TODO: More dirty code to clean
					Assets.loadBundle("core");

					await playMainMenu(line);

					await UI.setupGame();
					// changeScene("school_first_hall");
					// changeScene("home_bedroom");
					// changeScene("home_bathroom");

					// changeScene("school_gym");
					// changeScene("home_kitchen");
					loader.testNextLocation();
					Sound.stopMusic();
					await Sound.playMusic("music_home_theme");
					break;

				case "scene":
					changeScene(line.location);
					break;
			}
		}
	}
}

function playMainMenu(act: MainMenuScriptAction) {
	return new Promise((res, rej) => {
		playMenuInternal(act, res, rej);
	});
}

function playMenuInternal(
	{ action, buttons }: MainMenuScriptAction,
	res: CallableFunction,
	rej: CallableFunction
) {
	if (action != "main_menu" || !buttons) {
		return;
	}

	const spacing = -12;
	const btnPanel = new Container();

	btnPanel.width = 350;
	btnPanel.x = btnPanel.width / 2 + 75 / 2;

	console.log(btnPanel.x);

	const stage = useGameStage();
	stage.addChild(btnPanel);

	for (let i = 0; i < buttons.length; i++) {
		const button = buttons[i];
		const btn = UI.button(btnPanel, button.label, () => handleMenuButton(button.name, res));
		btn.y = (btn.height + spacing) * i;
		// btn.x = -(btnPanel.width + btn.width);
		btn.x = -500;

		/*
		TODO: Port the beizer curves from RenPy
		    def easein_elastic(t):
        import math
        p = .3 # Period. It ranges 0.1 (spring many) ~ 1.0 (spring once).
        return 1 + pow(2, - 10 * t) * math.sin((t - p / 4.0) * (2.0 * math.pi) / p)
		*/

		Anim.tween(btn, {
			offset: {
				x: 0
			},
			easing: "elasticIn",
			duration: 1200,
			delay: 100 + 50 * i
		});

		const model = UI.xray(stage, [
			"demo_xray_sprite_sprite_clothed",
			"demo_xray_sprite_sprite_nude"
		]);
		model.y = gameSize.h;

		model.x = gameSize.w * 0.7 - model.width * 0.5;
		Anim.tween(model, {
			offset: {
				y: gameSize.h - model.height
			},
			easing: "elasticInOut",
			duration: 2000
		});
	}

	btnPanel.y = gameSize.h - btnPanel.height;
}

function changeScene(location: string) {
	// const gsc = useGameScreen();
	// TODO: Hide HUD?
	// gsc.removeChildren();

	loader.loadLocation(location);
}

function handleMenuButton(name: string, res: CallableFunction) {
	if (name == "new") {
		res();
	}
}
