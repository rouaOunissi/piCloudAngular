import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/modules/admin/components/sub-components/cours-component/rihem/component/course.service';
import { Course } from 'src/app/modules/admin/components/sub-components/cours-component/rihem/component/models/course.model';

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
      this.Courses = data.map(course => ({
        ...course,
        rate: course.rate || 0  // Ensure rate is defined
      }));
      this.updateVideoFilePaths();
    });
  }

  updateVideoFilePaths(): void {
    const baseUrl = 'http://localhost:8020/api/v1/cours/'; // ensure this is the base URL of your API
    this.Courses.forEach(course => {
      course.videos?.forEach(video => {
        if (video.filePath && video.filePath.includes('\\')) { // checking if the path needs conversion
          const filename = video.filePath.split('\\').pop(); // extracting the filename
          video.filePath = `${baseUrl}${course.id}/videos/${filename}`; // constructing the full URL
        }
      });
    });
  }
  



  NavigateToCourseDetails(id: number): void {
    // Log to see what's being received
    console.log("Navigating to course details with ID:", id);
    // Ensure the path matches the one in your routing configuration
    this.router.navigate(['/front/main/course-details', id])
    .then(success => console.log('Navigation Success?', success))
    .catch(err => console.error('Navigation Error:', err));
}
}
