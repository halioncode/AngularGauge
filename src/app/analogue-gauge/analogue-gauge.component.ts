import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { TimedTransition } from './timed-transition';
import { Point } from './point';
import { StraightLine } from './lines/straight-line';
import { SolidColourLine } from './lines/solid-colour-line';
import { StripedLine } from './lines/striped-line';
import { AnimatedStripedLine } from './lines/animated-striped-line';
import { Circle } from './circles/circle';
import { SolidColourCircle } from './circles/solid-colour-circle';
import { RadialGradientCircle } from './circles/radial-gradient-circle';
import { SolidColourArc } from './circles/arcs/solid-colour-arc';
import { Arc } from './circles/arcs/arc';
import { CircleMaths } from './circle-maths';
import { BandedColourArc } from './circles/arcs/banded-colour-arc';
import { TimingManager } from './timing-manager';

@Component({
  selector: 'app-analogue-gauge',
  templateUrl: './analogue-gauge.component.html',
  styleUrls: ['./analogue-gauge.component.css']
})
export class AnalogueGaugeComponent implements OnInit, OnDestroy {

  @Input() public size: number;
  @Input() public tickCount: number = 0;
  @Input() public rotate: number = 0;
  @Input() public legend: string[] = null;
  @Input() public legendFont: string = null;
  @Input() public centreText: string = null;
  @Input() public centreTextFont: string = null;
  @Input() public needle: StraightLine = new SolidColourLine();
  @Input() public centre: Circle = new RadialGradientCircle();
  @Input() public gauge: Arc = new BandedColourArc();
  @Input() public reverse: boolean = false;
  
  @ViewChild('canvas') private canvas: ElementRef;

  private radius: number;
  private timer: TimingManager;
  private transition: TimedTransition;

  private readonly tickSize: number = 0.05; //Size of ticks proportional to the radius
  private readonly startSweep: number = Math.PI / 4;
  private readonly radiusReduce: number = 5;
  private readonly legendPosition: number = 0.9; //Distance of legend from the centre in number of radii
//  private readonly legendPosition: number = 0.9; //Distance of legend from the centre in number of radii

  private readonly refreshTime: number = 17;

  constructor() {
    this.transition = new TimedTransition(0, 1, null);
  }

  ngOnInit() {
    //Setup the timer refresher
    this.timer = new TimingManager();
    this.timer.highSpeedDelay = this.refreshTime;
    this.timer.event = () => this.draw(); 
    this.timer.tickNeeded = () => this.redrawNeeded();
    this.timer.start();
  }

  ngOnDestroy() {
    this.timer.stop();
  }

  /* Value of the gauge */
  get value(): number {
    return this.transition.getFinalValue();
  }

  @Input() set value(value: number) {
    this.transition.setValue(value);
  }

  /**
   * Gets whether the canvas needs redrawing
   */
  private redrawNeeded(): boolean {
    return true;
  }

  /**
   * Draws the analogue gauge to the canvas
   */
  private draw() {
    const ctx: CanvasRenderingContext2D = this.canvas.nativeElement.getContext('2d');
    const halfSize = this.size / 2;
    const radius = halfSize - this.radiusReduce;
    const startAngle = Math.PI / 2 + this.startSweep + this.rotate;
    const endAngle = Math.PI / 2 - this.startSweep + this.rotate;
    this.clearCanvas(ctx);

    // Draw outer arc
    this.gauge.radius = radius;
    this.gauge.startAngle = startAngle;
    this.gauge.endAngle = endAngle;
    this.gauge.centre = {x:halfSize, y:halfSize};
    this.gauge.draw(ctx);
    ctx.beginPath();

    // Draw circle in centre
    this.centre.centre = {x : halfSize, y : halfSize};
    this.centre.draw(ctx);

    // Draw ticks
    if (this.tickCount > 1) {
      ctx.strokeStyle = "black";
      for (let i = 0; i < this.tickCount; i++) {
        const pos =  i / (this.tickCount - 1);
        const tickPoint: {x: number, y: number} = CircleMaths.calculatePointFromAngle(startAngle, endAngle, this.valueAdjust(pos));
        tickPoint.x = tickPoint.x * radius + halfSize;
        tickPoint.y = -tickPoint.y * radius + halfSize;
        const tickEndPoint: {x: number, y: number} = {
          x: tickPoint.x + (halfSize - tickPoint.x) * this.tickSize,
          y: tickPoint.y + (halfSize - tickPoint.y) * this.tickSize,
        };
        ctx.beginPath();
        ctx.moveTo(tickPoint.x, tickPoint.y);
        ctx.lineTo(tickEndPoint.x, tickEndPoint.y);
        ctx.stroke();
      }
    }

    // Draw legend
    if(this.legend != null) {
      ctx.font = this.legendFont;
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle"; 
      for(let i = 0; i < this.legend.length; i++) {
        const pos =  i / (this.legend.length - 1);
        const tickPoint: {x: number, y: number} = CircleMaths.calculatePointFromAngle(startAngle, endAngle, this.valueAdjust(pos));
        tickPoint.x = tickPoint.x * radius * this.legendPosition + halfSize;
        tickPoint.y = -tickPoint.y * radius * this.legendPosition + halfSize;
        ctx.fillText(this.legend[i], tickPoint.x, tickPoint.y, radius * 0.3);
      }
    }

    // Draw central text
    if(this.centreText != null) {
      const y = halfSize - radius * 0.3;
      ctx.font = this.centreTextFont;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(this.centreText, halfSize, y, radius * 0.8);
    }

    // Draw needle
    const point: Point = CircleMaths.calculatePointFromAngle(startAngle, endAngle, this.valueAdjust(this.transition.getValue()));
    this.needle.start = { x: halfSize, y: halfSize };
    this.needle.end = {
      x: point.x * radius + halfSize,
      y: -point.y * radius + halfSize,
    };
    this.needle.draw(ctx);
  }

  /**
   * Clears a canvas
   */
  private clearCanvas(ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, this.size, this.size);
  }

  /**
   * Adjusts the value of a point on the gauge if a transformation is in progress
   * @param value Value to adjust
   */
  private valueAdjust(value: number): number {
    return this.reverse ? 1 - value : value;
  }

}
