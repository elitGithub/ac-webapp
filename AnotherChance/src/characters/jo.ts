import { getEngine } from "../Engine/engine";
import { Dialogue, DialogueSystem } from "../Engine/gameplay/dialogue";
import { NPC } from "../Engine/gameplay/npc";
import { DevModInterface } from "../Engine/modsystem";

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
    testDialogue.addChoice("Yes", false);
    const choiceNo = testDialogue.addChoice("No");
    console.log(choiceNo);
    // choiceNo.addIcon({source: JO_AVATAR}, IconShape.CIRCLE, 100);
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(testDialogue);

    console.log("yerevan", Jo);

    // const joreading = new NPC("Jos", "../../assets");
    // joreading.setDefaultPosition(104, 131);
    // joreading.addBodyPartOverride("face_confident", { x: 192, y: 217 });
    // joreading.addPose("confident", function (npc: NPC) {
    //     npc.changeExpression("face_confident");
    //     npc.changeBody(1);
    //     npc.setArms('b2arm')
    // });
    const JoKitchenQuestReading = new Dialogue(
        Jo,
        "JoKitchenQuestReading"
    );

    JoKitchenQuestReading.addDialogueLine(
        "%POSE% neutral",
        "Jo Bedroom Before Quest line 1",
        "%EXPRESSION% neutral",
        "Jo Bedroom Before Quest line 2",
        "%ANIMATE% ENTITY:Jo 500",
        "%EXPRESSION% neutral",
        "Jo Bedroom Before Quest line 3",
        "Whoa... even [jo] looks different. Younger, happier, and less resentful toward me.",
        "What's wrong? You look like you've seen a ghost!",
        "Well if you're down here now, you'll make it to the bus. Tell [flora] I said goodbye, okay?",
        "Did she say that [flora] is here? It's been years since we last spoke."
    );
    JoKitchenQuestReading.addDialogueEventAction(() => {
        // @ts-ignore
        DevModInterface.GAME.ENT['world_Jo_Reading'] = true;
    })

    console.log("should go to next quest");

    // const MCBedroomBeforeQuest = new Dialogue(
    //     DevModInterface.GAME.CHARACTER.mc,
    //     "MCBedroomBeforeQuest"
    // );

    // MCBedroomBeforeQuest.addDialogueLine("MC Bedroom Before Quest");
    getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(JoKitchenQuestReading);
    // getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(testMCBedroomBeforeQuestDialogue);
    // getEngine().getGame().dialogueSys.addDialogue(JoKitchenQuestReading);
    // getEngine().getGame().dialogueSys.addDialogue(MCBedroomBeforeQuest);
}
