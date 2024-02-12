import { EngineBus, IEngineEvent, createEngineEvent, getEngine } from "../../engine";
import { GameplaySystem } from "../gameplaysys";
import { ADVANCE_QUEST, AdvanceQuestEvent, QUEST_COMPLETED, QUEST_FAILED, QUEST_STARTED, QUEST_STEP_STARTED, QUEST_TRACKER_CHANGE, QuestTrackerChangeEvent, START_QUEST, StartQuestEvent } from "./model/events";
import { Quest, QuestState } from "./quest";
import { QuestHint } from "./questhint";
import { QuestListHud } from "./questlisthud";
import { QuestTrackerHud } from "./questtrackerhud";

export class QuestSystem extends GameplaySystem {

    quests: Map<string, Quest>;
    focusedQuest?: Quest;
    questHints: Map<string, QuestHint[]>;
    questTrackerHud: QuestTrackerHud;
    questListHud: QuestListHud;

    constructor(customTrackerHud?: QuestTrackerHud, customListHud?: QuestListHud) {
        super();
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
            this.updateQuestHints(quest.questId);
            this.questTrackerHud.setFocusedQuest(quest.title);
            this.questListHud.addItemToList(quest.title);
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

    advanceQuest(quest: string, forceAdvancement?: boolean, questStep?: string) {
        const q = this.quests.get(quest) ?? Array.from(this.quests.values()).find(q => q.isQuest(quest));
        if (!q) {
            console.error(`Failed to start quest ${quest}. Please check if you have provided the correct quest id or title.`);
            return;
        }

        let nextStep = questStep ? questStep : q.getCurrentQuestStep()?.finishedOutcome?.nextStep;

        if (!nextStep || nextStep === "QUEST_COMPLETE") {
            q.completeQuest();
            this.questCleanup(q);
            EngineBus.emit(QUEST_COMPLETED, createEngineEvent(QUEST_COMPLETED, { quest: q }));
            return;
        }

        if (nextStep === "QUEST_FAILED") {
            q.failQuest();
            this.questCleanup(q);
            EngineBus.emit(QUEST_FAILED, createEngineEvent(QUEST_FAILED, {quest: q}));
            return;
        }

        const nextQuestStep = q.getQuestStep(nextStep);
        if (!nextQuestStep) {
            console.error(`Failed to advance quest ${quest} to step ${nextStep}. Please check if you have provided the correct quest step id.`);
            return;
        }

        if (q.advanceQuestStep(forceAdvancement, nextStep)) {
            EngineBus.emit(QUEST_STEP_STARTED, createEngineEvent(QUEST_STEP_STARTED, { quest: q, step: q.getCurrentQuestStep() }));
        }
    }

    isQuestOngoing(quest: Quest) {
        return quest.state === QuestState.IN_PROGRESS || quest.state === QuestState.ON_HOLD
    }

    questCleanup(quest: Quest) {
        if (this.focusedQuest && this.focusedQuest.isQuest(quest.title)) {
            this.clearFocus();
            this.clearHintsFor(quest);
        }
        this.questListHud.removeItemFromList(quest.title);
    }

    getOngoingQuests() {
        return Array.from(this.quests.entries()).filter(([, q]) => this.isQuestOngoing(q));
    }
    
    findByTitle(title: string) {
        return Array.from(this.quests.values()).find(q => q.title === title);
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
                this.questHints.set(quest, hints);
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

    getQuestTrackerHud() {
        return this.questTrackerHud;
    }

    getQuestListHud() {
        return this.questListHud;
    }

    setFocus(quest: Quest) {
        this.questTrackerHud.setFocusedQuest(quest.title);
        this.updateQuestHints(quest.questId);
    }

    clearFocus() {
        this.questTrackerHud.setFocusedQuest("Off");
    }

    clearHintsFor(quest: Quest) {
        const hints = this.questHints.get(quest.questId);
        if (hints) {
            for (let i = 0; i < hints.length; i++) {
                hints[i].setHintEnabled(false);
            }
            
            this.questHints.set(quest.questId, []);
        }
    }
    
    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === START_QUEST) {
            const sq = engineEvent as StartQuestEvent;
            this.startQuest(sq.quest);
        }
        else if (engineEvent.event === ADVANCE_QUEST) {
            const aq = engineEvent as AdvanceQuestEvent;
            this.advanceQuest(aq.quest, aq.force, aq.step);
        }
        else if (engineEvent.event === QUEST_TRACKER_CHANGE) {
            const qt = engineEvent as QuestTrackerChangeEvent;
            const quest = this.findByTitle(qt.quest);
            if (quest) {
                this.setFocus(quest);
            }
        }
    }

    update(time: number): void {
        for (const q of this.quests.values()) {
            if (q.state === QuestState.REQ_NOT_MET && q.requirements.every(r => r.requirement())) {
                q.state = QuestState.CAN_START;
            }

            if (q.state === QuestState.IN_PROGRESS && !q.requirements.every(r => r.requirement())) {
                q.state = QuestState.ON_HOLD;
            }

            if (q.state === QuestState.ON_HOLD && q.requirements.every(r => r.requirement())) {
                q.state = QuestState.IN_PROGRESS;
            }

            if (q.state === QuestState.CAN_START && q.enableImmediately) {
                this.beginQuest(q);
            }

            if (q.state === QuestState.IN_PROGRESS) {
                if (q.tryFinishCurrentStep()) {
                    this.advanceQuest(q.questId);
                }
            }
        }
    }

}
