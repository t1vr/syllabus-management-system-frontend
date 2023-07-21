import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseItem, ProgramItem } from 'src/app/models/course.model';
import { BaseResponse } from 'src/app/models/response.model';
import { ProgramDataService } from '../../core/data/program.data.service';

@Component({
    selector: 'app-tenant-dashboard',
    templateUrl: './tenant-dashboard.component.html',
    styleUrls: ['./tenant-dashboard.component.css']
})
export class TenantDashboardComponent {

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute) {
    }

    goTo(path: string): void {
        console.log(this.activatedRoute)
        this.router.navigate([path], { relativeTo: this.activatedRoute });
    }

    goToOverview(): void {
        this.router.navigateByUrl("/root");
    }
    goToPrograms(): void {
        this.router.navigateByUrl("/root/programs");
    }
}
