import { Graphics, Sprite, Text } from "pixi.js";
import { EngineBus, IEngineEvent, createEngineEvent, getEngine } from "../../../src/engine";
import { TOGGLE_HUD } from "../../../src/engine/gui";
import { IRenderableResource } from "../../../src/framework/graphics";
import ModalTitleBg from "../assets/ui/notification/modal_frame_title.webp";
import QuestModalBg from "../assets/ui/notification/modal_frame_quest.webp";
import { QUEST_COMPLETED, QUEST_FAILED, QUEST_STARTED, QUEST_STEP_STARTED, QuestListener, QuestUpdateEvent, subscribeToQuestEvents } from "../../../src/gameplay/quest";
import { NotificationHud } from "../../../src/gameplay/misc/notifhud";

export class QuestNotifHud extends NotificationHud implements QuestListener {
    
    statusBackground?: Sprite;
    descriptionBackground?: Sprite;
    statusText: Text;
    titleText: Text;
    descriptionText: Text;
    dim: Graphics;

    constructor(name: string) {
        super(name);

        this.setStatusBackground({source: ModalTitleBg});
        this.setDescriptionBackground({source: QuestModalBg});

        this.statusText = new Text();
        this.titleText = new Text();
        this.descriptionText = new Text();

        this.visible = false;

        this.dim = new Graphics();
        this.dim.beginFill(0x000000);
        this.dim.drawRect(0, 0, getEngine().getRender().getDimensions().x, getEngine().getRender().getDimensions().y);
        this.dim.alpha = 0.5;
        this.addChild(this.dim);
        subscribeToQuestEvents(this);
    }
    

    setStatusBackground(background: IRenderableResource) {
        getEngine().createSimpleSprite(background)
            .then(sprite => {
                if (sprite) {
                    this.statusBackground = sprite;
                    this.statusBackground.anchor.set(0.5);
                    this.addChild(this.statusBackground);
                    this.statusBackground.addChild(this.statusText);
                    this.statusBackground.position.set(getEngine().getRender().getDimensions().x/2, 200);
                    this.Status = "";
                }
            });
    }

    setDescriptionBackground(background: IRenderableResource) {
        getEngine().createSimpleSprite(background)
            .then(sprite => {
                if (sprite) {
                    this.descriptionBackground = sprite;
                    this.descriptionBackground.anchor.set(0.5);
                    this.addChild(this.descriptionBackground);
                    this.descriptionBackground.addChild(this.titleText);
                    this.descriptionBackground.addChild(this.descriptionText);
                    this.descriptionBackground.position.set(getEngine().getRender().getDimensions().x/2, 450);
                    this.Title = "";
                    this.Description = "";

                }
            });
    }

    set Status(text: string) {
        this.statusText.text = text;
        if (this.statusBackground) {
            this.statusText.anchor.set(0.5);
        }
    }

    set Title(text: string) {
        this.titleText.text = text;
        if (this.descriptionBackground) {
            this.titleText.anchor.set(0.5);
            this.titleText.position.set(0, -100);
        }
    }

    set Description(text: string) {
        this.descriptionText.text = text;
        if (this.descriptionBackground) {
            this.descriptionText.anchor.set(0.5);
            this.descriptionText.position.set(0, -50);
        }
    }
    
    onQuestUpdate(event: IEngineEvent): void {
        const questEvent = event as QuestUpdateEvent;
        if (event.event === QUEST_STARTED) {
            this.queueNotification({
                Status: "Quest Started!", 
                Title: questEvent.quest.title, 
                Description: questEvent.quest.description
            });
        }
        else if (event.event === QUEST_STEP_STARTED) {
            if (questEvent.quest.getCurrentQuestStep()?.silence) {
                return;
            }
            this.queueNotification({
                Status: "Quest Phase Started!", 
                Title: questEvent.quest.title, 
                Description: questEvent.quest.getCurrentQuestStep()?.description ?? ""
            });
        }
        else if (event.event === QUEST_COMPLETED) {
            this.queueNotification({
                Status: "Quest Completed!", 
                Title: questEvent.quest.title, 
                Description: questEvent.quest.getCurrentQuestStep()?.description ?? ""
            });
        }
        else if (event.event === QUEST_FAILED) {
            this.queueNotification({
                Status: "Quest Failed!", 
                Title: questEvent.quest.title, 
                Description: questEvent.quest.getCurrentQuestStep()?.description ?? ""
            });
        }
    }
}