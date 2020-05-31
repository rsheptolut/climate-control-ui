export class Settings {
    constructor(
        public name?: string,
        public automationOn?: boolean,
        public onDuringDay?: boolean,
        public onDuringNight?: boolean,
        public averageOverMinutes?: boolean,
        public nightTempOff?: number,
        public nightTempOn?: number,
        public dayTempOff?: number,
        public dayTempOn?: number,
        public nightTimeStart?: string,
        public dayTimeStart?: string,
        public timeoutBetweenSameCommandHours?: number,
        public temperatureStep?: number,
        public fakeAverageTemperature?: number,
        public sensorKey?: string,
        public webhookKey?: string,
        public commandOn?: string,
        public commandOff?: string,
    ) {}
}
