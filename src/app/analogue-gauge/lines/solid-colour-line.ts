import { StraightLine } from "./straight-line";
import { Point } from "../point";

export class SolidColourLine implements StraightLine {
    public start: Point;
    public end: Point;

    private lineWidth: number = 5;
    private colour: string = "black"; //default values

    private redraw: boolean = true;

    
   public needsRedraw(): boolean {
    return this.redraw;
   }

   /**
    * Draws the object onto a canvas
    * @param ctx The context to draw the object
    */
   draw(ctx: CanvasRenderingContext2D) {
       this.redraw = false;

       ctx.beginPath();
       ctx.strokeStyle = this.colour;
       ctx.lineWidth = this.lineWidth;
       ctx.moveTo(this.start.x, this.start.y);
       ctx.lineTo(this.end.x, this.end.y);
       ctx.stroke();

   }
    
}
