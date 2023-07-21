import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'welcome' },
    { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
    { path: ':tenantIdentifier', loadChildren: () => import('./features/tenant-dashboard/tenant-dashboard.module').then(m => m.TenantDashboardModule) }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
