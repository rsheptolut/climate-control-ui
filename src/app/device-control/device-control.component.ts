import { Component, OnInit, ChangeDetectorRef, ViewChild, AfterViewInit, QueryList, ViewChildren } from '@angular/core';
import { Settings } from '../data/settings';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimateControlApi } from '../api/climatecontrol.api';
import { DeviceState } from '../data/device-state';
import { AppComponent } from '../app.component';
import { MediaMatcher } from '@angular/cdk/layout';
import { NgForm } from '@angular/forms';
import { pipe } from 'rxjs';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-device-control',
  templateUrl: './device-control.component.html',
  styleUrls: ['./device-control.component.scss']
})
export class DeviceControlComponent implements AfterViewInit {
  @ViewChildren('form')
  public forms: QueryList<NgForm>;
  public device: DeviceState;
  public deviceId: string;
  public mobileQuery: MediaQueryList;
  public portraitQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  private portraitQueryListener: () => void;
  public dontSaveSettings = true;
  public lastForceCommand: string;
  public lastBusyCommand: string;
  public intervals = [ 0, 15, 30, 60 ];
  public intervalIndex = 0;

  constructor(
    activatedRoute: ActivatedRoute,
    private climateControlApi: ClimateControlApi,
    private router: Router,
    media: MediaMatcher,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    activatedRoute.paramMap.subscribe(async p => {
      this.deviceId = p.get('id');
      this.device = await climateControlApi.getDevice(this.deviceId);
      setTimeout(() => this.dontSaveSettings = false, 1000);
    });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.portraitQuery = media.matchMedia('(orientation: portrait)');
    this.portraitQueryListener = () => changeDetectorRef.detectChanges();
    this.portraitQuery.addListener(this.portraitQueryListener);
  }

  ngAfterViewInit(): void {
    this.forms.changes.subscribe((forms) => {
      this.forms.first.valueChanges.pipe(
        debounceTime(500),
        switchMap(v => this.saveSettings()),
      ).subscribe(() => {});
    });
  }

  get updateDate(): string {
    const date = new Date(this.device.state.lastReading);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  }

  public goToSettings(): void {
    this.router.navigate([`device/${this.deviceId}/settings`]);
  }

  public turnOnOffLabel(command: string): string {
    const interval = this.intervals[this.intervalIndex];
    const offon = command === 'TurnOff' ? 'off' : 'on';
    if (interval && command === this.lastForceCommand) {
      return 'Keep turned ' + offon + ' for ' + interval + ' min';
    } else {
      return 'Turn ' + offon;
    }
  }

  public async turnOnOff(command: string): Promise<void> {
    if (this.lastForceCommand !== command) {
      this.lastForceCommand = command;
      this.intervalIndex = 0;
    }

    const interval = this.intervals[this.intervalIndex];
    this.intervalIndex++;
    if (this.intervalIndex >= this.intervals.length) {
      this.intervalIndex = 0;
    }

    await this.climateControlApi.turnOnOff(this.deviceId, command, interval);
  }

  public async test(): Promise<void> {
    await this.climateControlApi.turnOnOff(this.deviceId, 'Test', 0);
  }

  public async saveSettings(): Promise<void> {
    if (!this.dontSaveSettings) {
      this.climateControlApi.saveSettings(this.device.settings);
    }
  }
}
