import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "../../engine";
import { ADVANCE_QUEST, AdvanceQuestEvent, QUEST_STARTED, QUEST_STEP_STARTED, QUEST_TRACKER_CHANGE, START_QUEST, StartQuestEvent } from "./model/events";
import { Quest, QuestState } from "./quest";

export class QuestSystem implements EngineSystem {

    quests: Map<string, Quest>;

    constructor() {
        EngineBus.on(START_QUEST, this.queue);
        EngineBus.on(ADVANCE_QUEST, this.queue);
        EngineBus.on(QUEST_TRACKER_CHANGE, this.queue);

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

    beginQuest(quest: Quest) {
        if (quest.startQuest()) {
            EngineBus.emit(QUEST_STARTED, createEngineEvent(QUEST_STARTED, {quest}));
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

        this.beginQuest(q);
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
        else if (engineEvent.event === QUEST_TRACKER_CHANGE) {
            
        }
    }

    update(time: number): void {
        for (const q of this.quests.values()) {
            if (q.state === QuestState.REQ_NOT_MET && q.requirements.every(r => r())) {
                q.state = QuestState.CAN_START;
            }

            if (q.state === QuestState.CAN_START && q.enableImmediately) {
                this.beginQuest(q);
            }
        }
    }
    
}
