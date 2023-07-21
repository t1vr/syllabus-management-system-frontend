import { CourseItem, ProgramItem } from './../../../models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-programs',
    templateUrl: './programs.component.html',
    styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

    selectedProgram: ProgramItem;

    constructor() { }

    ngOnInit() {
    }

    onProgramChanges($event: ProgramItem) {
        this.selectedProgram = $event;
    }
}
