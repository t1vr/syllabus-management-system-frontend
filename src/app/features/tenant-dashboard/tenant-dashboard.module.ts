import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TenantDashboardComponent } from './tenant-dashboard.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterModule, Routes } from '@angular/router';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzTableModule } from 'ng-zorro-antd/table';

import { OverviewComponent } from './overview/overview.component';
import { ProgramsComponent } from './programs/programs.component';
import { ProgramListComponent } from './program-list/program-list.component';
import { CourseListComponent } from './course-list/course-list.component';

const routes: Routes = [
    {
        path: '',
        component: TenantDashboardComponent,
        children: [
            { path: 'overview', component: OverviewComponent },
            { path: 'programs', component: ProgramsComponent },
            { path: '', pathMatch: 'full', redirectTo: 'overview' },

        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        NzPageHeaderModule,
        NzSpaceModule,
        NzDescriptionsModule,
        NzStatisticModule,
        NzTabsModule,
        NzGridModule,
        NzListModule,
        NzTableModule,
        RouterModule.forChild(routes)
    ],
    declarations: [TenantDashboardComponent,
        ProgramsComponent,
        CourseListComponent,
        ProgramListComponent,
    ]
})
export class TenantDashboardModule { }
