import { mc } from "../characters";
import { DevModInterface } from "../Engine/modsystem";
import { QuestStep } from "../Engine/gameplay/quest";
import { EngineBus, getEngine } from "../Engine/engine";
import { Dialogue, DialogueChoice } from "../Engine/gameplay/dialogue";

export default function SmashorPassQuest() {
    const quest = DevModInterface.GAME.QUEST.createQuest(
        "Smash Or Pass",
        "Shut that infernal contraption up. No matter the cost!"
    );

    const step1 = new QuestStep("P1", "Phase One");
    const step2 = new QuestStep("P2_Smashed", "Ka-pow!", false);
    const step3 = new QuestStep(
        "P3_TurnedOff",
        "Tried to smash it once. Was an uncomfortable experience. Sticking to girls now.",
        false
    );

    step1.createOutcome(
        () => {
            const alarmClock = DevModInterface.GAME.ENT.bedroomAlarmClock;
            if (alarmClock && alarmClock.smashed) {
                return true;
            }
            return false;
        },
        "P2_Smashed",
        "Player smashed the alarm clock"
    );
    step2.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE");

    step1.createOutcome(
        () => {
            const alarmClock = DevModInterface.GAME.ENT.bedroomAlarmClock;
            if (alarmClock && alarmClock.turnedoff) {
                return true;
            }
            return false;
        },
        "P3_TurnedOff",
        "Player turned off alarm clock"
    );
    step3.createOutcome(() => {
        return true;
    }, "QUEST_COMPLETE");

    quest.addStep(step1, step2, step3);
    // quest.enableImmediately = true;

    const AlarmClockDialogue = new Dialogue(mc, "AlarmClockDialogue");

    AlarmClockDialogue.addDialogueLine("What should I do with this thing?");
    AlarmClockDialogue.addDialogueEventAction( () => {
        console.log("try home room!")
        EngineBus.emit(START_DIALOGUE, createEngineEvent(START_DIALOGUE, {
            dialogueId: "homeroomDialogueContinue"
        }))
    })

    const choiceone = new DialogueChoice(
        "AlarmClockDialogue",
        "Smash It",
        "AlarmClockDialogueSmashed",
        function () {
            const alarmClock = DevModInterface.GAME.ENT.bedroomAlarmClock;
            if (alarmClock) {
                alarmClock["smashed"] = true;
                alarmClock["smashed_combo"] = 1;
            }
        }
    );

    const AlarmClockDialogueSmashed = new Dialogue(
        mc,
        "AlarmClockDialogueSmashed"
    );
    AlarmClockDialogueSmashed.addDialogueLine(
        "%ANIMATE% vpunchpos LOCATION:Bedroom 450"
    );
    AlarmClockDialogueSmashed.addDialogueLine(
        "%ANIMATE% vpunchneg LOCATION:Bedroom 150"
    );
    AlarmClockDialogueSmashed.addDialogueLine("Ding-dong, the watch is dead!");
    AlarmClockDialogueSmashed.addDialogueLine(
        "Who knew a proper smashing would feel so good? The testosterone! The sheer power!"
    );
    AlarmClockDialogueSmashed.addDialogueLine("Ugh, I'm pathetic.");
    AlarmClockDialogueSmashed.addDialogueLine(
        "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"
    );

    //$quest.smash_or_pass.finish("smashed")

    // Dialouge for turning it off alarm clock
    const choicetwo = new DialogueChoice(
        "AlarmClockDialogue",
        "Turn It Off",
        "AlarmClockDialogueTurnOffed",
        function () {
            const alarmClock = DevModInterface.GAME.ENT.bedroomAlarmClock;
            if (alarmClock) {
                alarmClock["turnedoff"] = true;
                alarmClock["turnedoff_combo"] = 1;
            }
        }
    );

    const AlarmClockDialogueTurnOffed = new Dialogue(
        mc,
        "AlarmClockDialogueTurnOffed"
    );

    //$mc.intellect+=1
    AlarmClockDialogueTurnOffed.addDialogueLine(
        "Smashing it would've been nice, but at least I don't have to clean up the pieces now."
    );
    AlarmClockDialogueTurnOffed.addDialogueLine(
        "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"
    );
    //$quest.smash_or_pass.finish("turned_off")

    // Dialouge for leaving it alone
    const choicethree = new DialogueChoice(
        "AlarmClockDialogue",
        "Leave It",
        "AlarmClockDialogueLeaveIt"
    );

    const AlarmClockDialogueLeaveIt = new Dialogue(
        mc,
        "AlarmClockDialogueLeaveIt"
    );

    AlarmClockDialogueLeaveIt.addDialogueLine(
        "The melody of a better time. Might as well let it bump."
    );

    //Setting the dialouge
    AlarmClockDialogue.setChoices([choiceone, choicetwo, choicethree]);

    getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogue);
    getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueSmashed);
    getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueTurnOffed);
    getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueLeaveIt);
}
