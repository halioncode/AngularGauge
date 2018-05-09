import { Arc } from "./arc";
import { Point } from "../../point";

export class SolidColourArc implements Arc {

    public startAngle: number;
    public endAngle: number;
    public lineWidth: number;
    public radius: number;
    public colour: string = 'black';

    public centre: Point;

    needsRedraw(): boolean {
        return false;
    }

    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.strokeStyle = this.colour;
        ctx.lineWidth = 5;
        ctx.arc(this.centre.x, this.centre.y, this.radius, this.startAngle, this.endAngle);
        ctx.stroke();
    }


}
