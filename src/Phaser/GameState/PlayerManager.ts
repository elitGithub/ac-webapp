import EventsManager from '../util/EventsManager';
import { Attributes, Location, MainAttributes } from '../types/types';

export default class PlayerManager {
  private energy: number = 100;
  private money: number = 69;
  private attributes: MainAttributes = {
    intellect: 1,
    strength: 1,
    charisma: 1,
  };
  private location: Location = 'bedroom';
  constructor(private eventsManager: EventsManager) {
  }

  public init() {
    this.addListeners();
  }

  private addListeners() {
    this.eventsManager.on('action', (newEnergy: number) => {
      this.energy = this.energy - newEnergy;
      if (this.energy <= 0) {
        this.eventsManager.emit('move-time');
        // reset
        this.energy = 100;
      }
    }, this);

    this.eventsManager.on('add-attr', (attr: Attributes, value: number) => this.attributes[attr] += value, this);
    this.eventsManager.on('add-money', (amount: number) => this.money += amount, this);
    this.eventsManager.on('move-location', (location: Location) => this.location = location, this);
  }
}
