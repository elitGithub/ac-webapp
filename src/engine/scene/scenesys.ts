import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent } from "../enginesys";
import { Animation } from "../rendereffects/models/animation";
import { Scene } from "./models/scene";
import SceneTransitionFlags from "./models/scenetransitions";
import { queueNamedAnimate } from "../rendereffects/models/animate";
import { AnimationListener } from "../rendereffects/models/animationlistener";

export class SceneSystem implements EngineSystem, AnimationListener {

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
        
        EngineBus.on()
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

        if (transitions === SceneTransitionFlags.ST_FADE) {
            queueNamedAnimate(scene, SceneTransitionFlags[SceneTransitionFlags.ST_FADE]);
        }

        if (transitions === SceneTransitionFlags.ST_LINES) {
            queueNamedAnimate(scene, SceneTransitionFlags[SceneTransitionFlags.ST_LINES]);
        }

        if (transitions === SceneTransitionFlags.ST_ROTATE) {
            queueNamedAnimate(scene, SceneTransitionFlags[SceneTransitionFlags.ST_ROTATE]);
        }

        if (transitions === SceneTransitionFlags.ST_ZOOM) {
            queueNamedAnimate(scene, SceneTransitionFlags[SceneTransitionFlags.ST_ZOOM]);
        }

        this.transitionType = transitions;
    }

    transitionSceneWithCustom(name: string, animation: any) {

    }

    loadScene(name: string) {
        const scene = this.scenes.find(s => s.name === name);
        if (!scene) {
            throw new Error("SceneSys: Could not find scene: "+name);
        }

        //Engine.Render.prepareRenderable(scene);

    }

    protected onSceneTransitionExit(anim: Animation) {
        if (!this.transitioningTo) {
            // uh oh

            //Wouldn't that be convenient, preserving the context after the animation is done so you can undo it straight from the object without having to make a new animate event.
            //Probably more trouble that it's worth but something to think about later down the line.
            //anim.reverse();
            throw new Error("SceneSys: Missing transition destination. Reversing transition...")
        }

        this.currentScene = this.scenes.find(s => s.name === this.transitioningTo);
        if (this.currentScene) {
            queueNamedAnimate(this.currentScene, SceneTransitionFlags[this.transitionType]+"_REVERSE");
        }
    }

    protected onSceneTransitionEnter(anim: any) {
        this.transitioning = false;
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
    }

    onAnimationsFinish(animation: Animation) {
        if (this.transitioning && (animation.name === SceneTransitionFlags[this.transitionType])) {
            if (animation.target.name === this.transitioningTo) {
                this.onSceneTransitionEnter(animation);
            }
            else {
                this.onSceneTransitionExit(animation);
            }
        }
    }

    queue(engineEvent: IEngineEvent): void {
        throw new Error("Method not implemented.");
    }
    
    update(time: number): void {
        throw new Error("Method not implemented.");
    }
    
}