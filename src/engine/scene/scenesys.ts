import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent, getEngine } from "../enginesys";
import { Animation } from "../rendereffects/models/animation";
import { Scene } from "./models/scene";
import SceneTransitionFlags from "./models/scenetransitions";
import { createNamedAnimate, queueNamedAnimate } from "../rendereffects/models/animate";
import { AnimationListener } from "../rendereffects/models/animationlistener";
import { Load_Scene, Prep_Scenes, Reload_Scene, Transition_Scene } from "./models/events";
import { RENDER_STAGE_CHANGE } from "../render/models";
import TweenShape from "../../framework/animations/tween/models/tweenshape";
import { onSceneOutChildren } from "../../core/util";

export class SceneSystem implements EngineSystem, AnimationListener {

    currentScene?: Scene;
    scenes: Scene[];
    pendingSceneChange: boolean;
    transitioning: boolean;
    transitioningTo: string;
    transitionType: SceneTransitionFlags;

    constructor() {
        this.scenes = [];
        this.pendingSceneChange = false;
        this.transitioning = false;
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
        
        EngineBus.on(Prep_Scenes, this.queue.bind(this));
        EngineBus.on(Load_Scene, this.queue.bind(this));
        EngineBus.on(Transition_Scene, this.queue.bind(this));
        EngineBus.on(Reload_Scene, this.queue.bind(this));

        //There will be a config for scene transitions soon
        const ease = new TweenShape(0, 0.1, 0.15, 1);
        createNamedAnimate(SceneTransitionFlags[SceneTransitionFlags.ST_FADE], "alpha", 0, ease);
        createNamedAnimate(SceneTransitionFlags[SceneTransitionFlags.ST_FADE]+"_REVERSE", "alpha", 1, ease);
    }

    addScene(scene: Scene) {
        this.scenes.push(scene);
    }

    private _transitionScene(scene: Scene, transition: SceneTransitionFlags) {
        this.transitioningTo = scene.name;
        this.transitionType = transition;

        if (!this.currentScene) {
            this.onSceneTransitionExit();
            this.transitioning = true;
            return;
        }

        if (transition === SceneTransitionFlags.ST_FADE) {
            queueNamedAnimate(this.currentScene, SceneTransitionFlags[SceneTransitionFlags.ST_FADE], 1000);
        }
        else if (transition === SceneTransitionFlags.ST_LINES) {
            queueNamedAnimate(this.currentScene, SceneTransitionFlags[SceneTransitionFlags.ST_LINES], 1000);
        }
        else if (transition === SceneTransitionFlags.ST_ROTATE) {
            queueNamedAnimate(this.currentScene, SceneTransitionFlags[SceneTransitionFlags.ST_ROTATE], 1000);
        }
        else if (transition === SceneTransitionFlags.ST_ZOOM) {
            queueNamedAnimate(this.currentScene, SceneTransitionFlags[SceneTransitionFlags.ST_ZOOM], 1000);
        }

        this.transitioning = true;
        this.currentScene.eventMode = "none";
        onSceneOutChildren(this.currentScene.children, this.currentScene);
    }

    transitionSceneWithCustom(name: string, animation: any) {

    }

    private _loadScene(scene: Scene, transitioning: boolean) {
        getEngine().getRender().prepareRenderable(scene)
        .then(() => {
            if (!transitioning) {
                this.currentScene = scene;
                this.pendingSceneChange = transitioning;
            }
        });
    }

    loadScene(name: string) {
        const scene = this.scenes.find(s => s.name === name);
        if (!scene) {
            throw new Error("SceneSys: Could not find scene: "+name);
        }

        this._loadScene(scene, false);
    }

    loadSceneWithTransition(name: string, transitions: SceneTransitionFlags) {
        const scene = this.scenes.find(s => s.name === name);
        if (!scene) {
            throw new Error("SceneSys: Could not find scene: "+name);
        }

        this._loadScene(scene, true);
        this._transitionScene(scene, transitions);
    }

    protected onSceneTransitionExit() {
        if (!this.transitioningTo) {
            // uh oh

            //Wouldn't that be convenient, preserving the context after the animation is done so you can undo it straight from the object without having to make a new animate event.
            //Probably more trouble that it's worth but something to think about later down the line.
            //anim.reverse();
            throw new Error("SceneSys: Missing transition destination. Reversing transition...")
        }

        this.currentScene = this.scenes.find(s => s.name === this.transitioningTo);
        if (!this.currentScene) {
            throw new Error("SceneSys: Could not find the scene to transition to.");
        }
        this.pendingSceneChange = true;
        this.currentScene.eventMode = "passive";
        
        if (this.transitionType === SceneTransitionFlags.ST_FADE) {
            this.currentScene.alpha = 0;
        }

        queueNamedAnimate(this.currentScene, SceneTransitionFlags[this.transitionType]+"_REVERSE", 1000);
    }

    protected onSceneTransitionEnter() {
        this.transitioning = false;
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
    }

    onAnimationsFinish(animation: Animation) {
        if (this.transitioning && ((animation.name === SceneTransitionFlags[this.transitionType]) || animation.name === SceneTransitionFlags[this.transitionType]+"_REVERSE")) {
            if (animation.target.name === this.transitioningTo) {
                this.onSceneTransitionEnter();
            }
            else {
                this.onSceneTransitionExit();
            }
        }
    }

    queue(engineEvent: IEngineEvent): void {
        if (engineEvent.event === Prep_Scenes) {
            const scenes: Scene[] = (engineEvent as any)["scenes"];
            for (let i = 0; i < scenes.length; i++) {
                this.addScene(scenes[i]);
            }
        }
        else if (engineEvent.event === Load_Scene) {
            this.loadScene((engineEvent as any)["sceneName"]);
        }
        else if (engineEvent.event === Transition_Scene) {
            const loadSceneEvent = engineEvent as any;
            this.loadSceneWithTransition(loadSceneEvent["sceneName"], loadSceneEvent["sceneTransition"]);
        }
        else if (engineEvent.event === Reload_Scene) {
            if (this.pendingSceneChange || this.transitioning) {
                return;
            }

            if (this.currentScene) {
                this.loadSceneWithTransition(this.currentScene.name, SceneTransitionFlags.ST_FADE);
            }
        }
    }
    
    update(time: number): void {
        if (this.pendingSceneChange) {
            EngineBus.emit(RENDER_STAGE_CHANGE, createEngineEvent(RENDER_STAGE_CHANGE, {
                scene: this.currentScene
            }));
            this.pendingSceneChange = false;
        }
    }
    
}