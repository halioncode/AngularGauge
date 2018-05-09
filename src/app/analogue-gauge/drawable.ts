/**
 * Defines the methods implemented by objects drawble on the analogue gauge
 */
export interface Drawable {
    /**
     * Whether or not the object needs to be redrawn.
     */
    needsRedraw(): boolean;

    /**
     * Draws the object onto a canvas
     * @param ctx The context to draw the object
     */
    draw(ctx: CanvasRenderingContext2D);
}
