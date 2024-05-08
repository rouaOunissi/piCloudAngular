import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {

  course: any = {};
  files: File[] = [];
  starRating = 0;

  constructor(private courseService: CourseService, private router: Router){}

  onSubmit() {
    const courseStr = JSON.stringify(this.course);
    if (courseStr && this.files.length > 0) {
      this.courseService.createCourse(courseStr, this.files)
        .subscribe(
          response => {
            console.log('Course created successfully:', response);
            this.router.navigate(['/admin/main/ListCours']);
          },
          error => {
            console.error('Error creating course:', error);
          }
        );
    } else {
      console.error('Please fill in all required fields');
      // Display error message to the user
    }
  }

  onFileSelected(event: any) {
    this.files = event.target.files;
  }
}
