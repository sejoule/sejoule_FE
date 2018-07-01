import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

import { LayoutClassicComponent } from './layouts/layout-classic/layout-classic.component';
import { LayoutTabbedComponent } from './layouts/layout-tabbed/layout-tabbed.component';
import { LayoutBoxedComponent } from './layouts/layout-boxed/layout-boxed.component';
import { LayoutCompactComponent } from './layouts/layout-compact/layout-compact.component';
import { LayoutToolbarComponent } from './layouts/layout-toolbar/layout-toolbar.component';
import { LayoutFunkyComponent } from './layouts/layout-funky/layout-funky.component';
import { AuthenticationGuard } from './guards/authenticationGuard.component';

const routes: Routes =
[
  {
    path: 'login',
    redirectTo: '/external/login'
  },
  {
    path: '',
    data: {
      base: true
    },
    canActivate: [AuthenticationGuard],
    component: LayoutClassicComponent,
    children: [
      {
        path: '',
        loadChildren: './dashboards/dashboards.module#DashboardsModule'
      },
      {
        path: 'home',
        loadChildren: './dashboards/dashboards.module#DashboardsModule'
      },
      {
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
      },
      // {
      //   path: 'portal-examples',
      //   loadChildren: './portal-examples/portal-examples.module#PortalExamplesModule'
      // },
      // {
      //   path: 'rxjs',
      //   loadChildren: './rxjs/rxjs.module#RxjsModule'
      // },
      // {
      //   path: 'apps',
      //   loadChildren: './apps/apps.module#AppsModule'
      // },
      // {
      //   path: 'elements',
      //   loadChildren: './elements/elements.module#ElementsModule'
      // },
      // {
      //   path: 'ui',
      //   loadChildren: './users-interface/users-interface.module#UserInterfaceModule'
      // },
    ],
    // canActivateChild: [AuthenticationGuard]
  },
  {
    path: 'external',
    loadChildren: './external-pages/external-pages.module#ExternalPagesModule'
  },
  {
    path: '**',
    redirectTo: '/external/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  entryComponents: [
    LayoutToolbarComponent,
    LayoutCompactComponent,
    LayoutBoxedComponent,
    LayoutFunkyComponent,
    LayoutTabbedComponent
  ]
})
export class AppRoutingModule {
  constructor(private router: Router) {
    /**
     * This allows us to switch layouts using the layout switcher.
     */
    const baseRoute = this.router.config.find(route => route.data !== undefined && route.data.base === true);
    switch (sessionStorage.getItem('portal-layout')) {
      case 'toolbar':
        baseRoute.component = LayoutToolbarComponent;
      break;
      case 'compact':
        baseRoute.component = LayoutCompactComponent;
      break;
      case 'boxed':
        baseRoute.component = LayoutBoxedComponent;
      break;
      case 'funky':
        baseRoute.component = LayoutFunkyComponent;
      break;
      case 'tabbed':
        baseRoute.component = LayoutTabbedComponent;
      break;
      default:
        // Do nothing.
      break;
    }
  }
}
