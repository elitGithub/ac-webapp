import { getEngine } from "../../../src/engine";
import { Dialogue, DialogueSystem } from "../../../src/gameplay/dialogue";
import { NPC } from "../../../src/gameplay/npc";
import { DevModInterface } from "../../../src/modsystem";

export default function Character() {
    const Jo = new NPC("Jo");
    Jo.addNamedBodyPartOverride("body1", {x: 110, y: 124});
    Jo.addNamedBodyPartOverride("face_confident", {x: 226, y: 239});
    Jo.addNamedBodyPartOverride("b1arm2_n", {x: 37, y: 245});
    Jo.addPose("confident", (npc: NPC) => {
        npc.changeBody(1);
        npc.changeExpression("face_confident");
        npc.setArms("b1arm2_n");
    });

    const testDialogue = new Dialogue(Jo, "test_dialogue");
    testDialogue.addDialogueLine("%POSE% confident", "Hey hawt stuff.", "%EXPRESSION% face_flirty", "Want to come to bed tonight?");
    testDialogue.addChoice("Yes");
    testDialogue.addChoice("No");
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(testDialogue);

    console.log("yerevan");
}