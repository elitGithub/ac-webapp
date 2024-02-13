import {
	QuestSystem,
	Quest,
	QuestStep,
	QuestState,
	QuestConditional,
	QuestObjective,
} from "../../../src/gameplay/quest";

import { EngineBus, getEngine } from "../../../src/engine";
import { BaseCharacter } from "../../../src/engine/coreentities/basecharacter";
import { Dialogue, DialogueChoice } from "../../../src/gameplay/dialogue";
import { queueNamedAnimate } from "../../../src/engine/rendereffects";

export function BedroomBedDial() {

const mc = getEngine().resolve("ENTITY:mc");

const BedDefaultDial = new Dialogue(
    mc,
    "BedDefaultDial",
);

BedDefaultDial.addDialogueLine(
    "Before interacted with alarm clock",
);

const BedDial2 = new Dialogue(
    mc,
    "BedDial2",
);

BedDial2.addDialogueLine(
    "after interacted with alarm clock",
);

const DoorSmashOrPass = new Dialogue(
    mc,
    "DoorSmashOrPass",
);

DoorSmashOrPass.addDialogueLine(
    "can't leave now.",
);


getEngine().getGame().dialogueSys.addDialogue(BedDefaultDial);
getEngine().getGame().dialogueSys.addDialogue(BedDial2);
getEngine().getGame().dialogueSys.addDialogue(DoorSmashOrPass);

}