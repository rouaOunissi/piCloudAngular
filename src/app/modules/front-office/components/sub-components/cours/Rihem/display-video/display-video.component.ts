import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";





@Component({
  selector: 'app-display-video',
  templateUrl: './display-video.component.html',
  styleUrls: ['./display-video.component.css']
})
export class DisplayVideoComponent implements OnInit {
  videoUrl: string | undefined;
  condition = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // No need to fetch video here, it will be fetched when the button is clicked
  }

  fetchVideo(): void {
    const courseId = 1;
    this.http.get('http://localhost:8020/api/v1/cours/1/video', { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          this.videoUrl = URL.createObjectURL(response);
          this.condition = true; // Set condition to true after successfully fetching the video
        },
        (error) => {
          console.error('Error fetching video:', error);
        }
      );
  }

  route(): void {
    console.log('Video ended'); // This is a placeholder, you can define your routing logic here
  }

  onClick(): void {
    this.fetchVideo(); // Call fetchVideo when the button is clicked
  }

}
