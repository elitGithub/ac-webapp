export interface Character {
	name: string;
	schedule: CharSchedule[];
}

export interface CharSchedule {
	h: number[];
	location: string;
	activity: string;
}

// export interface ScriptAction {
// 	action: "sound" | "main_menu";
// 	name?: string;
// 	buttons?: { label: string; name: string }[];
// }

export interface MusicScriptAction {
	action: "music";
	name: string;
	loopTimestamp: number | undefined;
}

export interface MainMenuScriptAction {
	action: "main_menu";
	buttons?: { label: string; name: string }[];
}

export interface LocationScriptAction {
	action: "scene";
	location: string;
}

export type ScriptAction = MusicScriptAction | MainMenuScriptAction | LocationScriptAction;
export type ScriptLine = string | ScriptAction;

export interface Expr<T> {
	$e: string;
	values?: T[];
	else?: T[];
	or?: Expr<T>[],
	and?: Expr<T>[]
}

export interface Transcript {
	name?: string;
	script: ScriptLine[];
}

export interface LocationItem {
	name: string;
	coord: [number, number];
}

export interface GameItem {
	name: string;
	title: string;
	isInteractable: boolean;
}

export interface GameLocation {
	name: string;
	title: string;
	items: (LocationItem | Expr<LocationItem>)[];
	// TODO: Add item placements
}
