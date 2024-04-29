import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/modules/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.css']
})
export class DisplayVideoComponent implements OnInit {
  videoUrl: string | undefined;
  condition = false;

  Courses: Course[] = []; 
  starRating = 2; 

  constructor(private courseService: CourseService, private http: HttpClient, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      console.log("data: ", data);
      this.Courses = data;
      this.updateVideoFilePaths(); 
    });
  }

  updateVideoFilePaths(): void {
    const baseUrl = 'http://localhost:8020/'; 
    this.Courses.forEach(Courses => {
      if (Courses.videos && Courses.videos.length > 0) {
        Courses.videos.forEach(video => {
          if (video.filePath && video.filePath.startsWith('D:\\ArcTic2\\piCloud\\uploads\\')) {
            video.filePath = baseUrl + video.filePath.substring('D:\\ArcTic2\\piCloud\\uploads\\'.length).replace(/\\/g, '/');
          }
        });
      }
    });
  }
  NavigateToCourseDetails(id : number) : void{
    this.router.navigate(['front/main/course-details/',id]);
  }
}
