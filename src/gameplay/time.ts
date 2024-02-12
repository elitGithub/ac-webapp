export enum TimeProgression {
    REAL,
    SIMULATED,
    MANUAL,
}

export enum TimeHookPresets {
    HOURLY,
    DAILY
}

export type TimeHookHandler = (hour: number, minute: number) => void;

export interface TimeHookOptions {
    preset?: TimeHookPresets,
    hour?: number,
    minute?: number,
}

interface TimeHook {
    handler: TimeHookHandler,
    options: TimeHookOptions,
}

//Will it implement a system of some kind
export class Time {

    timeProgression: TimeProgression;
    time: Date;
    timeStarted: boolean;
    simulatedSensitivity: number; //How many in game hours should pass in one real hour.
    timeHooks: TimeHook[];

    constructor(timeProgression: TimeProgression, simulatedSensitivity?: number) {
        this.timeProgression = timeProgression;
        this.time = new Date();
        this.simulatedSensitivity = 0;
        this.timeStarted = false;
        this.timeHooks = [];
        switch (timeProgression) {
            case TimeProgression.REAL:
                break;
            case TimeProgression.SIMULATED:
                if (simulatedSensitivity) {
                    this.simulatedSensitivity = simulatedSensitivity <= 24 ? simulatedSensitivity : 24;
                }
                else {
                    this.simulatedSensitivity = 24;
                }
                break;
            case TimeProgression.MANUAL:
                break;
        }
    }

    start() {
        this.time.setDate(0);
        this.time.setTime(0);
        if (this.timeProgression === TimeProgression.SIMULATED) {
            this.timeStarted = true;
        }
    }

    advanceTime(hours: number, minutes?: number) {
        if (this.timeProgression === TimeProgression.MANUAL) {
            this.time.setHours(this.time.getHours()+hours, this.time.getMinutes()+(minutes??0));
        }
    }

    createTimeHook(handler: TimeHookHandler, options: TimeHookOptions) {
        const hook = {handler, options};
        this.timeHooks.push(hook);
    }

    removeTimeHook(handler: TimeHookHandler, options: TimeHookOptions) {
        this.timeHooks = this.timeHooks.filter(hook => {
            if (hook.handler !== handler ) {
                return true;
            }

            //Assume they want all instances of this handler removed
            if (!options) {
                return false; //removes it from filtered array
            }

            if (hook.options === options) {
                return false;
            }

            if (hook.options.preset !== undefined && (hook.options.preset === options.preset)) {
                return false;
            }

            if (hook.options.hour !== undefined && hook.options.minute !== undefined && (hook.options.hour === options.hour && hook.options.minute === options.minute)) {
                return false;
            }

            //Doesn't match the specific options so keep it in the array.
            return true;
        });
    }

    getDay() {
        if (this.timeProgression === TimeProgression.REAL) {
            return new Date(Date.now()).getDay();
        }

        return this.time.getDay();
    }

    getDayString() {
        const day = this.getDay();
        switch (day) {
            case 0: return "Sunday";
            case 1: return "Monday";
            case 2: return "Tuesday";
            case 3: return "Wednesday";
            case 4: return "Thursday";
            case 5: return "Friday";
            case 6: return "Saturday";
            default: return "Voiday";
        }
    }

    getHour() {
        if (this.timeProgression === TimeProgression.REAL) {
            return new Date(Date.now()).getHours();
        }
        return this.time.getHours();
    }

    getHourString() {
        const hour = this.getHour();
        if (hour < 10) {
            return `0${hour}`;
        }
        else {
            return hour.toString(10);
        }
    }

    getMinute() {
        if (this.timeProgression === TimeProgression.REAL) {
            return new Date(Date.now()).getMinutes();
        }
        return this.time.getMinutes();
    }

    getMinuteString() {
        const minute = this.getMinute();
        if (minute < 10) {
            return `0${minute}`;
        }
        else {
            return minute.toString(10);
        }
    }

    simulatedTimeUpdate(delta: DOMHighResTimeStamp) {
        if (this.timeStarted) {
            const timeFrac = 1 / this.simulatedSensitivity;
            const simulatedTime = delta / timeFrac;
            const hour = simulatedTime % ((24 * 60 * 60) * 1000);
            const minute = hour % ((60 * 60) * 1000);

            let newHour = false;
            let newDay = false;
            if (this.getHour() === 23 && hour === 0) {
                newDay = true;
                newHour = true;
            }
            else if (this.getHour() - hour === -1) {
                newHour = true;
            }

            this.time.setHours(hour, minute);
            
            for(let i = 0; i < this.timeHooks.length; i++) {
                const hook = this.timeHooks[i];
                if (newDay && hook.options.preset === TimeHookPresets.DAILY ||
                    newHour && hook.options.preset === TimeHookPresets.HOURLY ||
                    hook.options.hour !== undefined && hook.options.minute === undefined && hook.options.hour === hour ||
                    hook.options.minute !== undefined && hook.options.hour === undefined && hook.options.minute === minute ||
                    hook.options.hour !== undefined && hook.options.minute !== undefined && hook.options.hour === hour && hook.options.minute === minute) {
                    hook.handler(hour, minute);
                }
            }
        }
    }
}