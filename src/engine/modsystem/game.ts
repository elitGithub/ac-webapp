import { getEngine } from "..";
import { BaseCharacter } from "../coreentities/basecharacter";

export const GAME = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        switch (property) {
            case "TIME": {
                return TIME;
            }
            case "RESOURCE": {
                return RESOURCE;
            }
            case "LOCATION": {
                return LOCATION;
            }
            case "CHARACTER": {
                return CHARACTER;
            }
            case "QUEST": {
                return QUEST;
            }
        }
    },
});

const TIME = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        switch(property) {
            case "DAY": {
                return getEngine().getGame().clock.getDayString();
            }
            case "HOUR": {
                return getEngine().getGame().clock.getHourString();
            }
            case "MINUTE": {
                return getEngine().getGame().clock.getMinuteString();
            }
        }
    },
});

const RESOURCE = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        return getEngine().getGame().getFiniteResource(property.toString());
    },
});

const LOCATION = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        switch (property) {
            case "CURRENT": {
                const current = getEngine().getScene().currentScene;
                if (!current) {
                    return undefined;
                }

                return current;
            }
            default: {
                return getEngine().getScene().scenes.find(s => s.name === property.toString());
            }
        }
    },
});

const CHARACTER = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        const characters = getEngine().getGame().gameEntities.filter(ent => ent instanceof BaseCharacter);
        return characters.find(c => c.name === property.toString());
    }
});

const QUEST = new Proxy({}, {
    get(target: Object, property: string | symbol, receiver: any) {
        if (!getEngine().getGame().gameSystems.has("SYS_QUEST")) {
            return undefined;
        }

        return getEngine().getGame().gameSystems.get("SYS_QUEST")!;
    },
});