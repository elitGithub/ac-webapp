import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent, getEngine } from "../../engine";
import { ADVANCE_QUEST, AdvanceQuestEvent, QUEST_STARTED, QUEST_STEP_STARTED, QUEST_TRACKER_CHANGE, QuestTrackerChangeEvent, START_QUEST, StartQuestEvent } from "./model/events";
import { Quest, QuestState } from "./quest";
import { QuestHint } from "./questhint";
import { QuestListHud } from "./questlisthud";
import { QuestTrackerHud } from "./questtrackerhud";

export class QuestSystem implements EngineSystem {

    quests: Map<string, Quest>;
    questHints: Map<string, QuestHint[]>;
    questTrackerHud: QuestTrackerHud;
    questListHud: QuestListHud;

    constructor(customTrackerHud?: QuestTrackerHud, customListHud?: QuestListHud) {
        EngineBus.on(START_QUEST, this.queue.bind(this));
        EngineBus.on(ADVANCE_QUEST, this.queue.bind(this));
        EngineBus.on(QUEST_TRACKER_CHANGE, this.queue.bind(this));

        this.quests = new Map<string, Quest>();
        this.questHints = new Map<string, QuestHint[]>();

        if (customTrackerHud) {
            this.questTrackerHud = customTrackerHud;
        }
        else {
            this.questTrackerHud = new QuestTrackerHud();
        }

        if (customListHud) {
            this.questListHud = customListHud;
        }
        else {
            this.questListHud = new QuestListHud();
        }

        getEngine().getHud().addElementToHud("HUD_QUESTTRACKER", this.questTrackerHud);
        getEngine().getHud().addElementToHud("HUD_QUESTLIST", this.questListHud);
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
            EngineBus.emit(QUEST_STARTED, createEngineEvent(QUEST_STARTED, { quest }));
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
        this.updateQuestHints(quest);
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
            EngineBus.emit(QUEST_STEP_STARTED, createEngineEvent(QUEST_STEP_STARTED, { quest: q, step: q.getCurrentQuestStep() }));
        }
    }

    isQuestOngoing(quest: Quest) {
        return quest.state === QuestState.IN_PROGRESS || quest.state === QuestState.ON_HOLD
    }

    getOngoingQuests() {
        return Array.from(this.quests.entries()).filter(([, q]) => this.isQuestOngoing(q));
    }

    updateQuestHints(quest: string) {
        const q = this.quests.get(quest)!;
        if (!this.isQuestOngoing(q)) {
            return;
        }
        const hintTargets = q.getCurrentQuestStep()?.targets;
        if (!this.questHints.has(quest)) {
            if (!hintTargets) {
                this.questHints.set(quest, []);
            }
            else {
                const hints = [];
                for (let i = 0; i < hintTargets.length; i++) {
                    const target = getEngine().resolve(hintTargets[i]);
                    if (target) {
                        hints.push(new QuestHint(target));
                    }
                    
                }
            }
        }
        else {
            const hints = this.questHints.get(quest)!;
            for (let i = 0; i < hints.length; i++) {
                if (hints[i].hintEnabled) {
                    hints[i].toggleHint();
                }
            }

            if (!hintTargets) {
                return;
            }

            for (let i = 0; i < hintTargets.length; i++) {
                const target = getEngine().resolve(hintTargets[i]);
                const hintForTarget = hints.find(qh => qh.target === target);
                if (hintForTarget && !hintForTarget.hintEnabled) {
                    hintForTarget.toggleHint();
                }
                else if (!hintForTarget) {
                    if (target) {
                        hints.push(new QuestHint(target));
                    }
                }
            }
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
            const qt = engineEvent as QuestTrackerChangeEvent;
            this.updateQuestHints(qt.quest);
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
