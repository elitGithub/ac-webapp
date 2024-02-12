export enum QuestState {
    REQ_NOT_MET,
    CAN_START,
    IN_PROGRESS,
    ON_HOLD,
    CAN_FINISH,
    COMPLETED,
    FAILED,
}

/**
 * QuestConditional
 * A function that will return true or false based on the condition inside.
 */
export type QuestConditional = (...args: any[]) => boolean | undefined;

export class QuestStepOutcome {
    description?: string;
    outcomeCondition: QuestConditional;
    onOutcome?: Function;
    nextStep: string;

    /**
     * 
     * @param outcomeCondition The condition which will determine that this outcome has been reached.
     * @param nextStep The next step in the quest to be progressed to when this outcome has been reached.
     * @param description 
     * @param postOutcome A function to be executed when this outcome has been reached.
     */
    constructor(outcomeCondition: QuestConditional, nextStep: string, description?: string, postOutcome?: Function) {
        this.outcomeCondition = outcomeCondition;
        this.onOutcome = postOutcome;
        this.nextStep = nextStep;
        this.description = description;
    }
}

export class QuestStep {
    questStepId: string;
    description: string;

    targets?: string[];

    silence: boolean;

    outcomes: QuestStepOutcome[];
    finishedOutcome?: QuestStepOutcome;
    finished: boolean;

    constructor(questStepId: string, description: string, silence?: boolean) {
        this.questStepId = questStepId;
        this.description = description;
        this.outcomes = [];
        this.finished = false;
        this.silence = silence ?? true;
    }

    addOutcome(outcome: QuestStepOutcome) {
        this.outcomes.push(outcome);
    }

    createOutcome(condition: QuestConditional, nextStep: string, description?: string) {
        this.outcomes.push(new QuestStepOutcome(condition, nextStep, description));
    }

    removeOutcome(description: string) {
        this.outcomes = this.outcomes.filter(outcome => outcome.description !== description);
    }

    getOutcomes() {
        return this.outcomes;
    }

    getOutcome(description: string) {
        return this.outcomes.find(outcome => outcome.description === description);
    }

    finishStep(outcome: QuestStepOutcome) {
        this.finishedOutcome = outcome;
        this.finished = true;
        if (outcome.onOutcome) {
            outcome.onOutcome();
        }
    }

    setTarget(targets: string[]) {
        this.targets = targets;
    }

    tryFinish(): boolean {
        if (this.finished) {
            return true;
        }

        if (this.outcomes.length === 0) {
            return true;
        }

        for (let i = 0; i < this.outcomes.length; i++) {
            if (this.outcomes[i].outcomeCondition()) {
                this.finishStep(this.outcomes[i]);
                return true;
            }
        }

        return false;
    }
}

export class QuestRequirement {
    requirement: QuestConditional;
    description: string;

    constructor(description: string, requirement: QuestConditional) {
        this.requirement = requirement;
        this.description = description;
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

    requirements: QuestRequirement[];
    questSteps: QuestStep[];
    currentQuestStep: string;
    rewards: [];

    constructor (title: string, description: string, questId?: string, priority?: number) {
        if (!questId) {
            questId = `${this.constructor.name}_${title}`;
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

    advanceQuestStep(force?: boolean, step?: string): boolean {
        const currentStep = this.getCurrentQuestStep();
        if (!currentStep) {
            if (step) {
                this.currentQuestStep = step;
                return true;
            }
            return false;
        }

        if (force || currentStep.tryFinish()) {
            let nextStep = step ?? currentStep.finishedOutcome?.nextStep;
            if (!nextStep) {
                nextStep = currentStep.outcomes[0].nextStep;
            }
            
            if (nextStep) {
                this.currentQuestStep = nextStep;
                return true;
            }
        }

        console.error(`advanceQuestStep(${force}, ${step}): No available next step`);
        return false;
    }

    tryFinishCurrentStep() {
        if (this.state !== QuestState.IN_PROGRESS) {
            return false;
        }

        return this.getCurrentQuestStep()?.tryFinish();
    }

    completeQuest() {
        this.state = QuestState.COMPLETED;
        //InventorySys.addRewards
    }
    
    failQuest() {
        this.state = QuestState.FAILED;
    }

    addRequirement(...requirement: QuestRequirement[]) {
        this.requirements.push(...requirement);
    }

    setRequirements(requirements: QuestRequirement[]) {
        this.requirements = requirements;
    }

    getFailingRequirement() {
        return this.requirements.find(req => !req.requirement());
    }

    addStep(...step: QuestStep[]) {
        this.questSteps.push(...step);
    }

    setSteps(steps: QuestStep[]) {
        this.questSteps = steps;
    }

    createStep(stepId: string, description: string, silent: boolean) {
        const step = new QuestStep(stepId, description, silent);
        this.addStep(step);
        return step;
    }

    isQuest(questIdOrTitle: string) {
        if (this.questId === questIdOrTitle || this.title === questIdOrTitle) {
            return true;
        }

        return false;
    }

    canStartQuest() {
        return this.requirements.every(req => req.requirement());
    }

    getQuestStep(questStep: string): QuestStep | undefined {
        return this.questSteps.find(qs => qs.questStepId === questStep);
    }

    getCurrentQuestStep(): QuestStep | undefined {
        return this.questSteps.find(qs => qs.questStepId === this.currentQuestStep);
    }
}