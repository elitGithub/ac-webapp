import EventsManager from '../util/EventsManager';
import { BaseCharacter } from '../types/types';

export default class Character {
  constructor(private eventsManager: EventsManager, public characterConfig: Record<keyof BaseCharacter, any>) {
  }

  setStat(key: keyof BaseCharacter, value: BaseCharacter[keyof BaseCharacter]) {
    this.characterConfig[key] = value;
  }

  public get stats() {
    return this.characterConfig;
  }

  generatePhoneNumber() {
    const prefix = '+63';
    if (this.stats.phone_no.length < 1) {
      let numbers = '';
      for (let i = 0; i < 10; i++) {
        const num = Math.floor(Math.random() * 10);
        if (i === 0 || i === 3 || i === 6) {
          numbers += ' ';

        }
        numbers += num;
      }
      this.setStat('phone_no', `${prefix}${numbers}`);
    }
  }
}
