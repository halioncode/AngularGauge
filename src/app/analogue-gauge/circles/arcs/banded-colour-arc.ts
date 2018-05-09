import { Arc } from "./arc";
import { Point } from "../../point";
import { CircleMaths } from "../../circle-maths";

export class BandedColourArc implements Arc {

    public startAngle: number;
    public endAngle: number;
    public lineWidth: number;
    public radius: number;
    public bands: {colour: string, start: number, end: number}[] = [
     {colour:'blue', start:0.0, end:0.1},
     {colour:'black', start:0.1, end:0.9},
     {colour:'red', start:0.9, end:1.0},
    ];

    public centre: Point;

    needsRedraw(): boolean {
        return false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bands.forEach((e) => {
            ctx.beginPath();
            ctx.lineWidth = 5;
            const startAngle: number = CircleMaths.calculateAngle(this.startAngle, this.endAngle, e.start);
            const endAngle: number = CircleMaths.calculateAngle(this.startAngle, this.endAngle, e.end);
            ctx.strokeStyle = e.colour;
            ctx.arc(this.centre.x, this.centre.y, this.radius, startAngle, endAngle);
            ctx.stroke();
            
        });
        ctx.stroke();
    }


}
