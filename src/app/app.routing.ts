import { Route } from '@angular/router'
import { AuthGuard } from 'app/core/auth/guards/auth.guard'
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard'
import { LayoutComponent } from 'app/layout/layout.component'
import { InitialDataResolver } from 'app/app.resolvers'
import { Error404Component } from './modules/errors/error-404/error-404.component'

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/example'
    { path: '', pathMatch: 'full', redirectTo: 'dashboard' },

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'dashboard' },

    // Auth routes for guests
    {
        path: '',
        canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import('app/modules/auth/confirmation-required/confirmation-required.module').then(
                        (m) => m.AuthConfirmationRequiredModule
                    ),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import('app/modules/auth/forgot-password/forgot-password.module').then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then((m) => m.AuthResetPasswordModule),
            },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then((m) => m.AuthSignInModule) },
            // { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then((m) => m.AuthSignUpModule) },
        ],
    },

    // Auth routes for authenticated users
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then((m) => m.AuthSignOutModule) },
            {
                path: 'unlock-session',
                loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then((m) => m.AuthUnlockSessionModule),
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
        children: [{ path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then((m) => m.LandingHomeModule) }],
    },

    // Admin routes
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: '404',
                loadChildren: () => import('app/modules/errors/error-404/error-404.module').then((m) => m.Error404Module),
            },
            {
                path: 'dashboard',
                loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then((m) => m.DashboardModule),
            },
            {
                path: 'file-manager',
                loadChildren: () => import('app/modules/apps/file-manager/file-manager.module').then((m) => m.FileManagerModule),
            },
            {
                path: 'programmi',
                loadChildren: () => import('app/modules/admin/programmi/programmi.module').then((m) => m.ProgrammiModule),
            },
            {
                path: 'users',
                loadChildren: () => import('app/modules/admin/user/user.module').then((m) => m.UserModule),
            },
            {
                path: 'roles',
                loadChildren: () => import('app/modules/admin/role/role.module').then((m) => m.RoleModule),
            },
            {
                path: 'case-studies',
                loadChildren: () => import('app/modules/admin/casestudy/casestudy.module').then((m) => m.CasestudyModule),
            },
            {
                path: 'clients',
                loadChildren: () => import('app/modules/admin/client/client.module').then((m) => m.ClientModule),
            },
            {
                path: 'categories',
                loadChildren: () => import('app/modules/admin/category/category.module').then((m) => m.CategoryModule),
            },
            {
                path: 'reviews',
                loadChildren: () => import('app/modules/admin/review/review.module').then((m) => m.ReviewModule),
            },
            {
                path: 'teams',
                loadChildren: () => import('app/modules/admin/team/team.module').then((m) => m.TeamModule),
            },
            {
                path: 'messages',
                loadChildren: () => import('app/modules/admin/message/message.module').then((m) => m.MessageModule),
            },
            {
                path: 'blogs',
                loadChildren: () => import('app/modules/admin/blog/blog.module').then((m) => m.BlogModule),
            },
            /** Don't delete used by generate-crud */
        ],
    },

    { path: '**', redirectTo: '404' }
]
