import { extensions } from "pixi.js";
import HowlerExtension from "../loaders/howler";
import SpriteAtlasExtension from "./atlas";

export default {
	init: () => {
		extensions.add(HowlerExtension);
		extensions.add(SpriteAtlasExtension);
	}
};
