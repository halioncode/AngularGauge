import { Point } from "./point";

/**
 * Provides static methods for calculating values on circles
 */
export class CircleMaths {

    /**
   * Calculates the angle to display the needle
   * @param startAngle Angle of needle at lowest value
   * @param endAngle Angle of needle at highest value
   * @param value Value the needle is to indicate between 0-1
   */
  public static calculateAngle(startAngle: number, endAngle: number, value: number): number {
    if (endAngle < startAngle) { endAngle += Math.PI * 2; }
    return (startAngle + (endAngle - startAngle) * value) % (Math.PI * 2);
  }

  /**
   * Calculates the point on a graph for a straight line of length one at a given angle
   * @param angle Angle from the bottom
   */
  public static calculatePoint(angle: number): Point {
    return {x : Math.cos(angle), y : -Math.sin(angle)};
  }

  /**
   * Calculates the point on a circle at a given point inbetween two angles
   * @param startAngle Angle of needle at lowest value
   * @param endAngle Angle of needle at highest value
   * @param value Value the needle is to indicate between 0-1
   */
  public static calculatePointFromAngle(startAngle: number, endAngle: number, value: number) {
    return this.calculatePoint(this.calculateAngle(startAngle, endAngle, value));
  }
}
