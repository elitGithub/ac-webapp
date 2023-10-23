
//extend PIXI.Graphics to modify its _renderWebGL function
function GraphicsNoBlending() {
    PIXI.Graphics.call(this);
}
GraphicsNoBlending.prototype = Object.create(PIXI.Graphics.prototype);
GraphicsNoBlending.prototype.constructor = GraphicsNoBlending;
GraphicsNoBlending.prototype._renderWebGL = function (renderer) {

    //////////////copy-paste from PIXI.Graphics._renderWebGL
    if (this.glDirty)
    {
        this.dirty = true;
        this.glDirty = false;
    }

    renderer.setObjectRenderer(renderer.plugins.graphics);
    //////////////////////////

    var gl = renderer.gl;
    gl.disable(gl.BLEND);
    renderer.plugins.graphics.render(this);
    gl.enable(gl.BLEND);
};
