import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NzTableSortOrder, NzTableSortFn, NzTableFilterList, NzTableFilterFn } from 'ng-zorro-antd/table';
import { ProgramDataService } from 'src/app/core/data/program.data.service';
import { listOfSemesterColumnFilter } from 'src/app/models/course.constants';
import { CourseItem, ProgramItem } from 'src/app/models/course.model';
import { BaseResponse } from 'src/app/models/response.model';

@Component({
    selector: 'app-course-list',
    templateUrl: './course-list.component.html',
    styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit, OnChanges {

    @Input() selectedProgram: ProgramItem;
    semesterColumnFilters = listOfSemesterColumnFilter;
    courseItems: CourseItem[] = [];

    constructor(private programDataService: ProgramDataService) { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes['selectedProgram'] && this.selectedProgram) {
            this.getCoursesByProgramId(this.selectedProgram.id)
        }
    }


    getCoursesByProgramId(id: number): void {
        this.programDataService.getProgramByProgramId(id)
            .subscribe((response: BaseResponse<ProgramItem>) => {
                if (response.succeeded) {
                    this.courseItems = response.data.courses;
                }
            });
    }

    sortFn = {
        sortByCourseCodeFn: (a: CourseItem, b: CourseItem) => a.courseNo.localeCompare(b.courseNo),
        sortByTitleFn: (a: CourseItem, b: CourseItem) => a.name.localeCompare(b.name),
        sortByCreditFn: (creditHours: number, item: CourseItem) => item.creditHours === creditHours,
        sortBySemesterFn: (semester: string, item: CourseItem) => item.semester.indexOf(semester) !== -1,
    }

    filterFn = {
        filterBySemesterFn: (semester: string, item: CourseItem) => item.semester.indexOf(semester) !== -1,
    }

    listOfColumns: ColumnItem[] = [
        {
            name: 'Course Code',
            sortOrder: null,
            sortFn: (a: CourseItem, b: CourseItem) => a.courseNo.localeCompare(b.courseNo),
            listOfFilter: [],
            filterFn: (list: string[], item: CourseItem) => list.some(x => item.courseNo.indexOf(x) !== -1)
        },
        {
            name: 'Title',
            sortOrder: null,
            sortFn: (a: CourseItem, b: CourseItem) => a.name.localeCompare(b.name),
            listOfFilter: [],
            filterFn: null
        },
        {
            name: 'Credit Hours',
            sortFn: null,
            sortOrder: null,
            listOfFilter: [],
            filterFn: (creditHours: number, item: CourseItem) => item.creditHours === creditHours
        },
        {
            name: 'Semester',
            sortOrder: null,
            sortFn: (a: CourseItem, b: CourseItem) => a.semester.localeCompare(b.name),
            listOfFilter: listOfSemesterColumnFilter,
            filterFn: (semester: string, item: CourseItem) => item.semester.indexOf(semester) !== -1,
        },

    ];

    trackByName(_: number, item: ColumnItem): string {
        return item.name;
    }

    sortByAge(): void {
        this.listOfColumns.forEach(item => {
            if (item.name === 'Age') {
                item.sortOrder = 'descend';
            } else {
                item.sortOrder = null;
            }
        });
    }

    resetFilters(): void {
        this.listOfColumns.forEach(item => {
            if (item.name === 'Name') {
                item.listOfFilter = [
                    { text: 'Joe', value: 'Joe' },
                    { text: 'Jim', value: 'Jim' }
                ];
            } else if (item.name === 'Address') {
                item.listOfFilter = [
                    { text: 'London', value: 'London' },
                    { text: 'Sidney', value: 'Sidney' }
                ];
            }
        });
    }

    resetSortAndFilters(): void {
        this.listOfColumns.forEach(item => {
            item.sortOrder = null;
        });
        this.resetFilters();
    }

}



interface DataItem {
    name: string;
    age: number;
    address: string;
}

interface ColumnItem {
    name: string;
    sortOrder: NzTableSortOrder | null;
    sortFn: NzTableSortFn<CourseItem> | null;
    listOfFilter: NzTableFilterList;
    filterFn: NzTableFilterFn<CourseItem> | null;
}
