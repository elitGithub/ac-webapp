import {
	QuestSystem,
	Quest,
	QuestStep,
	QuestState,
	QuestConditional,
	QuestObjective,
	ADVANCE_QUEST,
} from "../../../src/gameplay/quest";

import { Engine, EngineBus, createEngineEvent, getEngine } from "../../../src/engine";
import { BaseCharacter } from "../../../src/engine/coreentities/basecharacter";
import { Dialogue, DialogueChoice } from "../../../src/gameplay/dialogue";
import { queueNamedAnimate } from "../../../src/engine/rendereffects";
import { mc } from "../characters";

export function SmashorPassQuest() {
	
	const quest = new Quest("Smash Or Pass", "Shut that infernal contraption up. No matter the cost!");
	
	const StepOne = new QuestStep("Smash Or Pass", "That vile beeping noise? That's nothing. Just ignore it...");
	const StepFinishSmashed = new QuestStep("smashed", "Kapow!");
	const StepFinishTurnedOff = new QuestStep("turnedoff", "Tried to smash it once. Was an uncomfortable experience. Sticking to girls now.");
	
	const ObjectiveSmashed = new QuestObjective(
		true,
		function () {
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock && alarmClock.smashed) {
				return true;
			}
		},
	);

	const ObjectiveTurnedOff = new QuestObjective(
		true,
		function () {
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock && alarmClock.turnedoff) {
				return true;
			}
		},
	);

	quest.enableImmediately = true;
	quest.addStep(StepOne,StepFinishSmashed,StepFinishTurnedOff)
	StepFinishSmashed.addObjective(ObjectiveSmashed)
	StepFinishTurnedOff.addObjective(ObjectiveTurnedOff)
	//StepOne.setNextStep('StepFinishSmashed')

	// const mc = new BaseCharacter("mc");

	const AlarmClockDialogue = new Dialogue(
		mc,
		"AlarmClockDialogue",
	);

	AlarmClockDialogue.addDialogueLine(
		"What should I do with this thing?",
	);

	const choiceone = new DialogueChoice(
		"AlarmClockDialogue",
		"Smash It",
		"AlarmClockDialogueSmashed",
		function () {
			EngineBus.emit(ADVANCE_QUEST,createEngineEvent(ADVANCE_QUEST,{quest:'Smash Or Pass',step:'smashed'}))
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock){
				alarmClock['smashed'] = true; 
				alarmClock['smashed_combo'] = 1
			}
			EngineBus.emit(ADVANCE_QUEST,createEngineEvent(ADVANCE_QUEST,{quest:'Smash Or Pass'}))
			}
	);

	const AlarmClockDialogueSmashed = new Dialogue(
		mc,
		"AlarmClockDialogueSmashed",
	);
	AlarmClockDialogueSmashed.addDialogueLine("%ANIMATE% vpunchpos LOCATION:BedroomScene 450" )
	AlarmClockDialogueSmashed.addDialogueLine("%ANIMATE% vpunchneg LOCATION:BedroomScene 150" )
	AlarmClockDialogueSmashed.addDialogueLine("Ding-dong, the watch is dead!" )
	AlarmClockDialogueSmashed.addDialogueLine("Who knew a proper smashing would feel so good? The testosterone! The sheer power!")
	AlarmClockDialogueSmashed.addDialogueLine("Ugh, I'm pathetic.")
	AlarmClockDialogueSmashed.addDialogueLine("There's no need to be up for several more hours. Why the hell did my alarm go off so early?" )
	//$quest.smash_or_pass.finish("smashed")

	const choicetwo = new DialogueChoice(
		"AlarmClockDialogue",
		"Turn It Off",
		"AlarmClockDialogueTurnOffed",
		function () {
			EngineBus.emit(ADVANCE_QUEST,createEngineEvent(ADVANCE_QUEST,{quest:'Smash Or Pass',step:'turnedoff'}))
			const alarmClock = getEngine().resolve("ENTITY:bedroomAlarmClock");
			if (alarmClock){
				alarmClock['turnedoff'] = true; 
				alarmClock['turnedoff_combo'] = 1
			}
			EngineBus.emit(ADVANCE_QUEST,createEngineEvent(ADVANCE_QUEST,{quest:'Smash Or Pass'}))
		}
	);
	
	const AlarmClockDialogueTurnOffed = new Dialogue(
		mc,
		"AlarmClockDialogueTurnOffed",
	);

	//$mc.intellect+=1
	AlarmClockDialogueTurnOffed.addDialogueLine("Smashing it would've been nice, but at least I don't have to clean up the pieces now.")
	AlarmClockDialogueTurnOffed.addDialogueLine("There's no need to be up for several more hours. Why the hell did my alarm go off so early?")
	//$quest.smash_or_pass.finish("turned_off")

	const choicethree = new DialogueChoice(
		"AlarmClockDialogue",
		"Leave It",
		"AlarmClockDialogueLeaveIt",
	);

	const AlarmClockDialogueLeaveIt = new Dialogue(
		mc,
		"AlarmClockDialogueLeaveIt",
	);

	AlarmClockDialogueLeaveIt.addDialogueLine("The melody of a better time. Might as well let it bump." )

	AlarmClockDialogue.setChoices([choiceone, choicetwo, choicethree]);

	getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogue);
	getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueSmashed);
	getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueTurnOffed);
	getEngine().getGame().dialogueSys.addDialogue(AlarmClockDialogueLeaveIt);

	getEngine().getGame().questSys.addQuest(false, quest);
}
