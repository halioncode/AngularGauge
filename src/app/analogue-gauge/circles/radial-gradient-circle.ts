import { Circle } from "./circle";
import { Point } from "../point";

export class RadialGradientCircle implements Circle {

    public centre: Point;
    public radius: number = 10;

    private colour: string = "red";

    setCentre(point: Point) {
        this.centre = point;
    }

    needsRedraw(): boolean { 
        return false; 
    }


    draw(ctx: CanvasRenderingContext2D) {
        var grad = ctx.createRadialGradient(this.centre.x, this.centre.y, 
            2, this.centre.x, this.centre.y, this.radius);
        
        grad.addColorStop(0.0, 'gray');
        grad.addColorStop(1.0, 'black');

        ctx.beginPath();
        ctx.arc(this.centre.x, this.centre.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = grad;
        ctx.fill();
    }
}
