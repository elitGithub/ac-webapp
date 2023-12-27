import { Resource, Sprite, Texture, Text, Container } from "pixi.js";
import { EngineBus, createEngineEvent, getEngine } from "../../engine";
import { IRenderableResource } from "../../framework/graphics";
import { HudElement, TOGGLE_HUD } from "../../engine/gui";
import { QUEST_TRACKER_CHANGE } from "./model";

export class QuestListHud extends HudElement {
    background?: Texture<Resource>;
    listItems: Container[];

    constructor(backgroundTexture?: IRenderableResource) {
        super();
        if (backgroundTexture) {
            this.setBackground(backgroundTexture);
        }

        this.listItems = [];
        this.visible = false;
    }

    setBackground(background: IRenderableResource) {
        getEngine().getAssets().loadTexture(background)
            .then(asset => {
                if (asset) {
                    this.background = asset.texture;
                }
            });
    }
    
    addItemToList(questTitle: string) {
        const t = new Text(questTitle);
        t.anchor.set(0.5);
        const bg = new Sprite(this.background);
        t.setTransform(bg.width / 2, bg.height / 2);
        const item = new Container();
        item.name = questTitle;
        item.addChild(bg, t);
        item.setTransform(getEngine().getRender().getDimensions().x/2, (this.listItems.length * bg.height) + 200);
        item.pivot.set(item.width / 2, 0);
        this.listItems.push(item);
        item.eventMode = "dynamic";
        item.on("pointertap", this.onItemClick.bind(this, questTitle));
        this.addChild(item);
    }

    removeItemFromList(questTitle: string) {
        let removeChild = (item: Container) => {
            this.removeChild(item);
        }
        removeChild = removeChild.bind(this);

        this.listItems = this.listItems.filter(item => {
            if (item.name?.toUpperCase() !== questTitle.toUpperCase()) {
                return true;
            }

            removeChild(item);
            return false;
        });
    }

    isInList(questTitle: string) {
        return this.listItems.find(item => item.name === questTitle);
    }

    onItemClick(questTitle: string) {
        EngineBus.emit(QUEST_TRACKER_CHANGE, createEngineEvent(QUEST_TRACKER_CHANGE, { quest: questTitle }));
        EngineBus.emit(TOGGLE_HUD, createEngineEvent(TOGGLE_HUD, { hudname: "HUD_QUEST_LIST" }));
    }
}