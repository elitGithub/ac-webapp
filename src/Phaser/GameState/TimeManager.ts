import EventsManager from '../util/EventsManager';

export class TimeManager {
  private day = 1;
  private daysSinceGameStart = 0;
  private hour = 7;
  private allowAdvance = true;

  constructor(private eventsManager: EventsManager) {
  }

  public init() {
    this.addListeners();
  }

  private moveDay() {
    this.day++;
  }

  public set currentDay(day: number) {
    this.day = day;
  }

  get currentTime() {
    const amPm = this.hour < 12 ? 'AM' : 'PM';
    // TODO: create a localization so it shows per user selection
    return `Day ${this.day} - ${this.hour}:00 ${amPm}`;
  }

  public addListeners() {
    this.eventsManager.on('move-time', () => {
      const newHour = this.hour++;
      if (newHour >= 23) {
        this.moveDay();
      }
    }, this);
  }
}
