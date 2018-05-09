/**
 * Provides methods for a gradual transition between numeric values other time
 */
export class TimedTransition {

    private min: number;
    private max: number;

    private transientValue: number;
    private transientTime: Date;
    private finalValue: number;

    private readonly TIME: number = 500;

    /**
     * Initialises a new instance
     * @param min The minimum possible value
     * @param max The maximum possible value
     * @param value The starting value. Leave null to default to the centre
     */
    constructor(min: number, max: number, value: number) {
        this.min = min;
        this.max = max;
        this.finalValue = value == null ? value : min + max / 2;
        this.transientValue = this.finalValue;
        this.transientTime = null;
    }

    /**
     * Sets the desired value
     * @param value Desired value
     */
    public setValue(value: number) {
        // Check the bounds
        if (value > this.max || value < this.min) {
            throw new Error('Value is out of bounds');
        }

        // Set the transient value based on the current value, then set new one
        this.transientValue = this.calculateTransient();
        this.finalValue = value;
        this.transientTime = new Date();
    }

    /**
     * Gets the current value in the transition
     */
    public getValue(): number {
        return this.calculateTransient();
    }

    /**
     * Gets the desired value
     */
    public getFinalValue(): number {
        return this.finalValue;
    }

    /**
     * Calculates the transient value based on the time elapsed since the value was set
     */
    private calculateTransient(): number {
        // If there is no transient time set, use the final value
        if (this.transientTime == null) {
            return this.finalValue;
        } else {
            const elapsed: number = new Date().getTime() - this.transientTime.getTime();
            const proportionComplete = elapsed / this.TIME;

            // If we've finished, just return the final time
            if (proportionComplete > 1) {
                this.transientTime = null;
                return this.finalValue;
            } else {
                // Calculate the value based on the elapsed time
                return this.transientValue + (this.finalValue - this.transientValue) * this.calculatePosition(proportionComplete);
                
            }
        }
    }

    /**
     * Calculates the proportion between the transient value and the final value
     * @param value Base proportion
     */
    private calculatePosition(value: number) : number {
        /*
            This mathatical function has been chosen because when plotted on a graph,
            f(0) = 0 and f(1) = 1. This is important so that the needle doesn't jump at the
            beginning and end of the animation.

            dy/dx is also zero at x = 0, and at x = 1. This means the needle accelerates and decelerates
            smoothly from rest.
        */
        return Math.sin((2 * value - 1) * Math.PI / 2) / 2 + 0.5;
    }

}
