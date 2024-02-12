import { UniqueIdsGenerator } from './util/UniqueIdGenerator';
import { QuestInterface } from './types/types';

export default class Quest implements QuestInterface {
  id: string;

  constructor(public name: string, public started: boolean, public stages: any, public preconditions: {} = {}) {
    this.id = UniqueIdsGenerator.generateTrueRandomString();
  }
}
