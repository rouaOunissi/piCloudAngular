import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-issue',
  templateUrl: './update-issue.component.html',
  styleUrls: ['./update-issue.component.css']
})
export class UpdateIssueComponent {
  idIssue!: number;

  mytitle = 'demo-upload-download';
  issueList : any;
  title : any;
  issueDescription:any;
  priority :any;
  uriImage :any;
  selectedFile:any;
 mypriority!:string;
  selectedPriority:any;
  myselectedPriority:any;
  myvar:any;
  issue :any;
  mydate:any;
  mystatus:any;
  myuser :any;
  ref:number = 0;
  refValue:number = 0;
  varIssueToupdate:any;
  receivedIssue: any; // Define a variable to hold the received issue
 
 
 constructor(private http:HttpClient ,private route:ActivatedRoute){

 }
   ngOnInit(): void {
 
     //  this.getIssueListe();
     this.route.params.subscribe(params => {
      this.idIssue = +params['id_issue']; // Accessing route parameter 'id_issue'
 
    });
    this.myvar=this.getMyIssueToUpdate(this.idIssue);
    console.log("testtesttesttetsttettst",this.myvar);

     
    
    console.log("testtesttest",this.issue);

 
   }
   getMyIssueToUpdate(idIssue: any) :any {
    this.http.get(`http://localhost:8040/api/issue/${idIssue}`).subscribe(data => {
      this.issue = data;
      this.title=this.issue.issueTitle;
      this.issueDescription=this.issue.issueDescription
      this.selectedPriority=this.issue.priority;
      this.mydate=this.issue.creationDate;
      this.mystatus=this.issue.status;
      this.myuser=this.issue.id_user;
    }, error => {
      console.log(error);
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

    onFileSelected(event :any){
     this.selectedFile=event.target.files[0];
     console.log("tttttttttttttt",this.selectedFile);
   }


  
 
   update():void{

    
    const formData = new FormData();
    formData.append("title",this.title);
    formData.append("description",this.issueDescription);
    formData.append("image",this.selectedFile);
    formData.append("id_user", this.myuser);
    formData.append("priority",this.selectedPriority);
    formData.append("status",this.mystatus);
   
       this.http.put(`http://localhost:8040/api/issue/update/${this.idIssue}`, formData).subscribe(response=>{
       //  this.openDialog('Issue Created Successfully');
   
         this.title="";
         this.issueDescription="";
         this.selectedFile=null;
         this.selectedPriority=null;
   
   
       },error=>{
         console.log(error);
        //  this.openDialog('Error while creating issue');
   
       });
       console.log("updated ");
     }
 }