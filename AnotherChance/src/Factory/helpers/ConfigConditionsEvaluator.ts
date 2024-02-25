import { StateVariables } from "./types.ts";

export class ConfigConditionsEvaluator {
    constructor(private playerDecisions: any, private state: StateVariables) {
    }

    public evaluate(item: any): boolean {
        if (!('conditionType' in item)) {
            console.log(`Asset ${item.name} has no condition type!`);
            return false; // Early return if no conditionType is specified
        }

        switch (item.conditionType) {
            case 'simple':
                // Ensure conditions are in an array for uniform processing
                const conditionsArray = Array.isArray(item.conditions) ? item.conditions : [item.conditions];
                return this.evaluateConditionsArray(conditionsArray, item);
            case 'complex':
                return this.evaluateComplexConditions(item.conditions, item);
            default:
                return false; // Default case for unknown conditionType
        }
    }

    evaluateConditionsArray(conditions: Array<any>, item: any): boolean {
        if (conditions.length === 0) {
            return true; // No conditions means always show
        }

        for (const condition of conditions) {
            if (this.evaluateSingleCondition(condition)) {
                this.updateAssetProperties(item, condition);
                return true;
            }
        }
        return false;
    }

    evaluateSingleCondition(condition: any): boolean {
        // Check if 'needQuest' exists and log it
        if ('needQuest' in condition) {
            console.log(`Condition includes 'needQuest':`, condition);
            // TODO: add the checks for quests.
        }

        return Object.entries(condition).every(([key, value]) => {
            // Skip non-evaluation keys like 'src'
            if (['src', 'position', 'needQuest'].includes(key)) return true;

            let decisionValue = key in this.playerDecisions ? this.playerDecisions[key] : this.state[key];
            if (Array.isArray(value)) {
                return value.includes(decisionValue);
            } else {
                return decisionValue === value;
            }
        });
    }

    evaluateComplexConditions(conditions: Array<any>, item: any): boolean {
        // This assumes that complex conditions are already properly handled as an array
        for (const condition of conditions) {
            const isVisible = this.evaluateConditionsArray([condition], item); // Wrap condition in array for consistency
            if (isVisible) {
                return true; // The first matching condition updates the item and returns true
            }
        }
        return false; // If no conditions match
    }

    updateAssetProperties(item: any, condition: any) {
        if (condition.src) {
            item.src = condition.src;
        }
        if (condition.position) {
            item.position = condition.position;
        }
    }
}
