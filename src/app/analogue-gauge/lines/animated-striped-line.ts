import { StraightLine } from "./straight-line";
import { Point } from "../point";

export class AnimatedStripedLine implements StraightLine {
    public start: Point;
    public end: Point;

    private lineWidth: number = 5;
    private colours: string[] = ['red', 'green', 'blue'];

    private startTime: number = new Date().getTime();

    private ANIMATE_TIME = 1000;

    
    public needsRedraw(): boolean {
        return true; //This is an animated component, a redraw is always needed
    }

   /**
    * Draws the object onto a canvas
    * @param ctx The context to draw the object
    */
   draw(ctx: CanvasRenderingContext2D) {
       var grad = ctx.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);
       var lfo: number = ((new Date().getTime() - this.startTime) % this.ANIMATE_TIME) / this.ANIMATE_TIME;

       lfo *= 2;
       if(lfo > 1) {
           lfo = -lfo + 2;
       }

       grad.addColorStop(0, this.colours[0]);
       grad.addColorStop(lfo, this.colours[1]);
       grad.addColorStop(1, this.colours[2]);

       ctx.beginPath();
       ctx.strokeStyle = grad;
       ctx.lineWidth = this.lineWidth;
       ctx.moveTo(this.start.x, this.start.y);
       ctx.lineTo(this.end.x, this.end.y);
       ctx.stroke();
   }
}
