import { Point } from "../point";
import { Drawable } from "../drawable";

export interface Circle extends Drawable {

    /**
     * The centre point from which to draw the circle
     */
    centre: Point;

    /**
     * The radius of the circle
     */
    radius: number;

    
}
