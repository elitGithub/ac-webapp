import { EngineBus, EngineSystem, IEngineEvent } from "../../engine";
import { ADVANCE_QUEST, AdvanceQuestEvent, START_QUEST, StartQuestEvent } from "./model/events";
import { Quest, QuestState } from "./quest";

export class QuestSystem implements EngineSystem {

    quests: Quest[];

    constructor() {
        EngineBus.on(START_QUEST, this.queue.bind(this));
        EngineBus.on(ADVANCE_QUEST, this.queue.bind(this));

        this.quests = [];
    }

    addQuest(...quest: Quest[]) {

    }

    setQuests(quests: Quest[]) {

    }

    startQuest(quest: string) {
        const q = this.quests.find(q => q.isQuest(quest));
        if (!q) {
            console.error(`Failed to start quest ${quest}. Please check if you have provided the correct quest id or title.`);
            return;
        }

        if (q.state !== QuestState.CAN_START) {
            return;
        }

        q.startQuest();
    }

    advanceQuest(quest: string, questStep: string) {
        const q = this.quests.find(q => q.isQuest(quest));
        if (!q) {
            console.error(`Failed to start quest ${quest}. Please check if you have provided the correct quest id or title.`);
            return;
        }

        let nextStep = questStep ? questStep : q.getCurrentQuestStep().nextStep;

        if (!nextStep) {
            q.completeQuest();
            return;
        }

        const nextQuestStep = q.getQuestStep(nextStep);
        if (!nextQuestStep) {
            console.error(`Failed to advance quest ${quest} to step ${nextStep}. Please check if you have provided the correct quest step id.`);
            return;
        }

        q.advanceQuestStep(nextStep);
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === START_QUEST) {
            const sq = engineEvent as StartQuestEvent;
        }
        else if (engineEvent.event === ADVANCE_QUEST) {
            const aq = engineEvent as AdvanceQuestEvent;
        }
    }

    update(time: number): void {
        
    }
    
}