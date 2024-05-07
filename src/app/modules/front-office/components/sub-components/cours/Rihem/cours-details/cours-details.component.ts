import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/modules/admin/components/sub-components/cours-component/rihem/component/course.service';
import { Course } from 'src/app/modules/admin/components/sub-components/cours-component/rihem/component/models/course.model';

interface Video {
  id: number;
  title: string;
  url: string;
}

@Component({
  selector: 'app-cours-details',
  templateUrl: './cours-details.component.html',
  styleUrls: ['./cours-details.component.css']
})
export class CoursDetailsComponent implements OnInit {

  courseId!: number;
  course?: Course;
  formData: any = {};
  videos: Video[] = [];

  selectedVideoId: number = 1;

  constructor(private sanitizer: DomSanitizer,private courseService: CourseService, private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    this.fetchCourseData(this.route.snapshot.params["id"]);
  }

  fetchCourseData(courseId: number): void {
    this.courseId = courseId;
    this.courseService.getCoursebyId(courseId).subscribe(
      (data: Course) => {
        this.formData = [data];

        this.videos = [];

        this.formData.forEach((course: any) => {
          if (course.videos && Array.isArray(course.videos)) {
            course.videos.forEach((video: any) => {
              this.videos.push({
                id: video.id,
                title: course.title || 'Untitled',
                url: video.filePath
              });
            });
          }
        });

        this.updateVideoFilePaths();
      },
      (error: any) => {
        console.error('Error fetching course data:', error);
      }
    );
  }



  updateVideoFilePaths(): void {
    const baseUrl = 'http://localhost:8020/';

    this.videos.forEach((video: Video) => {
      if (video.url.startsWith('D:\\ArcTic2\\piCloud\\uploads\\')) {
        video.url = baseUrl + video.url.substring('D:\\ArcTic2\\piCloud\\uploads\\'.length).replace(/\\/g, '/');

      }
    });
  }


  get selectedVideoUrl(): SafeResourceUrl | undefined {
    const selectedVideo = this.videos.find(v => v.id === this.selectedVideoId);
    return selectedVideo ? this.sanitizeVideoUrl(selectedVideo.url) : undefined;
  }

  selectVideo(videoId: number) {
    this.selectedVideoId = videoId;
  }
  sanitizeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  buyCourse() {
    if (this.courseId > 0) {
      // Navigate relative to the current route
      this.router.navigate(['purchase'], { relativeTo: this.route });
    } else {
      console.error('Course ID is missing or invalid');
    }
  }

}
