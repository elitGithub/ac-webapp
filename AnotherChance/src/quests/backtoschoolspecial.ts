import { EngineBus, createEngineEvent, getEngine } from "../../../src/engine";
import { BaseCharacter } from "../../../src/engine/coreentities/basecharacter";
import { Dialogue, START_DIALOGUE } from "../../../src/gameplay/dialogue";
import { QuestStep } from "../../../src/gameplay/quest";
import { DevModInterface } from "../../../src/modsystem";
import { mc } from "../characters";

export default function Quest() {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Back to School Special",
        "Time to face those demons. And teachers. And everyone else at school. Again."
    );
    const step1 = new QuestStep("QuestStep1", "Phase One");
    const step2 = new QuestStep(
        "talk to jo",
        "There's only one front door. It's right next to those jars with stuffed animals. Yeah, the toad and the Chernobyl bunny."
    );
    const step3 = new QuestStep(
        "talk to flora",
        "There's only one front door. It's right next to those jars with stuffed animals. Yeah, the toad and the Chernobyl bunny."
    );
    const step4 = new QuestStep(
        "ready_to_leave",
        "There's only one front door. It's right next to those jars with stuffed animals. Yeah, the toad and the Chernobyl bunny."
    );
    const step5 = new QuestStep("done", "New Year, new me.", false);

    step1.createOutcome(() => {
        const loc = DevModInterface.GAME.LOCATION.CURRENT?.name;
        if (loc && loc === "Kitchen") {
            return true;
        }
        return false;
    }, "talk to jo");

    step2.createOutcome(() => {
        // const JoReadingDone = DevModInterface.GAME.CHARACTER["Jo"];
        const joreading = DevModInterface.GAME.ENT["world_Jo_Reading"];
        const florasitting = DevModInterface.GAME.ENT["world_flora_sitting"];

        if (joreading) {
            joreading.visible = false;
            florasitting.visible = true;
            return true;
        }

        return false;
    }, "talk to flora");

    step3.createOutcome(() => {
        const florasitting = DevModInterface.GAME.ENT["world_flora_sitting"];

        if (florasitting && florasitting["flora_sitting_done"]) {
            florasitting.visible = false;
            console.log("going to ready to leave quest!")
            return true;
        }
        return false;
    }, "ready_to_leave");

    step4.createOutcome(() => {
        const kitchendoor = DevModInterface.GAME.ENT["kitchen_door"];
        if (kitchendoor && kitchendoor["ready_to_leave"]) {
            return true;
        }

        return false;
    }, "done");

    step5.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE");

    quest.addStep(step1, step2, step3, step4, step5);

    // Make sure this is only set after steps have been added.
    quest.enableImmediately = true;

    const florab2schoolspecial = new Dialogue(mc, "florab2schoolspecial");
    florab2schoolspecial.addDialogueLine(
        "In a way, it's nice to see [flora] so animated. After our fight at the end of senior year, she stopped talking to me."
    );
    florab2schoolspecial.addDialogueLine(
        "What? Since last night? Someone made a lot of noise again. What were you even doing up that late?"
    );
    florab2schoolspecial.addDialogueLine(
        "She seems entirely unaware. It must just be me, then."
    );
    florab2schoolspecial.addDialogueLine(
        "Well, if you're interested, it still contains a few pieces of dried-up crust. In case I get hungry."
    );
    florab2schoolspecial.addDialogueLine(
        "Figuring out time travel will just have to take a backseat for now. Got to get to school on time."
    );
    florab2schoolspecial.addDialogueEventAction(() => {
        DevModInterface.GAME.ENT['world_flora_sitting']['flora_sitting_done'] = true;
    })

    const readyToLeaveDialogue = new Dialogue(mc, "rreadyToLeaveDialogueead");
    readyToLeaveDialogue.addDialogueEventAction(() => {
        DevModInterface.GAME.ENT['kitchen_door']['ready_to_leave'] = true;
    }, true)

    readyToLeaveDialogue.addDialogueLine(
        "Whatever awaits me on the other side, I've already been through before."
    );
    readyToLeaveDialogue.addDialogueLine(
        "With some luck, it won't be nearly as bad."
    );
    readyToLeaveDialogue.addDialogueEventAction(() => {
    EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {
        dialogueId: "day1take2startdialogue"
    }))
    })

    // readyToLeaveDialogue.addDialogueLine("%ACTION% GOTO Entrance");

    getEngine().getGame().dialogueSys.addDialogue(florab2schoolspecial);
    getEngine().getGame().dialogueSys.addDialogue(readyToLeaveDialogue);
}
