import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
  courseId!: number;
  course: any = {}; // Course data received from API
  formData: any = {};

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch initial course data
    this.fetchCourseData(this.courseId);
  }

  updateCourse(): void {
    // Send updated course data to the server
    this.http.put(`http://localhost:8020/api/v1/cours/${this.courseId}`, this.formData).subscribe(
        () => {
          console.log('Course updated successfully');
          // Optionally, you can reload the course data after update
          this.fetchCourseData(this.courseId);
        },
        (error) => {
          console.error('Error updating course:', error);
        }
    );
  }

  cancel(): void {
    // Reset formData to original course data
    this.formData = { ...this.course };
  }

  // Fetch course data from the server
  fetchCourseData(courseId: number): void {
    // Make HTTP request to fetch course data by ID
    this.http.get(`http://localhost:8020/api/v1/cours/${courseId}`).subscribe(
        (data) => {
          this.course = data;
          // Optionally, you can assign the fetched data to formData for editing
          this.formData = { ...this.course };
        },
        (error) => {
          console.error('Error fetching course data:', error);
        }
    );
  }

}
