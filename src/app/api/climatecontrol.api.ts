import { Settings } from '../data/settings';
import { ApiClient } from '../utils/api-client';
import { Injectable } from '@angular/core';
import { DeviceState } from '../data/device-state';

@Injectable()
export class ClimateControlApi {
    constructor(private apiClient: ApiClient) {
    }

    public async getDevice(deviceId: string): Promise<DeviceState> {
        return await this.apiClient.get<DeviceState>(`device-state/${deviceId}`);
    }

    public async saveSettings(settings: Settings): Promise<void> {
        await this.apiClient.post<void>(`settings`, settings);
    }

    public async turnOnOff(deviceId: string, turnOn: boolean): Promise<DeviceState> {
        return await this.apiClient.get<DeviceState>(`turnOnOff/${deviceId}`, { command: turnOn ? 'TurnOn' : 'TurnOff' });
    }
}
