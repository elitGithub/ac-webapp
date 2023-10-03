enum SceneTransitionFlags {
    
    ST_NONE = 0,
    
    /** 
     * ST_FADE
     * A simple fade out and in scene transition.
     * */
    ST_FADE = 0x1,

    /**
     * ST_LINES
     * Scan lines scene transition. (Like a paper shred effect)
     */
    ST_LINES = 0x2,

    /**
     * ST_ZOOM
     * The old scene shrinks and the new scene grows.
     */
    ST_ZOOM = 0x4,

    /**
     * ST_ROTATE
     * The old scene rotates out and the new scene rotates in.
     */
    ST_ROTATE = 0x8,
}

export default SceneTransitionFlags;