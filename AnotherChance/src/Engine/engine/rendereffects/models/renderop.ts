export enum RenderEffectFlags {
    RE_NONE = 0,
    RE_OVERLAY = 1,
    RE_OVERRIDE = 2,
};

export interface RenderEffectProps {
    
    /**
     * override
     * can this animation override current animations running on this target and on this property?
     */
    override?: boolean;

    /**
     * overlay
     * can this animation play concurrently with animations of a different property running on this target?
     */
    overlay?: boolean;
}

export interface RenderEffect {
    _renderEffect: RenderEffectFlags;

    getRenderEffectMode(): RenderEffectFlags;
    setRenderEffectMode(overlay: boolean, override?: boolean): void;
    setRenderEffectFlags(flags: RenderEffectFlags): void;
}