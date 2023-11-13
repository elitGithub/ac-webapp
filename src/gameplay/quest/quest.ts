export enum QuestState {
    REQ_NOT_MET,
    CAN_START,
    IN_PROGRESS,
    ON_HOLD,
    CAN_FINISH,
    COMPLETED,
    FAILED,
}

export type QuestConditional = (...args: any[]) => boolean;

export class QuestStep {
    questStepId: string;
    description: string;
    mandatory: boolean;
    nextStep: string;

    objectives: QuestConditional[];

    constructor(questStepId: string, description: string) {
        this.questStepId = questStepId;
        this.description = description;
        this.nextStep = "";
        this.mandatory = false;
        this.objectives = [];
    }

    addObjective(...objective: QuestConditional[]) {

    }

    setObjectives(objectives: QuestConditional[]) {

    }

    completeStep() {

    }

    setNextStep(nextStepId: string) {
        this.nextStep = nextStepId;
    }
}

export class Quest {
    questId: string;
    title: string;
    description: string;
    state: QuestState;

    requirements: QuestConditional[];
    questSteps: QuestStep[];
    currentQuestStep: number;
    rewards: [];

    constructor (title: string, description: string, questId?: string) {
        if (!questId) {
            questId = `Quest_${title}`;
        }

        this.questId = questId;
        this.title = title;
        this.description = description;
        this.state = QuestState.REQ_NOT_MET;

        this.requirements = [];
        this.questSteps = [];
        this.currentQuestStep = 0;
        this.rewards = [];
    }

    beginQuest() {
        this.currentQuestStep = 0;
    }

    startQuest() {
        this.beginQuest();
    }

    advanceQuestStep(step?: string) {

    }

    completeQuest() {

    }
    
    failQuest() {

    }

    addRequirement(...requirement: QuestConditional[]) {

    }

    setRequirements(requirements: QuestConditional[]) {

    }

    addStep(...step: QuestStep[]) {

    }

    setSteps(steps: QuestStep[]) {

    }

    isQuest(questIdOrTitle: string) {
        if (this.questId === questIdOrTitle || this.title === questIdOrTitle) {
            return true;
        }

        return false;
    }

    canStartQuest() {
        return this.requirements.every(req => req());
    }

    getQuestStep(questStep: string): QuestStep | undefined {
        return this.questSteps.find(qs => qs.questStepId === questStep);
    }

    getCurrentQuestStep(): QuestStep {
        return this.questSteps[this.currentQuestStep];
    }
}