import { TextStyle, Text, Container, BitmapText, BitmapFont, Sprite } from "pixi.js";
import { Thickness } from "./spacing";

const FNT_COMIC_HELVETIC = "Comic Helvetic";
const FNT_FRESCA = "Fresca Regular";

// TODO: Move these to scripts or config
export type UITextStyle =
	| "Default"
	| "Button"
	| "Hud"
	| "hud_money"
	| "hud_energy"
	| "modal_text"
	| "ach_text"
	| "label_title";
const styles = new Map<UITextStyle, TextStyle>();
const bitmapFonts = new Map<string, BitmapFont>();
const measurePool = [] as Text[];

const DEFAULT_STYLE = new TextStyle({
	fontFamily: FNT_COMIC_HELVETIC,
	fontWeight: "bold",
	fontSize: 50,
	fill: 0x000
});

function simpleText(value: string, style: UITextStyle) {
	const textStyle = styles.get(style) ?? DEFAULT_STYLE;
	const txt = new Text(value, textStyle);
	return txt;
}

function gameText(parent: Container, value: string, style: UITextStyle) {
	const textStyle = styles.get(style) ?? DEFAULT_STYLE;
	const txt = new Text(value, textStyle);

	txt.anchor.set(0.5, 0.5);
	txt.x = parent.width / 2;
	txt.y = parent.height / 2;

	parent.addChild(txt);
	return txt;
}

function bmpText(parent: Container, value: string, style: UITextStyle) {
	const textStyle = styles.get(style) ?? DEFAULT_STYLE;
	const txt = new BitmapText(value, {
		...textStyle,
		fontName: textStyle.fontFamily as string
	});

	txt.anchor.set(0.5, 0.5);
	txt.x = parent.width / 2;
	txt.y = parent.height / 2;

	parent.addChild(txt);
	return txt;
}

function textSprite(
	parent: Container,
	value: string,
	style: UITextStyle,
	asset?: string,
	pd?: Partial<Thickness>
) {
	const cn = new Container();
	parent.addChild(cn);

	const textStyle = styles.get(style) ?? DEFAULT_STYLE;
	const txt = new Text(value, textStyle);

	const dim = measureText(txt);
	const p = {
		l: pd?.left ?? 0,
		t: pd?.top ?? 0,
		r: pd?.right ?? 0,
		b: pd?.bottom ?? 0
	};

	const bg = Sprite.from(asset ?? "ui_frame_objname_gold");
	bg.width = dim.w + p.l + p.r;
	bg.height = dim.h + p.t + p.b;

	cn.addChild(bg);

	txt.anchor.set(0, 0);
	// txt.x = cn.width / 2;
	// txt.y = cn.height / 2;

	// txt.anchor.set(0.5, 0.5);
	txt.x = p.l;
	txt.y = p.t;

	cn.addChild(txt);
	return cn;
}

function measureText(text: Text) {
	return measure(text.text, text.style);
}

function measureUIText(value: string, style: UITextStyle) {
	const stl = styles.get(style) ?? DEFAULT_STYLE;

	return measure(value, stl);
}

function measure(value: string, style: TextStyle) {
	let [mText] = measurePool.splice(0, 1);
	if (!mText) {
		mText = new Text();
	}

	mText.text = value;
	mText.style = style;

	const dim = {
		w: mText.width,
		h: mText.height
	};

	measurePool.push(mText);
	return dim;
}

function init() {
	styles.set("Default", DEFAULT_STYLE);
	styles.set(
		"Button",
		new TextStyle({
			fontFamily: FNT_COMIC_HELVETIC,
			fill: 0x6a431e,
			fontWeight: "bolder",
			fontSize: 33
		})
	);
	styles.set(
		"Hud",
		new TextStyle({
			fontFamily: FNT_FRESCA,
			fill: 0x000,
			fontSize: 20,
			align: "center"
		})
	);

	styles.set(
		"hud_money",
		new TextStyle({
			fontFamily: FNT_FRESCA,
			fill: 0xffffff,
			fontSize: 33
		})
	);

	styles.set(
		"hud_energy",
		new TextStyle({
			fontFamily: FNT_FRESCA,
			fill: 0x442200,
			fontSize: 20
		})
	);

	styles.set(
		"modal_text",
		new TextStyle({
			fontFamily: FNT_COMIC_HELVETIC,
			fill: 0x442200,
			fontWeight: "100",
			fontSize: 42,
			align: "center",
			// lineHeight: 25,
			wordWrap: true,
			wordWrapWidth: 640
		})
	);

	styles.set(
		"ach_text",
		new TextStyle({
			fontFamily: FNT_COMIC_HELVETIC,
			fill: 0x442200,
			fontWeight: "100",
			fontSize: 42,
			align: "center",
			lineHeight: 25,
			wordWrap: true,
			wordWrapWidth: 1
		})
	);

	styles.set(
		"label_title",
		new TextStyle({
			fontFamily: FNT_COMIC_HELVETIC,
			fill: 0xeeeeee,
			fontWeight: "100",
			fontSize: 32
		})
	);

	for (const [_, style] of styles.entries()) {
		const fontFamily = style.fontFamily as string;

		if (!bitmapFonts.has(fontFamily)) {
			bitmapFonts.set(fontFamily, BitmapFont.from(fontFamily));
		}
	}
}

export default {
	bmpText,
	gameText,
	simpleText,
	measure,
	measureUIText,
	measureText,
	textSprite,
	init
};
