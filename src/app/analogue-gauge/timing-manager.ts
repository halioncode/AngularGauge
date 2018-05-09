/**
 * Manages the timing for events that need to occur frequently such as GUI redrawing.
 */
export class TimingManager {

    /**
     * The function that gets called when the timer ticks.
     */
    public event: Function;

    /**
     * The function to call to determine if a tick is immediately required
     */
    public tickNeeded: Function;

    
    /**
     * The delay in milliseconds when ticking at maximum speed
     */
    public highSpeedDelay: number;

    /**
     * The delay in milliseconds when ticking at low speed
     */
    public lowSpeedDelay: number;

    private interval: number = null;

    constructor() {

    }

    /**
     * Immediately triggers a tick
     */
    public triggerTick() {
        this.event();
    }

    /**
     * Stops ticking
     */
    public stop() {
        if(this.interval != null) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    }

    /**
     * Starts ticking
     */
    public start() {
        if(this.interval == null) {

            //Setup the timer to tick
            this.interval = window.setInterval(() => {
                //Check if a tick is needed
                if(this.tickNeeded == null || this.tickNeeded()) {
                    this.event();
                }

            }, this.highSpeedDelay);
        }
    }
}
