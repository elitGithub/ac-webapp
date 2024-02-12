import { PhoneContact } from '../types/types';
import { UniqueIdsGenerator } from './UniqueIdGenerator';

export default class Conversation {
    public id: string;
    public messages: any[] = [];
    public replies: any[] = [];

    constructor(private contact: PhoneContact, private isMultiParticipant: boolean = false, public time: string = '') {
        this.id = UniqueIdsGenerator.generateTrueRandomString();
    }

    public addMessageToConversation(text: string, time: string, reply: boolean = false) {
        if (!reply) {
            this.messages.push({ who: this.contact.id, text, time });
        } else {
            this.messages.push({ who: 'player', text, time })
        }
        console.log(this.messages);
    }

    public addReply(text: string, time: string, toMessage: string) {
        this.replies.push({text, time, toMessage})
    }
}
