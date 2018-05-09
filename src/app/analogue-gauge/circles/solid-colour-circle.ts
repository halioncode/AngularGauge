import { Circle } from "./circle";
import { Point } from "../point";

export class SolidColourCircle implements Circle {

    public centre: Point;
    public radius: number = 10;

    private colour: string = "red";


    needsRedraw(): boolean { 
        return false; 
    }


    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.colour;
        ctx.fill();
    }
}
