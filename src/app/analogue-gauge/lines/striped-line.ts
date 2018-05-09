import { StraightLine } from "./straight-line";
import { Point } from "../point";

export class StripedLine implements StraightLine {
    public start: Point;
    public end: Point;

    private lineWidth: number = 5;
    private colours: string[] = ['red', 'green', 'blue'];

    private redraw: boolean = true;

    
   public needsRedraw(): boolean {
    return this.redraw;
   }

   /**
    * Draws the object onto a canvas
    * @param ctx The context to draw the object
    */
   draw(ctx: CanvasRenderingContext2D) {
       var grad = ctx.createLinearGradient(this.start.x, this.start.y, this.end.x, this.end.y);
       
       for(var i = 0; i < this.colours.length; i++) {
           grad.addColorStop(i / (this.colours.length - 1), this.colours[i]);
       }

       ctx.beginPath();
       ctx.strokeStyle = grad;
       ctx.lineWidth = this.lineWidth;
       ctx.moveTo(this.start.x, this.start.y);
       ctx.lineTo(this.end.x, this.end.y);
       ctx.stroke();
       this.redraw = false;
   }
}
