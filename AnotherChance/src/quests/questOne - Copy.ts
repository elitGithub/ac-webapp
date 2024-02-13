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
import { mc } from "../characters";

export function SmashorPassQuest() {
	
	const quest = new Quest("Smash Or Pass", "Shut that infernal contraption up. No matter the cost!");
	
	const StepOne = new QuestStep("Smash Or Pass", "That vile beeping noise? That's nothing. Just ignore it...");
	const StepFinishSmashed = new QuestStep("Kapow!", "That vile beeping noise? That's nothing. Just ignore it...");
	const StepFinishTurnedOff = new QuestStep("Tried to smash it once. Was an uncomfortable experience!", "That vile beeping noise? That's nothing. Just ignore it...");
	
	const ObjectiveSmashed = new QuestObjective(
		false,
		function () {
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock && alarmClock.smashed) {
				return true;
			}
		},
	);

	const ObjectiveTurnedOff = new QuestObjective(
		false,
		function () {
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock && alarmClock.turnedoff) {
				return true;
			}
		},
	);

	quest.enableImmediately = true;

	// const mc = new BaseCharacter("mc");

	const QuestOneAlarmClockDialogue = new Dialogue(
		mc,
		"QuestOneAlarmClockDialogue",
	);

	QuestOneAlarmClockDialogue.addDialogueLine(
		"What should I do with this thing?",
	);

	const choiceone = new DialogueChoice(
		"QuestOneAlarmClockDialogue",
		"Smash It",
		"QuestOneAlarmClockDialogueSmashed",
		function () {
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			//queueNamedAnimate(getEngine().getScene().currentScene,'vpunch',250)
			if (alarmClock){
				//alarmClock.smashed = true;
				alarmClock['smashed'] = true; 
				alarmClock['smashed_combo'] = 1
			}
			}
	);

	const QuestOneAlarmClockDialogueSmashed = new Dialogue(
		mc,
		"QuestOneAlarmClockDialogueSmashed",
	);
	QuestOneAlarmClockDialogueSmashed.addDialogueLine("%ANIMATE% vpunchpos LOCATION:BedroomScene 450" )
	QuestOneAlarmClockDialogueSmashed.addDialogueLine("%ANIMATE% vpunchneg LOCATION:BedroomScene 150" )
	QuestOneAlarmClockDialogueSmashed.addDialogueLine("Ding-dong, the watch is dead!" )
	
	const choicetwo = new DialogueChoice(
		"QuestOneAlarmClockDialogue",
		"Turn It Off",
		"QuestOneAlarmClockDialogueTurnOffed",
	);

	const QuestOneAlarmClockDialogueTurnOffed = new Dialogue(
		mc,
		"QuestOneAlarmClockDialogueTurnOffed",
	);

	const choicethree = new DialogueChoice(
		"QuestOneAlarmClockDialogue",
		"Leave It",
		"QuestOneAlarmClockDialogueLeaveIt",
	);

	const QuestOneAlarmClockDialogueLeaveIt = new Dialogue(
		mc,
		"QuestOneAlarmClockDialogueLeaveIt",
	);

	QuestOneAlarmClockDialogue.setChoices([choiceone, choicetwo, choicethree]);

	getEngine().getGame().dialogueSys.addDialogue(QuestOneAlarmClockDialogue);
	getEngine().getGame().dialogueSys.addDialogue(QuestOneAlarmClockDialogueSmashed);
}
// "What should I do with this thing?"
// menu(side="middle"):
//   extend ""
//   "Smash it":
//     $home_bedroom["alarm"]="smashed"
//     $home_bedroom["alarm_smash_combo"]+=1
//     play sound "alarm_smash"
//     play music "home_theme"
//     if quest.smash_or_pass.in_progress:
//       $mc.strength+=1
//       $home_bedroom["alarm_smash_combo"] = 1
//       "Ding-dong, the watch is dead!" with vpunch
//       "Who knew a proper smashing would feel so good? The testosterone! The sheer power!"
//       "Ugh, I'm pathetic."
//       "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"
//       $quest.smash_or_pass.finish("smashed")
//   "Turn it off":
//     $home_bedroom["alarm"]="off"
//     play music "home_theme"
//     if quest.smash_or_pass.in_progress:
//       $mc.intellect+=1
//       $home_bedroom["alarm_smash_combo"] = -1
//       "Smashing it would've been nice, but at least I don't have to clean up the pieces now."
//       "There's no need to be up for several more hours. Why the hell did my alarm go off so early?"

//step one -  click alarm clock
//step 2 click door
//step 3 click dresser
//step 4 click door again
