import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/modules/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-component',
  templateUrl: './edit-component.component.html',
  styleUrls: ['./edit-component.component.css']
})
export class EditComponentComponent implements OnInit {
  courseId!: number;
  course: any = {}; // Course data received from API
  formData: any = {};

  Course?: Course;

  constructor(private courseService: CourseService, private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.fetchCourseData(this.route.snapshot.params["id"]);
    console.log("id :", this.route.snapshot.params["id"]);
    
  }

  updateCourse(): void {
    this.courseService.updateCouse(this.courseId, this.formData)
      .subscribe((updatedCourse: Course) => {
        console.log('Course updated successfully:', updatedCourse);
        this.router.navigate(['/admin/main/ListCours']);
      }, error => {
        console.error('Error updating course:', error);
      });
  }

  cancel(): void {
    this.formData = { ...this.course };
  }

  fetchCourseData(courseId: number): void {
    this.courseId= courseId;
    this.courseService.getCoursebyId(courseId).subscribe((data : Course) =>{
      this.Course = data;
      this.formData = { ...data };
      console.log("his.formData",this.formData);
      
      console.log("Course : " , data);
      
    })
  }

}
