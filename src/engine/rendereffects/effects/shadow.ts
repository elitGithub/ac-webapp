//extend PIXI.Graphics to make it only draw on non-transparent pixels
function ShadowGraphics() {
    PIXI.Graphics.call(this);
}
ShadowGraphics.prototype = Object.create(PIXI.Graphics.prototype);
ShadowGraphics.prototype.constructor = ShadowGraphics;
ShadowGraphics.prototype._renderWebGL = function (renderer) {

    //////////////copy-paste from PIXI.Graphics._renderWebGL
    if (this.glDirty)
    {
        this.dirty = true;
        this.glDirty = false;
    }

    renderer.setObjectRenderer(renderer.plugins.graphics);
    //////////////////////////////////

    var gl = renderer.gl;
    gl.blendFuncSeparate(gl.ONE, gl.ONE_MINUS_SRC_ALPHA, gl.ZERO, gl.ONE);
    renderer.plugins.graphics.render(this);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
};