import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "../../engine";
import { ADVANCE_QUEST, AdvanceQuestEvent, QUEST_STARTED, QUEST_STEP_STARTED, START_QUEST, StartQuestEvent } from "./model/events";
import { Quest, QuestState } from "./quest";

export class QuestSystem implements EngineSystem {

    quests: Map<string, Quest>;

    constructor() {
        EngineBus.on(START_QUEST, this.queue.bind(this));
        EngineBus.on(ADVANCE_QUEST, this.queue.bind(this));

        this.quests = new Map<string, Quest>();
    }

    addQuest(replace: boolean = false, ...quest: Quest[]) {
        for (let i = 0; i < quest.length; i++) {
            if (this.quests.get(quest[i].questId)) {
                if (replace) {
                    this.quests.set(quest[i].questId, quest[i]);
                }
            }
            else {
                this.quests.set(quest[i].questId, quest[i]);
            }
        }
    }

    setQuests(quests: Quest[]) {
        this.quests.clear();
        for (let i = 0; i < quests.length; i++) {
            this.quests.set(quests[i].questId, quests[i]);
        }
    }

    startQuest(quest: string) {
        const q = this.quests.get(quest) ?? Array.from(this.quests.values()).find(q => q.isQuest(quest));
        if (!q) {
            console.error(`Failed to start quest ${quest}. Please check if you have provided the correct quest id or title.`);
            return;
        }

        if (q.state !== QuestState.CAN_START) {
            return;
        }

        if (q.startQuest()) {
            EngineBus.emit(QUEST_STARTED, createEngineEvent(QUEST_STARTED, {quest: q}));
        }
    }

    advanceQuest(quest: string, questStep?: string) {
        const q = this.quests.get(quest) ?? Array.from(this.quests.values()).find(q => q.isQuest(quest));
        if (!q) {
            console.error(`Failed to start quest ${quest}. Please check if you have provided the correct quest id or title.`);
            return;
        }

        let nextStep = questStep ? questStep : q.getCurrentQuestStep()?.nextStep;

        if (!nextStep) {
            q.completeQuest();
            return;
        }

        const nextQuestStep = q.getQuestStep(nextStep);
        if (!nextQuestStep) {
            console.error(`Failed to advance quest ${quest} to step ${nextStep}. Please check if you have provided the correct quest step id.`);
            return;
        }

        if (q.advanceQuestStep(nextStep)) {
            EngineBus.emit(QUEST_STEP_STARTED, createEngineEvent(QUEST_STEP_STARTED, {quest: q, step: q.getCurrentQuestStep()}));
        }
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === START_QUEST) {
            const sq = engineEvent as StartQuestEvent;
            this.startQuest(sq.quest);
        }
        else if (engineEvent.event === ADVANCE_QUEST) {
            const aq = engineEvent as AdvanceQuestEvent;
            this.advanceQuest(aq.quest, aq.step);
        }
    }

    update(time: number): void {
        
    }
    
}