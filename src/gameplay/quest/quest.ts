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

export class QuestObjective {
    mandatory: boolean;
    isObjectiveComplete: QuestConditional;
    
    constructor(mandatory: boolean, objectiveCondition: QuestConditional) {
        this.mandatory = mandatory;
        this.isObjectiveComplete = objectiveCondition;
    }

    isMandatory() {
        return this.mandatory;
    }
}

export class QuestStep {
    questStepId: string;
    description: string;
    nextStep: string;

    targets?: string[];

    objectives: QuestObjective[];
    complete: boolean;

    constructor(questStepId: string, description: string) {
        this.questStepId = questStepId;
        this.description = description;
        this.nextStep = "";
        this.objectives = [];
        this.complete = false;
    }

    addObjective(...objective: QuestObjective[]) {
        this.objectives.push(...objective);
    }

    setObjectives(objectives: QuestObjective[]) {
        this.objectives = objectives;
    }

    setTarget(targets: string[]) {
        this.targets = targets;
    }

    completeStep(): boolean {
        let mandatoryMet = true;
        for (let i = 0; i < this.objectives.length; i++) {
            if (this.objectives[i].isMandatory() && !this.objectives[i].isObjectiveComplete()) {
                mandatoryMet = false;
                break;
            }
        }

        if (mandatoryMet) {
            this.complete = true;
            return true;
        }

        return false;
    }

    setNextStep(nextStepId: string) {
        this.nextStep = nextStepId;
    }
}

export class Quest {
    static priorityCounter = 0;
    questId: string;
    title: string;
    description: string;
    priority: number;

    enableImmediately: boolean;
    //questType: string;

    state: QuestState;

    requirements: QuestConditional[];
    questSteps: QuestStep[];
    currentQuestStep: string;
    rewards: [];

    constructor (title: string, description: string, questId?: string, priority?: number) {
        if (!questId) {
            questId = `${typeof this}_${title}`;
        }

        this.questId = questId;
        this.title = title;
        this.description = description;
        this.priority = priority ?? Quest.priorityCounter++;

        this.enableImmediately = false;

        this.state = QuestState.REQ_NOT_MET;

        this.requirements = [];
        this.questSteps = [];
        this.currentQuestStep = "";
        this.rewards = [];
    }

    beginQuest() {
        this.currentQuestStep = this.questSteps.find(qs => qs.questStepId.includes("_1_0"))?.questStepId ?? this.questSteps[0].questStepId;
        if (!this.currentQuestStep) {
            return false;
        }
        
        this.state = QuestState.IN_PROGRESS;

        return true;
    }

    startQuest(): boolean {
        const started = this.beginQuest();
        return started;
    }

    advanceQuestStep(step?: string): boolean {
        const currentStep = this.getCurrentQuestStep();
        if (!currentStep) {
            if (step) {
                this.currentQuestStep = step;
                return true;
            }
            return false;
        }

        if (currentStep.completeStep()) {
            this.currentQuestStep = step ?? currentStep.nextStep;
            return true;
        }

        return false;
    }

    completeQuest() {
        this.state = QuestState.COMPLETED;
        //InventorySys.addRewards
    }
    
    failQuest() {
        this.state = QuestState.FAILED;
    }

    addRequirement(...requirement: QuestConditional[]) {
        this.requirements.push(...requirement);
    }

    setRequirements(requirements: QuestConditional[]) {
        this.requirements = requirements;
    }

    addStep(...step: QuestStep[]) {
        this.questSteps.push(...step);
    }

    setSteps(steps: QuestStep[]) {
        this.questSteps = steps;
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

    getCurrentQuestStep(): QuestStep | undefined {
        return this.questSteps.find(qs => qs.questStepId === this.currentQuestStep);
    }
}