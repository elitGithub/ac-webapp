import { getEngine } from "../Engine/engine";
import { Dialogue } from "../Engine/gameplay/dialogue";

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
