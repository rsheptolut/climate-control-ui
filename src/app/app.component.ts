import { Component, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public mobileQuery: MediaQueryList;
  public portraitQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  private portraitQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    router: Router,
  ) {
    const path = localStorage.getItem('gh-pages-redirect');
    if (path) {
      localStorage.removeItem('gh-pages-redirect');
      router.navigate([path]);
    }

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
    this.portraitQuery = media.matchMedia('(orientation: portrait)');
    this.portraitQueryListener = () => changeDetectorRef.detectChanges();
    this.portraitQuery.addListener(this.portraitQueryListener);
  }

  public get title(): string {
    return document.title;
  }
}
