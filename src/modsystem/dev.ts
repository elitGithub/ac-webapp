import { EngineBus, createEngineEvent, getEngine } from "../engine";
import { Quest, QuestSystem, START_QUEST } from "../gameplay/quest";
import { BaseCharacter } from "../engine/coreentities/basecharacter";
import { Location } from "../engine/coreentities/location";

export type ModResource = {
    default: () => {}
};

export class DevModInterface {
    static get GAME(): DevModGameInterface {
        return new Proxy(new DevModGameInterface(), {
        });
    }

    static loadModResource(resources: any) {
        for (const resource of Object.values(resources)) {
            if (typeof resource === "function") {
                resource();
            }
        }
    }
}

class DevModGameInterface {
    get TIME(): DevModGameTimeInterface {
        return new Proxy(new DevModGameTimeInterface(), {

        });
    }

    get RESOURCE(): DevModGameResourceInterface {
        return new Proxy(new DevModGameResourceInterface(), {
            get(target: Object, property: string | symbol, receiver: any) {
                return getEngine().getGame().getFiniteResource(property.toString());
            },
        });
    }

    get LOCATION(): DevModGameLocationInterface {
        return new Proxy(new DevModGameLocationInterface(), {
            get(target: Object, property: string | symbol, receiver: any) {
                if (Reflect.has(target, property)) {
                    return Reflect.get(target, property, receiver);
                }
                else {
                    return getEngine().getScene().scenes.find(s => s.name === property.toString()) as Location;
                }
            },
        });
    }

    get QUEST(): DevModGameQuestInterface {
        return new Proxy(new DevModGameQuestInterface(), {

        });
    }

    get CHARACTER(): DevModGameCharacterInterface {
        return new Proxy(new DevModGameCharacterInterface(), {
            get(target: Object, property: string | symbol, receiver: any) {
                const characters = getEngine().getGame().gameEntities.filter(ent => ent instanceof BaseCharacter);
                return characters.find(c => c.name === property.toString());
            }
        });
    }
}

export class DevModGameTimeInterface {
    get DAY() {
        return getEngine().getGame().getClock().getDayString();
    }

    get HOUR() {
        return getEngine().getGame().getClock().getHourString();
    }

    get MINUTE() {
        return getEngine().getGame().getClock().getMinuteString();
    }

    ADVANCE(minutes?: number, hours?: number, days?: number) {
        if (hours === undefined) {
            hours = 0;
        }
        
        if (days) {
            hours += days * 24;
        }
        
        return getEngine().getGame().getClock().advanceTime(hours, minutes);
    }
}

export class DevModGameResourceInterface {

}

export class DevModGameLocationInterface {
    get CURRENT() {
        const current = getEngine().getScene().currentScene;
                if (!current) {
                    return undefined;
                }

                return current as Location;
    }
}

export class DevModGameQuestInterface {
    get FOCUSED() {
        const questSystem = getEngine().getGame().getGameSystem<QuestSystem>("SYS_QUEST");
        if (!questSystem) {
            return undefined;
        }

        return questSystem.findByTitle(questSystem.questTrackerHud.focusedQuest);
    }

    /**
     * createQuest
     * Creates a quest object and loads it into the quest system if it is available.
     * @param name 
     * @param description 
     * @param replaceDuplicate Determines whether or not this should replace a quest already loaded in with the same unique id.
     * @param uniqueId Unique Identifier for the quest. If left omitted, one is created by default.
     * @param priority Priority number determines which quest has priority over a shared target.
     * @returns Quest
     */
    createQuest(name: string, description: string, replaceDuplicate = true, uniqueId?: string, priority?: number): Quest {
        const quest = new Quest(name, description, uniqueId, priority);
        const sys = getEngine().getGame().getGameSystem<QuestSystem>("SYS_QUEST");
        if (sys) {
            sys.addQuest(replaceDuplicate, quest);
        }
        return quest;
    }

    /**
     * loadQuest
     * Loads a quest into an available quest system.
     * @param quest 
     * @param replaceDuplicate 
     * @returns true if loaded, false if failure
     */
    loadQuest(quest: Quest, replaceDuplicate = true): boolean {
        const sys = getEngine().getGame().getGameSystem<QuestSystem>("SYS_QUEST");
        if (!sys) {
            return false;
        }
        sys.addQuest(replaceDuplicate, quest);
        return true;
    }

    /**
     * startQuest
     * Starts a quest by the given name.
     * @param name 
     */
    startQuest(name: string): void {
        EngineBus.emit(START_QUEST, createEngineEvent(START_QUEST, {
            quest: name
        }));
    }

    /**
     * advanceQuest
     * Advances a quest to the next natural quest step or to the step provided.
     * @param name 
     * @param force Forces the quest to advance regardless of whether the objectives are complete.
     * @param step Step to advance to.
     */
    advanceQuest(name: string, force?: boolean, step?: string): void {
        EngineBus.emit(START_QUEST, createEngineEvent(START_QUEST, {
            quest: name,
            step,
            force
        }));
    }
}

export class DevModGameCharacterInterface {

}