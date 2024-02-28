import { getEngine } from "./Engine/engine";
import { Dialogue } from "./Engine/gameplay/dialogue";
import { BodyPart, NPC } from "./Engine/gameplay/npc";
import { DevModInterface } from "./Engine/modsystem";

export default function SmashorPassQuest() {

    const isabelle = new NPC("Isabelle");
    isabelle.setDefaultPosition(104,131);
    isabelle.addNamedBodyPartOverride("body1", {x: 110, y: 124});
    isabelle.addBodyPartOverride(BodyPart.FACE,{x: 192, y: 217})
    isabelle.addPose('confident',function(npc:NPC){
        npc.changeExpression('face_confident')
        // npc.changeBody(1)
        // npc.setArms('b2arm')
    })
    console.log(isabelle)
const IsabelleBedroomBeforeQuest = new Dialogue(
    isabelle,
    "IsabelleBedroomBeforeQuest",
);



IsabelleBedroomBeforeQuest.addDialogueLine(
    "%POSE% confident",
    "Isabelle Bedroom Before Quest line 1",
    "%EXPRESSION% face_skeptical",
    "Isabelle Bedroom Before Quest line 2",
    "%ANIMATE% slide_1250 ENTITY:Isabelle 500" ,
    "%EXPRESSION% face_skeptical_left",
    "Isabelle Bedroom Before Quest line 3"
);

const MCBedroomBeforeQuest = new Dialogue(
    DevModInterface.GAME.CHARACTER.mc,
    "MCBedroomBeforeQuest",
);

MCBedroomBeforeQuest.addDialogueLine(
    "MC Bedroom Before Quest"
);


getEngine().getGame().dialogueSys.addDialogue(IsabelleBedroomBeforeQuest);
getEngine().getGame().dialogueSys.addDialogue(MCBedroomBeforeQuest);

}
