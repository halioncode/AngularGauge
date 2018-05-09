import { Circle } from "../circle";

export interface Arc extends Circle {
    /**
     * Angle to start drawing the arc
     */
    startAngle: number;
    /**
     * Angle to stop drawing the arc
     */
    endAngle: number;
    /**
     * Width of the arc line
     */
    lineWidth: number;
}
