import { EngineSystem, IEngineEvent } from "../enginesys";
import { Scene } from "./models/scene";
import SceneTransitionFlags from "./models/scenetransitions";

export class SceneSystem implements EngineSystem {

    currentScene?: Scene;
    scenes: Scene[];
    transitioning: boolean;
    transitioningTo: string;
    transitionType: SceneTransitionFlags;

    constructor() {
        this.scenes = [];
        this.transitioning = false;
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
    }

    addScene(scene: Scene) {
        this.scenes.push(scene);
    }

    changeToScene(name: string) {
        this.currentScene = this.scenes.find(s => s.name === name);
    }

    transitionScene(name: string, transitions: SceneTransitionFlags) {
        const scene = this.scenes.find(s => s.name === name);
        if (!scene) throw new Error("SceneSys: Could not find scene: "+name);
        this.transitioningTo = name;

        if (transitions & SceneTransitionFlags.ST_FADE) {

        }

        if (transitions & SceneTransitionFlags.ST_LINES) {

        }

        if (transitions & SceneTransitionFlags.ST_ROTATE) {

        }

        if (transitions & SceneTransitionFlags.ST_ZOOM) {

        }
    }

    transitionSceneWithCustom(name: string, animation: any) {

    }

    loadScene(name: string) {

    }

    protected onSceneTransitionExit(anim: any) {
        if (!this.transitioningTo) {
            // uh oh

            anim.reverse();
            throw new Error("SceneSys: Missing transition destination. Reversing transition...")
        }

        this.currentScene = this.scenes.find(s => s.name === this.transitioningTo);
        anim.target = this.currentScene;

        //Wouldn't that be convenient, preserving the context after the animation is done so you can undo it straight from the object without having to make a new animate event.
        //Probably more trouble that it's worth but something to think about later down the line.
        anim.reverse();
    }

    protected onSceneTransitionEnter(anim: any) {
        this.transitioning = false;
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }
    
    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}