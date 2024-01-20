import { EngineBus, createEngineEvent } from "../../engine";
import { HudElement, TOGGLE_HUD } from "../../engine/gui";

/**
 * NotificationHud
 * 
 * An abstract class used for creating hudelements with the ability to notify players regarding in game events.
 * Uses a queue to play notifications in order.
 * Classes inheriting this and used directly must create setters for manipulating each UI segment of their hud.
 */
export abstract class NotificationHud extends HudElement {

    notificationQueue: any[];
    constructor(name: string) {
        super(name);
        this.notificationQueue = [];
    }

    showNotification() {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, { hudname: this.name, force: true }));
    }

    hideNotification() {
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, { hudname: this.name, force: false }));
    }

    /**
     * showNextNotification
     * This function pulls the latest notification object in the queue and calls setter properties on the hud using the respective keys and values of the notification object.
     * @param hideIfNoNext If true, hides the hud if there is no more notifications in queue
     * @returns 
     */
    showNextNotification(hideIfNoNext: boolean) {
        const notif = this.notificationQueue.pop();
        if (!notif) {
            if (hideIfNoNext) {
                this.hideNotification();
            }
            return;
        }

        for (const [k,v] of Object.entries(notif)) {
            if (k in this) {
                this[k] = v;
            }
        }
        this.showNotification();
    }

    /**
     * queueNotification
     * Adds a notification object to the queue.
     * @param data An object consisting of keys with the name of their respective setter property and a values of what to set. e.g. {setterPropA: 123, setterPropB: "abc"}
     * @param autoShow If this is true, it will automatically show the first notification of the session and not necessarily this notification.
     */
    queueNotification(data: any, autoShow: boolean = true) {
        this.notificationQueue.unshift(data);
        if (autoShow && !this.visible) {
            this.showNextNotification(true);
        }
    }

    onPointerClick(event: any): void {
        super.onPointerClick(event);
        this.showNextNotification(true);
    }
}