export default class TweenShape {
    private points: number[];

    constructor(...points: number[]) {
        this.points = [];
        const max = Math.max(...points);
        const min = Math.min(...points);

        for (let i = 0; i < points.length; i++) {
            // We only need to describe the shape of a curve so normalise the points.
            const normalised = (points[i] - min) / (max - min);
            this.points.push(normalised);
        }
    }

    getCurvePoints(): number[] {
        return this.points;
    }
}