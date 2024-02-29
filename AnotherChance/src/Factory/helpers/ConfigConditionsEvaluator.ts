import { StateVariables } from "./types.ts";

export class ConfigConditionsEvaluator {
    constructor(private playerDecisions: any, private state: StateVariables) {}

    public evaluate(item: any): boolean {
        if (!('conditionType' in item)) {
            console.log(`Asset ${item.name} has no condition type!`);
            return false; // Early return if no conditionType is specified
        }

        switch (item.conditionType) {
            case 'simple':
                return this.evaluateSimpleConditions(item.conditions, item);
            case 'complex':
                return this.evaluateComplexConditions(item.conditions, item);
            default:
                return false; // Default case for unknown conditionType
        }
    }

    private evaluateSimpleConditions(conditions: any, item: any): boolean {
        if (Array.isArray(conditions)) {
            for (const condition of conditions) {
                if (this.evaluateSingleCondition(condition)) {
                    this.updateAssetProperties(item, condition);
                    return true;
                }
            }
        } else {
            if (this.evaluateSingleCondition(conditions)) {
                this.updateAssetProperties(item, conditions);
                return true;
            }
        }
        return false;
    }

    private evaluateComplexConditions(conditions: any[], item: any): boolean {
        for (const condition of conditions) {
            if (this.evaluateComplexCondition(condition)) {
                this.updateAssetProperties(item, condition);
                return true;
            }
        }
        return false;
    }

    private evaluateComplexCondition(condition: any): boolean {
        if (condition.needQuest) {
            // Placeholder: replace with actual quest checking logic
            const questName = false; //condition.questNames.find(questName => QuestSystem.isActiveQuest(questName));
            if (!questName /*|| !condition.questIn.includes(QuestSystem.getCurrentStep(questName))*/) {
                return false;
            }
        }

        return condition.stateVariables.every((stateCondition: any) =>
            this.evaluateStateCondition(stateCondition)
        );
    }

    private evaluateSingleCondition(condition: any): boolean {
        return Object.entries(condition).every(([key, value]) => {
            if (['src', 'position', 'needQuest', 'questNames', 'questIn'].includes(key)) return true;
            return this.evaluateStateCondition({ [key]: value });
        });
    }

    private evaluateStateCondition(condition: any): boolean {
        return Object.entries(condition).every(([key, value]) => {
            const decisionValue = this.playerDecisions[key] !== undefined ? this.playerDecisions[key] : this.state[key];
            return this.compareValueAndDecision(value, decisionValue);
        });
    }

    private compareValueAndDecision(value: any, decisionValue: any): boolean {
        if (Array.isArray(value)) {
            return value.includes(decisionValue) || value.some(val => typeof val === 'object' ? this.compareComplexValue(decisionValue, val) : decisionValue === val);
        } else if (typeof value === 'object' && value !== null) {
            return this.compareComplexValue(decisionValue, value);
        } else {
            return decisionValue === value;
        }
    }

    private compareComplexValue(decisionValue: any, conditionValue: any): boolean {
        if (typeof conditionValue === 'object' && conditionValue !== null) {
            return Object.entries(conditionValue).every(([condKey, condVal]) => {
                return decisionValue[condKey] === condVal;
            });
        } else {
            return decisionValue === conditionValue;
        }
    }

    private updateAssetProperties(item: any, condition: any) {
        if (condition.src) {
            item.src = condition.src;
        }
        if (condition.position) {
            item.position = condition.position;
        }
    }
}
