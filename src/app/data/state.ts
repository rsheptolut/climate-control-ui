export class State {
    constructor(
        public lastTemperature?: number,
        public lastAverageTemperature?: number,
        public lastCommand?: string,
        public lastCommandTime?: Date,
        public lastCommandTemperature?: number,
        public lastReading?: Date,
        public isDayTime?: boolean,
    ) {}
}
