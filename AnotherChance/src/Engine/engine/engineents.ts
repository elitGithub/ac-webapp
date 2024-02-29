import { Container } from "pixi.js";
import { EngineSystem, IEngineEvent } from ".";
import { BaseEntity } from "./coreentities";

export class EntitySystem implements EngineSystem {
    ents: Map<BaseEntity, string>;

    constructor() {
        this.ents = new Map<BaseEntity, string>();
    }

    addEntityToList(entity: BaseEntity) {
        if (this.ents.has(entity)) {
            console.log(`Already exists ${ entity }`);
            return;
        }

        for (const name of this.ents.values()) {
            if (name === entity.name) {
                console.error(`Tried to add entity named ${ name } but its name matches an existing entity.`)
                return;
            }
        }

        console.log(`${ entity.name } added to ents`)
        this.ents.set(entity, entity.name);
    }

    findEntityByName(name: string) {
        for (const [ent, entName] of this.ents.entries()) {
            if (entName === name) {
                return ent;
            }
        }
    }

    findEntitiesByType<T>(type: any): T[] {
        const ents: any[] = [];
        for (const ent of this.ents.keys()) {
            if (ent instanceof type) {
                ents.push(ent);
            }
        }

        return ents;
    }

    removeEntityFromList(entity?: BaseEntity, name?: string) {
        if (entity) {
            this.ents.delete(entity);
        } else if (name) {
            const ent = this.findEntityByName(name);
            if (ent) {
                this.ents.delete(ent);
            }
        }
    }

    queue(engineEvent: IEngineEvent): void {
        console.log(engineEvent);
    }

    // @ts-ignore
    update(time: number): void {
        for (const ent of this.ents.keys()) {
            if (ent.markedForDeletion) {
                if (ent instanceof Container) {
                    ent.destroy(ent.deletionOptions);
                }

                this.removeEntityFromList(ent);
            }
        }
    }

    loadState?(data: EntitySystem): void {
        if (data.ents) {
            this.ents = data.ents;
        }
    }

}
