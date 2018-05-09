import { Drawable } from "../drawable";
import { Point } from "../point";

/**
 * Defines the methods implemented by drawble straight lines
 */
export interface StraightLine extends Drawable {
    /**
     * Start point of the line
     */
    start: Point;

    /**
     * End point of the line
     */
    end: Point;
}
