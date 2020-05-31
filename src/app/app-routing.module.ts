import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeviceControlComponent } from './device-control/device-control.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceSettingsComponent } from './device-settings/device-settings.component';

const routes: Routes = [
  {
    path: 'devices',
    component: DeviceListComponent,
  },
  {
    path: 'device/:id',
    component: DeviceControlComponent,
  },
  // {
  //   path: 'device/{:id}/settings',
  //   component: DeviceSettingsComponent,
  // },
  {
      path: '**',
      redirectTo: '/devices',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
