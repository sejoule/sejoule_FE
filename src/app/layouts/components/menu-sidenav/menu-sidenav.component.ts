import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { Component, OnDestroy, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'portal-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})

export class MenuSidenavComponent implements OnDestroy {
  appName: string = 'CloudOne';

  menus: any[] = [
    {
      title: 'Home',
      icon: 'home',
      link: '/home'
    },
    {
      title: 'Applications',
      icon: 'apps',
      link: '/applications'
    },
    {
      title: 'Providers',
      icon: 'cloud',
      link: '/providers'
    }
  ];

  /**
   * Import material sidenav so we can access open close functions.
   */
  @Input() sidenav: MatSidenav;
  routerSubscription: Subscription;

  constructor(private router: Router) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
      )
      .subscribe((event: RouterEvent) => {
        if (this.sidenav && this.sidenav.mode === 'over' && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
