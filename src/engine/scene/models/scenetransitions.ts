enum SceneTransitionFlags {
    
    ST_NONE = 0,
    
    /** 
     * ST_FADE
     * A simple fade out and in scene transition.
     * */
    ST_FADE = 1<<0,

    /**
     * ST_LINES
     * Scan lines scene transition. (Like a paper shred effect)
     */
    ST_LINES = 1<<1,

    /**
     * ST_ZOOM
     * The old scene shrinks and the new scene grows.
     */
    ST_ZOOM = 1<<2,

    /**
     * ST_ROTATE
     * The old scene rotates out and the new scene rotates in.
     */
    ST_ROTATE = 1<<3,

    ST_CUSTOM = 1<<4,
}

export default SceneTransitionFlags;