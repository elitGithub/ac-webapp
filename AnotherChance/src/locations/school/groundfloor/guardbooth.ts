import Asset from "../../../../assets/locations/school/ground_floor/guard_booth.webp";
import {
    getEngine,
} from "../../../Engine/engine";
import { Dialogue, DialogueSystem } from "../../../Engine/gameplay/dialogue";
import { DevModInterface } from "../../../Engine/modsystem";
import { mc } from "../../../characters";

const GuardBoot = await getEngine().createSimpleInteractable(
    "guard_boot",
    {
        action: "interact",
        handler: () => {
            console.log(DevModInterface.GAME.QUEST.getQuest("The Key"))
            DevModInterface.GAME.DIALOGUE.startDialogue("guardkey");
        },
    },
    { source: Asset }
);
GuardBoot.setTransform(1140, 480);


const guardkey = new Dialogue(mc, "guardkey");

guardkey.addDialogueLine(
    "Hi, I'd like to pick up my locker key.",
    "Did you get the permission slip from your homeroom teacher?",
)
guardkey.addChoice("Yes!", "yesdialogue");
guardkey.addChoice("No.", "nodialogue");

const nodialogue = new Dialogue(mc, "nodialogue");
nodialogue.addDialogueLine(
    "No.",
    "A senior who doesn't know how things work around here?",
    "I've got my eye on you."
)

const yesdialogue = new Dialogue(mc, "yesdialogue");
yesdialogue.addDialogueEventAction(() => {
    // This should be disabled!
}, true)
yesdialogue.addDialogueLine(
    "Yes!",
    "...",
    "Please, sign here."
);

yesdialogue.addDialogueEventAction( () => {
    mc["locker_key"] = true;
    // DevModInterface.GAME.QUEST.getQuest("The Key")?.completeQuest();
    DevModInterface.GAME.QUEST.getQuest("The Key")?.advanceQuestStep(true, "done")
})


getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(guardkey);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(yesdialogue);
getEngine().getGame().getGameSystem<DialogueSystem>("SYS_DIALOGUE")!.addDialogue(nodialogue);

export default GuardBoot;
