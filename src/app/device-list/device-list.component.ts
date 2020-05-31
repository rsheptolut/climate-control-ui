import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: ['./device-list.component.scss']
})
export class DeviceListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let apiKey = localStorage.getItem('apiKey');
    if (!apiKey) {
      apiKey = prompt('An API_KEY is required for this to work. Please enter below.');
      if (apiKey) {
        localStorage.setItem('apiKey', apiKey);
      }
    }
    this.router.navigate(['device', 'my-only-device']);
  }
}
