import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadComponent: () => import('./layouts/dashboard-layout/dashboard.layout').then(m => m.DashboardLayout),
        children: [
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
            },
            {
                path: 'orders',
                loadComponent: () => import('./features/orders/orders').then(m => m.Orders)
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login)
    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    }
];
