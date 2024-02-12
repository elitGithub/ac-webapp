import { StateObject } from './types/types';
import PhoneManager from './GameState/PhoneManager';
import { TimeManager } from './GameState/TimeManager';
import PlayerManager from './GameState/PlayerManager';
import EventsManager from './util/EventsManager';
import { UniqueIdsGenerator } from './util/UniqueIdGenerator';
import LayerManager from './util/LayerManager';
import QuestManager from './GameState/QuestManager';
import XrayManager from './GameState/XrayManager';

export default class StateMachine {
  private states: StateObject;
  private id;
  private static instance: StateMachine | undefined;

  private constructor() {
    this.id = UniqueIdsGenerator.generateTrueRandomString();
    this.states = {
      time: new TimeManager(EventsManager.getInstance()),
      phone: new PhoneManager(EventsManager.getInstance(), LayerManager.getInstance()),
      player: new PlayerManager(EventsManager.getInstance()),
      quest: new QuestManager(EventsManager.getInstance()),
      xRay: new XrayManager(EventsManager.getInstance())
    };
  }

  public static getInstance() {
    if (!(StateMachine.instance instanceof StateMachine) || typeof StateMachine.instance === 'undefined') {
      StateMachine.instance = new StateMachine();
    }
    return StateMachine.instance;
  }

  get state() {
    return this.states;
  }

  addState(name: string, stateInstance: PlayerManager | PhoneManager | TimeManager | any) {
    if (this.states.hasOwnProperty(name)) {
      return;
    }

    this.states[name] = stateInstance;
    console.log(this.states);
  }

  private loadState(id: string) {
    this.id = id;
    const savedState = localStorage.getItem('saved-state');
    if (!savedState) {
      return;
    }

    const parsedState = JSON.parse(savedState);

    if (parsedState.has(this.id)) {
      this.states = parsedState[this.id];
      return;
    }
  }
}
