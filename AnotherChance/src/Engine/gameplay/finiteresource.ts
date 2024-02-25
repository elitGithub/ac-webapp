export class FiniteResource {
    private maxValue: number;
    private currentValue: number;

    constructor (maxValue: number) {
        this.maxValue = maxValue;
        this.currentValue = maxValue;
    }

    getCurrentValue() {
        return this.currentValue;
    }
    
    reset() {
        this.currentValue = this.maxValue;
    }

    setResource(value: number) {
        if (value > this.maxValue) {
            value = this.maxValue;
        }

        this.currentValue = value;
    }

    decrement(value: number) {
        this.currentValue -= Math.abs(value);
        if (this.currentValue < 0) {
            this.currentValue = 0;
        }
    }

    increment(value: number) {
        this.currentValue += Math.abs(value);
        if (this.currentValue > this.maxValue) {
            this.currentValue = this.maxValue;
        }
    }

    getMaxResource() {
        return this.maxValue;
    }
    
    setMaxResource(maxValue: number) {
        this.maxValue = maxValue;
        if (this.currentValue > maxValue) {
            this.currentValue = maxValue;
        }
    }
}