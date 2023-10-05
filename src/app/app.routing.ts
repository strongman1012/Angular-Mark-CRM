import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

  // Redirect empty path to '/example'
  { path: '', pathMatch: 'full', redirectTo: 'landing' },

  // Redirect logged-in user to the '/example'
  //
  // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
  // path. Below is another redirection for that path to redirect the user to the desired
  // location. This is a small convenience to keep all main routes together here on this file.
  { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'landing' },

  // Auth routes for guests
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'confirmation-required',
        loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(
          m => m.AuthConfirmationRequiredModule),
      },
      {
        path: 'forgot-password',
        loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(
          m => m.AuthForgotPasswordModule),
      },
      {
        path: 'reset-password',
        loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(
          m => m.AuthResetPasswordModule),
      },
      {
        path: 'sign-in',
        loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(
          m => m.AuthSignInModule),
      },
      {
        path: 'sign-up',
        loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(
          m => m.AuthSignUpModule),
      },
    ],
  },

  // Auth routes for authenticated users
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'sign-out',
        loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(
          m => m.AuthSignOutModule),
      },
      {
        path: 'unlock-session',
        loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(
          m => m.AuthUnlockSessionModule),
      },
    ],
  },

  // Landing routes
  {
    path: '',
    component: LayoutComponent,
    data: {
      layout: 'empty',
    },
    children: [
      {
        path: 'home',
        loadChildren: () => import('app/modules/landing/home/home.module').then(
          m => m.LandingHomeModule),
      },
    ],
  },

  // Admin routes
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'landing',
        loadChildren: () => import('app/modules/admin_2/landing/landing.module').then(
          m => m.LandingModule),
      },
    ],
  },

  // ACM routes
  {
    path: 'acm',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'risk-analysis',
        loadChildren: () => import('app/modules/acm/risk-analysis.modules').then(
          m => m.RiskAnalysisModule),
      },
      {
        path: 'acmdashboard',
        loadChildren: () => import('app/modules/acm/dashboard.modules').then(
          m => m.DashboardModule),
      },
      {
        path: 'rule-book',
        loadChildren: () => import('app/modules/acm/rule-book.modules').then(
          m => m.RuleBookModule),
      },
      {
        path: 'master-data',
        loadChildren: () => import('app/modules/acm/master-data.modules').then(
          m => m.BusinessProcessModule),
      },
      {
        path: 'rem',
        loadChildren: () => import('app/modules/acm/rem.modules').then(
          m => m.RemModules),
      },
      {
        path: 'reports',
        loadChildren: () => import('app/modules/acm/reports.modules').then(
          m => m.ReportsComponent),
      },
    ],
  },

    // ACM routes
    {
      path: 'pam',
      canActivate: [AuthGuard],
      canActivateChild: [AuthGuard],
      component: LayoutComponent,
      resolve: {
        initialData: InitialDataResolver,
      },
      children: [
        {
          path: 'requests',
          loadChildren: () => import('app/modules/pam/requests.modules').then(
            m => m.RequestsModule),
        },
        {
          path: 'reports',
          loadChildren: () => import('app/modules/pam/reports.modules').then(
            m => m.ReportsModule),
        },
        {
          path: 'pam-dashboard',
          loadChildren: () => import('app/modules/pam/pam-dashboard.modules').then(
            m => m.PamDashboardModule),
        },
        {
          path: 'setup',
          loadChildren: () => import('app/modules/pam/setup.modules').then(
            m => m.SetupModule),
        },
      ],
    },

  // Central Users routes
  {
    path: 'central-users',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: [
      {
        path: 'system-license-management',
        loadChildren: () => import('app/modules/central-users/system-license-management.modules').then(
          m => m.SystemManagementModule),
      },
      {
        path: 'central-users-db',
        loadChildren: () => import('app/modules/central-users/central-users-db.modules').then(
          m => m.CentralUsersDbModules),
      },
    ],
  },

  // Administration routes
  {
    path: 'admin',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      initialData: InitialDataResolver,
    },
    children: 
    
    [
      {
        path: 'landing',
        loadChildren: () => import('app/modules/admin_2/landing/landing.module').then(
            m => m.LandingModule),
      },
      {
        path: 'ldap',
        loadChildren: () => import('app/modules/admin_2/ldap/ldap.module').then(
            m => m.LdapModule),
      },
      {
        path: 'roles',
        loadChildren: () => import('app/modules/admin_2/role/role.module').then(
            m => m.RoleModule),
      },
      {
        path: 'roles/ldap-titles',
        loadChildren: () => import('app/modules/admin_2/role/ldap-title/ldap-title.module').then(
            m => m.LdapTitleModule),
      },
      {
        path: 'users',
        loadChildren: () => import('app/modules/admin_2/users/admin-user.module').then(
            m => m.AdminUserModule),
      },
      {
        path: 'reporting-units/sap-system',
        loadChildren: () => import('app/modules/admin_2/reporting-units/sapsystem/sap-system.module').then(
            m => m.SapSystemModule),
      },
      {
        path: 'reporting-units/reporting',
        loadChildren: () => import('app/modules/admin_2/reporting-units/reporting/reporting.module').then(
            m => m.ReportingModule),

      },
      {
        path: 'communication',
        loadChildren: () => import('app/modules/administration/communication.module').then(
          m => m.CommunicationModule),
      },
      {
        path: 'event-viewer',
        loadChildren: () => import('app/modules/administration/event-viewer.module').then(
          m => m.EventViewerModule),
      },
      {
        path: 'settings',
        loadChildren: () => import('app/modules/administration/settings.module').then(
          m => m.SettingsModule),
      },
      {
        path: 'utilities',
        loadChildren: () => import('app/modules/administration/utilities.module').then(
          m => m.UtilitiesModule),
      },
      {
        path: 'data-sync',
        loadChildren: () => import('app/modules/administration/data-sync.module').then(
          m => m.DataSyncModule),
      },
      {
        path: 'audit-logs',
        loadChildren: () => import('app/modules/administration/audit-logs.modules').then(
          m => m.AuditLogsModule),
      },
    ],
  },

];
