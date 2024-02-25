import {
	ExtensionType,
	ISpritesheetData,
	LoaderParserPriority,
	Spritesheet,
	Texture,
	utils
} from "pixi.js";

interface SpritesheetPack {
	name: string;
	sheets: Spritesheet[];
}

// TODO: Assets like sky_autumn_sunset are too wide (4950)
// will probably resize them during Gen
const packs = new Map<string, SpritesheetPack>();

function test(url: string) {
	const ext = utils.path.extname(url)?.trim();

	console.log("Testing ", url);

	switch (ext) {
		case ".satlas":
			return true;
	}
	return false;
}

async function load(url: string) {
	const payload = await fetch(url);
	const atlas = (await payload.json()) as ISpritesheetData[];
	const pack: SpritesheetPack = {} as SpritesheetPack;

	const chunks = url.split("/");
	pack.name = chunks[chunks.length - 1];
	pack.sheets = [];

	for (const data of atlas) {
		const texture = Texture.from(data.meta.image as string);
		const spritesheet = new Spritesheet<ISpritesheetData>({
			texture,
			data
		});

		await spritesheet.parse();
		pack.sheets.push(spritesheet);
	}

	packs.set(url, pack);
	return pack;
}

function unload(asset: any) {}

export default {
	type: ExtensionType.LoadParser,
	name: "Spritesheet Atlas Loader",
	priority: LoaderParserPriority.Normal,
	ref: {
		test,
		load,
		unload
	}
};
