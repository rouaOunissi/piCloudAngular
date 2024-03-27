import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
    selector: 'app-list-course',
    templateUrl: './list-course.component.html',
    styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
    cours: any;
    selectedCourse: any;
    editingCourse: any; // Currently being edited course

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        this.loadCourses();
    }

    loadCourses(): void {
        this.http.get("http://localhost:8020/api/v1/cours/all").subscribe(data => {
            this.cours = data;
        }, error => {
            console.log(error);
        });
    }

    editCourse(course: any): void {
        // Create a copy to avoid modifying original data
        this.editingCourse = { ...course };
    }

    cancelEdit(): void {
        this.editingCourse = null;
    }

    updateCourse(): void {
        // Send updated course data to the server (using EditCourseComponent emitted data)
        this.http.put(`http://localhost:8020/api/v1/cours/${this.editingCourse.id}`, this.editingCourse).subscribe(() => {
            this.loadCourses(); // Reload courses after successful update
            this.editingCourse = null; // Reset editingCourse
        }, error => {
            console.error('Error updating course:', error);
        });
    }

    deleteCourse(courseId: number): void {
        if (confirm('Are you sure you want to delete this course?')) {
            this.http.delete(`http://localhost:8020/api/v1/cours/${courseId}`).subscribe(() => {
                this.loadCourses();
            }, error => {
                console.error('Error deleting course:', error);
            });
        }
    }

    toggleDetails(course: any) {
        this.selectedCourse = this.selectedCourse === course ? null : course;
    }
}
