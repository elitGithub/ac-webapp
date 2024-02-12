import EventsManager from '../util/EventsManager';
import { QuestInterface } from '../types/types';

export default class QuestManager {
  private startedQuests: Map<string, QuestInterface> = new Map();
  private finishedQuests: Map<string, QuestInterface> = new Map();
  private allQuests: Map<string, QuestInterface> = new Map();

  constructor(private eventsManager: EventsManager) {
  }

  public addQuest(quest: QuestInterface) {
    this.allQuests.set(quest.id, quest);
  }

  public startQuest(quest: QuestInterface) {
    if (this.startedQuests.has(quest.id)) {
      return;
    }
    if (this.allQuests.has(quest.id)) {
      this.startedQuests.set(quest.id, quest);
    }
  }

  public finishQuest(quest: QuestInterface) {
    if (this.startedQuests.has(quest.id)) {
      this.startedQuests.delete(quest.id);
      this.finishedQuests.set(quest.id, quest);
    }
  }


}
