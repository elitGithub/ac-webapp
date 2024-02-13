import {
    EngineBus,
    createEngineEvent,
    getEngine,
} from "../../../../../src/engine";
import { Dialogue, DialogueSystem, START_DIALOGUE } from "../../../../../src/gameplay/dialogue";
import { WorldNPC } from "../../../../../src/gameplay/npc";
import { DevModInterface } from "../../../../../src/modsystem";
import MrslAsset from "../../../../assets/locations/school/homeroom/mrsl.webp";
import { mc } from "../../../characters";

const Mrsl = new WorldNPC("Mrsl", {
    source: MrslAsset,
});
Mrsl.addAction({
    action: "interact",
    handler: () => {
        // console.log("jo reading");
        // EngineBus.emit(
        //     START_DIALOGUE,
        //     createEngineEvent(START_DIALOGUE, {
        //         dialogueId: "JoKitchenQuestReading",
        //     })
        // );
        // getEngine().getGame().energy.decrement(10);
        DevModInterface.GAME.DIALOGUE.startDialogue("keyquest");
    },
});
Mrsl.setTransform(501, 411);

const keyquest = new Dialogue(mc, "keyquest");

keyquest.addDialogueLine(
    "Hi, [mc]! How can I help you today?",
    "How do I get the key to my locker?",
    "Since you're eighteen now, you'll have to sign a form at the [guard]'s booth.",
    "Oh, right. I totally forgot about that.",
    "Here's the permission slip for the [guard]."
)
keyquest.addDialogueEventAction( () => {
    DevModInterface.GAME.QUEST.startQuest("The Key");
})


getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(keyquest);

export default Mrsl;
