import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/modules/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
declare var webkitSpeechRecognition: any;
@Component({
    selector: 'app-list-course',
    templateUrl: './list-course.component.html',
    styleUrls: ['./list-course.component.css']
})
export class ListCourseComponent implements OnInit {
    Course?: Course[];
    currentCourse : Course = {};
    currentIndex = -1;
    title = '';
    price?:number;
    starRating = 0;
  orderVariable:string='id';

    selectedCourse: any;
    editingCourse: any; // Currently being edited course
  recognition: any;
  transcription: string = ''; // Property to store transcription text
  isRecognizing: boolean = false

    constructor(private courseService: CourseService ,private http: HttpClient, private route: ActivatedRoute, private router: Router) {


    }

    ngOnInit(): void {
        this.loadCourses();
      this.recognition = new webkitSpeechRecognition();
      this.recognition.lang = 'en-US';


      this.recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log(transcript);
        this.sendMsg(transcript)

        console.log('hhhhhhhhhhhhhh',this.title);

        this.transcription += transcript ; // Append transcript to the transcription text
        this.title=this.transcription;
      };


    }

    loadCourses(): void {
        this.courseService.getAll().subscribe((data : Course[])=>{
            console.log("this.data : ", data);
            this.Course=data;
        })
    }
    ToUpdateCourse(id : number) : void{
        this.router.navigate(['/admin/main/edit',id]);
    }
    deleteCourse(id : number) : void{
        this.courseService.deleteCourse(id).subscribe(()=>{
            console.log("cours deleted");
            this.loadCourses();
        })
    }
    searchTitle(): void{
        this.currentCourse = {};
        this.currentIndex = -1;
        this.courseService.findByTitle(this.title).subscribe({next: (data)=>{
            this.Course = data;
            console.log("data:::", data);

        }})
    }
  toggleRecognition() {

    if (!this.isRecognizing) {
      this.transcription = ''; // Clear previous transcription
      this.recognition.start(); // Start recognition
    } else {
      this.recognition.stop(); // Stop recognition

     // this.convertTranscription(this.title,this.transcription); // Convert transcription when recognition is stopped
    }
    this.isRecognizing = !this.isRecognizing; // Toggle recognition flag

  }
  convertTranscription( title:string , text:string) {

  }
 /* toggleRecognition() {
    if (!this.isRecognizing) {
      this.transcription = ''; // Clear previous transcription
      this.recognition.start(); // Start recognition

      // Listen for result event and update title when recognized
      this.recognition.onresult = (event: { results: { transcript: any; }[][]; }) => {
        const result = event.results[0][0].transcript;
        this.title = result;
      };
    } else {
      this.recognition.stop(); // Stop recognition
    }
    this.isRecognizing = !this.isRecognizing; // Toggle recognition flag
  }*/


  private sendMsg(transcript: string) {
    this.title=transcript;
  }

  sort(variable: string ) {
    this.orderVariable=variable;


  }
}
