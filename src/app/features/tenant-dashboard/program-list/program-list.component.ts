import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramDataService } from 'src/app/core/data/program.data.service';
import { CourseItem, ProgramItem } from 'src/app/models/course.model';
import { BaseResponse } from 'src/app/models/response.model';

@Component({
    selector: 'app-program-list',
    templateUrl: './program-list.component.html',
    styleUrls: ['./program-list.component.css']
})
export class ProgramListComponent implements OnInit {

    tenantIdentifier: string;
    programs: ProgramItem[] = [];
    course: CourseItem;
    firstProgram: ProgramItem;
    @Output() onProgramSelected = new EventEmitter<ProgramItem>();

    constructor(private activatedroute: ActivatedRoute,
        private programDataService: ProgramDataService) { }

    ngOnInit() {
        this.tenantIdentifier = this.activatedroute.snapshot.paramMap.get("tenantIdentifier") as string;
        this.getProgramsByTenantId();
    }

    getProgramsByTenantId(): void {
        this.programDataService.getAllPrograms()
            .subscribe((response: BaseResponse<ProgramItem[]>) => {
                this.programs = response.data;
                if (this.programs.length > 0) {
                    this.firstProgram = this.programs[0];
                    this.onProgramSelected.emit(this.firstProgram);
                }
            });
    }

    loadRelatedCourses(program: ProgramItem) {
        this.onProgramSelected.emit(program);
    }
}
