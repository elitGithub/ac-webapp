import { EngineBus, EngineSystem, IEngineEvent, createEngineEvent, getEngine } from "../enginesys";
import { Animation } from "../rendereffects/models/animation";
import { Scene } from "./models/scene";
import SceneTransitionFlags from "./models/scenetransitions";
import { createNamedAnimate, queueNamedAnimate } from "../rendereffects/models/animate";
import { AnimationListener } from "../rendereffects/models/animationlistener";
import { Load_Scene, Prep_Scenes, Reload_Scene, SCENE_CHANGED, SCENE_TRANSITIONED, SceneListener, Transition_Scene } from "./models/events";
import { RENDER_STAGE_CHANGE } from "../render/models";
import TweenShape from "../../framework/animations/tween/models/tweenshape";
import { onSceneOutChildren } from "../../core/util";
import { Render_Clear_Animate } from "../rendereffects";

export class SceneSystem implements EngineSystem, AnimationListener {

    private currentScene?: Scene;
    private sceneReady: boolean;
    scenes: Scene[];
    pendingSceneChange: boolean;
    transitioning: boolean;
    transitioningFrom: string;
    transitioningTo: string;
    transitionType: SceneTransitionFlags;

    constructor() {
        this.sceneReady = false;
        this.scenes = [];
        this.pendingSceneChange = false;
        this.transitioning = false;
        this.transitioningFrom = "";
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
        
        EngineBus.on(Prep_Scenes, this.queue.bind(this));
        EngineBus.on(Load_Scene, this.queue.bind(this));
        EngineBus.on(Transition_Scene, this.queue.bind(this));
        EngineBus.on(Reload_Scene, this.queue.bind(this));

        //There will be a config for scene transitions soon
        const ease = new TweenShape(0, 0.1, 0.15, 1);
        createNamedAnimate(SceneTransitionFlags[SceneTransitionFlags.ST_FADE], "alpha", false, 0, ease);
        createNamedAnimate(SceneTransitionFlags[SceneTransitionFlags.ST_FADE]+"_REVERSE", "alpha", false, 1, ease);
    }

    addScene(scene: Scene) {
        this.scenes.push(scene);
    }

    sceneByName(name: string) {
        return this.scenes.find(s => s.name === name);
    }

    getCurrentScene() {
        return this.currentScene;
    }

    isSceneReady() {
        return this.sceneReady;
    }
    
    toggleSceneInteractivity(toggle: boolean) {
        if (this.currentScene) {
            this.currentScene.eventMode = toggle ? "passive" : "none";
            
            if (!toggle) {
                onSceneOutChildren(this.currentScene.children, this.currentScene);
            }
        }
        
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

        this.transitioningFrom = this.currentScene.name;
        this.transitioning = true;
        this.toggleSceneInteractivity(false);
    }

    transitionSceneWithCustom(name: string, animation: any) {

    }

    private _loadScene(scene: Scene, transitioning: boolean) {
        getEngine().getRender().prepareRenderable(scene)
        .then(() => {
            if (!transitioning) {
                if (this.currentScene) {
                    this.transitioningFrom = this.currentScene.name;
                }
                this.currentScene = scene;
                this.toggleSceneInteractivity(true);
                this.pendingSceneChange = true;
            }

            this.sceneReady = false;
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
        this.toggleSceneInteractivity(false);
        if (this.transitionType === SceneTransitionFlags.ST_FADE) {
            this.currentScene.alpha = 0;
        }

        queueNamedAnimate(this.currentScene, SceneTransitionFlags[this.transitionType]+"_REVERSE", 1000);
    }

    protected onSceneTransitionEnter() {
        this.transitioning = false;
        this.transitioningFrom = "";
        this.transitioningTo = "";
        this.transitionType = SceneTransitionFlags.ST_NONE;
        
        if (this.currentScene) {
            this.toggleSceneInteractivity(true);
        }
    }

    onAnimationsFinish(animation: Animation) {
        if (this.transitioning && ((animation.name === SceneTransitionFlags[this.transitionType]) || animation.name === SceneTransitionFlags[this.transitionType]+"_REVERSE")) {
            if (animation.target.name === this.transitioningTo) {
                this.onSceneTransitionEnter();
                this.sceneReady = true;
                EngineBus.emit(SCENE_TRANSITIONED, createEngineEvent(SCENE_TRANSITIONED, {scene: this.currentScene?.name}));
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
            if (!this.transitioning) {
                this.sceneReady = true;
            }
            EngineBus.emit(SCENE_CHANGED, createEngineEvent(SCENE_CHANGED, {previousScene: this.transitioningFrom, scene: this.currentScene?.name}));

            if (!this.transitioning) {
                //If it is a non transiitioning scene change, need to fire this so transition listeners know the scene has fully loaded.
                EngineBus.emit(SCENE_TRANSITIONED, createEngineEvent(SCENE_TRANSITIONED, {scene: this.currentScene?.name}));
            }
        }
    }

    loadState(data: SceneSystem): void {
        //Now... what is the scene manager willing to restore

        //the current scene? sure
        if (data.currentScene) {
            const stateCurrentScene = this.sceneByName(data.currentScene.name);
            if (data.currentScene.name && stateCurrentScene) {
                if (this.currentScene && this.transitioning) {
                    EngineBus.emit(Render_Clear_Animate, createEngineEvent(Render_Clear_Animate, {target: this.currentScene}));
                }
                this.onSceneTransitionEnter(); //clear transitions flags
                this.loadScene(data.currentScene.name);
                stateCurrentScene.alpha = 1;
            }
        }
    }
    
}