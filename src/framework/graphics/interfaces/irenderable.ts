export default interface IRenderable {
    getParent(): IRenderable;
    setParent(parent: IRenderable): void;
    getPosition(): void;
    setPosition(x: number, y?: number): void;
    getRotation(): void;
    setRotation(angle: number, radian: boolean): void;
    getSkew(): void;
    setSkew(xSkew: number, ySkew: number): void;
    getScale(): void;
    setScale(xScale: number, yScale: number): void;
    getCenter(): void;
    setCenter(xCenter: number, yScale: number): void;
    getTransform(): void;
    setTransform(
        x: number,
        y?: number,
        rotation?: number,
        xSkew?: number,
        ySkew?: number,
        xScale?: number,
        yScale?: number,
        xCenter?: number,
        yCenter?: number
    ): void;
}