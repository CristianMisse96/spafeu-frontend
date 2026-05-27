import { Routes } from "@angular/router";
import { DashboardUserLayoutComponent } from "./layout/dashboard-user-layout/dashboard-user-layout.component";
import { DashboardUserHome } from "./pages/dashboard-user-home/dashboard-user-home";
import { kycGuard } from "./guards/kyc.guard";
import { roleGuard } from "@shared/guards/role-guard";
import { OnBoarding } from "./pages/on-boarding/on-boarding";
import { ExcersiseList } from "./pages/excersise-list/excersise-list";


export const dashboardUserRoutes: Routes = [
    {
        path:'',
        component: DashboardUserLayoutComponent,
        canActivateChild: [kycGuard],
        children:[
            {
                path: 'on-boarding',
                data: { roles: ['ROLE_USER'] },
                canActivate: [roleGuard],
                component: OnBoarding
            },
            {
                path: 'home',
                data: { roles: ['ROLE_USER'] },
                canActivate: [roleGuard],
                component: DashboardUserHome
            },

            {
                path: 'excercises',
                component: ExcersiseList
            },
            {
                path: '**',
                redirectTo: 'home'
            },
        ]
    },
];

export default dashboardUserRoutes;
