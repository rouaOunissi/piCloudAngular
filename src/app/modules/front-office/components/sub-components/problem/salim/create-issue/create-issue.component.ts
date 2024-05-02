import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import BadWordsFilter from 'bad-words';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.css']
})
export class CreateIssueComponent implements OnInit {
  id_user:any;
  recognition: any;
  transcription: string = ''; // Property to store transcription text
  isRecognizing: boolean = false; // Flag to track whether recognition is in progress
  badWordsFilter: any; // Bad words filter instance
  mytitle = 'demo-upload-download';
  
  issueList : any;
  title : string='';
  issueDescription:any;
  priority :any;
  uriImage :any;
  selectedFile:any;
  mypriority!:string;
  selectedPriority:any;
  myselectedPriority:any;
  myIssueContent:string='';
  filteredTranscription:string='';
  issue :any;
  ref:number = 0;
  refValue:number = 0;
  varIssueToupdate:any;
  receivedIssue: any; // Define a variable to hold the received issue
  @Output() dataSaved: EventEmitter<void> = new EventEmitter<void>();

 
 constructor(private http:HttpClient){
  this.recognition = new webkitSpeechRecognition();
  this.recognition.lang = 'en-US';
  this.badWordsFilter = new BadWordsFilter();

  this.recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    console.log(transcript); // Display recognized text
    this.transcription += transcript + ' '; // Append transcript to the transcription text
  };
 }
   ngOnInit(): void {
      console.log(localStorage.getItem("userId"));
      this.id_user=localStorage.getItem("userId");
     //  this.getIssueListe();
     
       //this.getMyIssue();
 
     
 
 
   }
   onIssueChanged(issueToUpdate: any) {
     // Handle the received issue here in the parent component
     console.log('Received issue from child component eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee:', issueToUpdate);
     this.updateIssue(issueToUpdate);
 
   }
   updateIssue(issueToupdate:any){
     this.varIssueToupdate=issueToupdate
     this.title=issueToupdate.issueTitle;
       this.issueDescription=issueToupdate.issueDescription;
       this.selectedFile=null;
       this.selectedPriority=issueToupdate.priority;
       this.ref=1;
       console.log("test ref",this.ref)
 
   }
  
   private getIssueListe() {
     this.http.get("http://localhost:8040/api/issue").subscribe(response => {
       this.issueList = response;
       console.log(this.issueList);
     }, error => {
       console.log("error while fetching data ");
     });
   }
  
   onPriorityChange(event: any) {
     // Access the value of selectedPriority
     console.log('Selected Priority:', this.selectedPriority);
     // You can use this.selectedPriority for further processing
   }onmyPriorityChange(event: any) {
     // Access the value of selectedPriority
     console.log('Selected Priority:', this.myselectedPriority);
     // You can use this.selectedPriority for further processing
   }
   getIssueData(data:any){}
   onFileSelected(event :any){
     this.selectedFile=event.target.files[0];
   }
 
  
 
     getMyIssue(){
       this.http.get("http://localhost:8040/api/issue/user/1").subscribe(response => {
         this.issueList = response;
         console.log(this.issueList);
         console.log("all my issue ")
       }, error => {
         console.log("error while fetching data ");
       });   
      }
      getIssueWithPtiority(){
       this.mypriority=this.myselectedPriority;
       this.http.get(`http://localhost:8040/api/issue/priority/${this.mypriority}`).subscribe(response => {
         this.issueList = response;
         console.log(this.issueList);
         console.log("list of ",this.mypriority)
       }, error => {
         console.log("error while fetching data ");
       });   
      }
    
    
      toggleRecognition() {
        if (!this.isRecognizing) {
          this.transcription = ''; // Clear previous transcription
          this.recognition.start(); // Start recognition
        } else {
          this.recognition.stop(); // Stop recognition
          this.convertTranscription(); // Convert transcription when recognition is stopped
        }
        this.isRecognizing = !this.isRecognizing; // Toggle recognition flag
      }
      convertTranscription() {
        // Perform any further processing or conversion of the transcription text here
        // For example, you can filter out bad words using the BadWordsFilter
         this.filteredTranscription = this.badWordsFilter.clean(this.transcription);
        console.log('Filtered Transcription:', this.filteredTranscription);
      }
 
      save(){
        if (this.title.length >= 4 && this.title.trim() !== '') {
        if(this.filteredTranscription != ''){
          this.myIssueContent=this.filteredTranscription;
        }else{
          this.myIssueContent=this.issueDescription;
        }
        
        const formData = new FormData();
        formData.append("title",this.title);
        formData.append("description",this.myIssueContent);
        formData.append("image",this.selectedFile);
        formData.append("id_user",this.id_user.toString());
        console.log("ppppppppppppppppppppppppp",this.selectedFile);
        formData.append("priority",this.selectedPriority);
    
        this.http.post("http://localhost:8040/api/issue",formData).subscribe(response=>{
          console.log("saved");
          this.dataSaved.emit();
 
        //  this.openDialog('Issue Created Successfully');
    
          this.title="";
          this.issueDescription="";
          this.selectedFile=null;
          this.selectedPriority=null;
          this.getIssueListe();
    
    
        },error=>{
          console.log(error);
         //  this.openDialog('Error while creating issue');
    
        });
      }
    else{
      window.alert("in this life  each issue shoul have one TITLE")
    }
    }
 
   @Input()
   getBorderColor(): string {
     switch (this.issue.priority) {
       case 'HIGH':
         return 'red';
       case 'MEDIUM':
         return 'orange';
       case 'LOW':
         return 'yellow';
       default:
         return 'transparent';
     }
   } 
 
 }