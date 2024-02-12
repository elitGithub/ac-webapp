import { PhoneApp, PhoneContact, TextMessage } from '../types/types';
import EventsManager from '../util/EventsManager';
import { TimeManager } from './TimeManager';
import SceneFactory from '../SceneFactory';
import LayerManager from '../util/LayerManager';
import { SMS_HEADER_COLOR_HEX, WHITE_COLOR_HEX } from '../config';
import Conversation from '../util/Conversation';
import Character from './Character';

export default class PhoneManager {
    public phoneApps: PhoneApp[] = [];
    public messageHistory: Record<string, TextMessage[]> = {};
    public phoneContacts: PhoneContact[] = [];
    public image: Phaser.GameObjects.Image | undefined = undefined;
    conversations: Record<string, Conversation> = {};
    public phoneIsShowing: boolean = false;
    public smsAppBackgroundGradient = {
        topLeft: WHITE_COLOR_HEX,
        topRight: WHITE_COLOR_HEX,
        bottomLeft: WHITE_COLOR_HEX,
        bottomRight: WHITE_COLOR_HEX,
        alphaTopLeft: 1,
        alphaTopRight: 1,
        alphaBottomLeft: 1,
        alphaBottomRight: 1
    };

    public greenRectangle = {
        topLeft: SMS_HEADER_COLOR_HEX,
        topRight: SMS_HEADER_COLOR_HEX,
        bottomLeft: SMS_HEADER_COLOR_HEX,
        bottomRight: SMS_HEADER_COLOR_HEX,
        alphaTopLeft: 1,
        alphaTopRight: 1,
        alphaBottomLeft: 1,
        alphaBottomRight: 1
    };

    constructor(private eventsManager: EventsManager, private layerManager: LayerManager) {
    }

    phoneApp(app: string | PhoneApp): PhoneApp | undefined {
        const appId = typeof app === 'string' ? app : app.id;
        return this.phoneApps.find(a => a.id === appId);
    }

    installPhoneApp(app: PhoneApp, silent: boolean = false): void {
        this.phoneApps.push(app);
        console.log(`Installed app ${app.name}`);
        if (silent) return;
        this.eventsManager.emit('new-app-installed', app);
    }

    // Add a messagesHistory property
    public messagesHistory: {
        [contactId: string]: {
            messages: TextMessage[],
            lastViewed: number
        }
    } = {};


    uninstallPhoneApp(app: PhoneApp, silent: boolean): void {
        const index = this.phoneApps.findIndex(a => a.id === app.id);
        if (index !== -1) {
            this.phoneApps.splice(index, 1);
        }
        if (silent) return;

        this.eventsManager.emit('uninstalled-app', app);
    }

    public addMessageToConversation(withWhom: Character, sender: string = '', text: string, time: TimeManager, silent: boolean = false, isMultiParticipantConversation = false) {
        console.log(this.phoneContacts);
        const contact = this.phoneContacts.find(phoneContact => phoneContact.id === withWhom.stats.id);
        if (!contact) {
            return;
        }
        if (contact.id in this.conversations) {
            // existing conversation
        }
        if (!this.conversations[contact.id]) {
            this.conversations[contact.id] = new Conversation(contact, isMultiParticipantConversation, time.currentTime);
        }

        this.conversations[contact.id].addMessageToConversation(text, time.currentTime, sender.length < 1);

        if (!silent) {
            this.eventsManager.emit('new-text-message');
        }
    }

    addPhoneContact(contact: PhoneContact, silent = false): void {
        if (!this.phoneContacts.some(c => c.id === contact.id)) {
            this.phoneContacts.push(contact);
            console.log(`New contact ${contact.name}`);
            if (silent) return;
            this.eventsManager.emit('new-contact-added', { contact });
        }
    }

    public hidePhone(scene: SceneFactory) {
        if (this.image) {
            this.image.setVisible(false);
        }
        this.phoneIsShowing = false;
    }

    public showPhone(
        whichApp: string,
        width: number,
        height: number,
        scene: SceneFactory,
        callBack: () => void,
        duration: number = 1000
    ) {
        this.phoneContacts.forEach(contact => {
            contact.avatar = `${contact.name}_icon`;
            scene.load.image(`${contact.name}_icon`, `assets/characters/${contact.name}/contact_icon.webp`);
        });
        if (this.phoneIsShowing) {
            console.log('phone is showing!');
            return;
        }

        if (!this.phoneApp(whichApp)) {
            return;
        }
        if (!this.image) {
            this.image = scene.add.image(width, height, 'phone-background');
            this.image.setOrigin(2.9, 0);
            this.image.setDepth(this.layerManager.topMostLayer);
        } else {
            this.image.setVisible(true);
        }

        scene.tweens.add({
            targets: this.image,
            y: height - this.image.height - 35, // Final position
            duration, // Duration in milliseconds
            ease: 'Linear', // Easing function
            onComplete: callBack
        });

        this.phoneIsShowing = true;
    }
}
