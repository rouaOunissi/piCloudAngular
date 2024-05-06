import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-details-issue',
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.css']
})
export class DetailsIssueComponent implements OnInit {

  

  @Input() issueId!: number;
  @Output() issueClicked: EventEmitter<any> = new EventEmitter<any>(); // Output event to emit issue to parent component
  imageWidth: number | undefined;
  imageHeight: number | undefined;
  issue :any;
  src:any;
  userID:number=0;
  myUser:any;
  id_user:any;
  p:number =1;
  issueList: any;
  receivedIssueId!: number;
  comments:any;
  isHidden: boolean = true;
  searchText:string='';
  myvar:any;
  @Input() passedList: any;

  


  ngOnChanges(){
    this.id_user=localStorage.getItem("userId");
    this.issueList=this.passedList;
    if(this.issueList==null){
      console.log("liste passer par user est vide")
    }else{
      console.log("user has pass a list ")
    }

  }

  

  @Output() issueChanged: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http:HttpClient, private router: Router, private ngZone: NgZone,  private route: ActivatedRoute) { }
  

  ngOnInit(): void {
    this.getAllIssue();
    console.log(localStorage.getItem("userId"))

  }
  

  passIssueToUpdate(issue:any){
    console.log("refaaaaaaaaaaaaa",issue);
    this.sendIssueToParent(issue);

  }
  sendIssueToParent(issue: any) {
    this.issueChanged.emit(issue);
  }

  public getAllIssue() {
    this.http.get("http://localhost:8040/api/issue").subscribe(response => {
      this.issueList = response;
      this.issueList.forEach((c: { id_issue: any; })=> {
        this.getIssue(c.id_issue);

      });
    }, error => {
      console.log("error while fetching data ");
    });
    console.log(this.issueList);
  }
  getIssue(id_issue:number){

 this.http.get(`http://localhost:8040/api/issue/${id_issue}`).subscribe(data=>{
      this.issue=data;
      this.userID=this.issue.id_user;
      this.getUser(this.userID);
    },error=>{
      console.log(error);
    })
  }
  getUser(id_user:number){
    this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
      this.myUser=data;
  })

  }
  logid(id_issue:number){
    console.log(id_issue)
  }
  deleteIssue(id_issue: number) {

    console.log(id_issue);
    console.log("enter aaaaaaaaaaa")
    this.http.delete(`http://localhost:8040/api/issue/delete/${id_issue}`).subscribe(
      () => {
        this.getAllIssue();
        console.log("enter bbbbbbbbbbbbbbbbbbbbbbb")

        console.log(`Issue with ID ${id_issue} deleted successfully.`);
        // Optionally, you can perform additional actions after successful deletion
      },
      (error) => {
        console.error(`Error deleting issue with ID ${id_issue}:`, error);
        // Optionally, you can handle the error accordingly
      }
    );
    
  }
  
  passIssueToNewComponent(issue: any) {
    // Example: Navigate to a new component and pass 'issue' as a parameter
    this.router.navigate(['/update'], { state: { issue } }); // Navigate to '/new-component' and pass 'issue' in the state
  }



  showCommentByIssue(id_issue:number){
    this.http.get(`http://localhost:8040/api/comment/issue/${id_issue}`).subscribe(data=>{
      this.comments=data;
      console.log(this.comments);
    },error=>{
      console.log(error)
    })


  }
  toggleCreateComment() {
    console.log("The plus icon is clicked!");
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
  sendIssueToGemeini(text:string){
    console.log("ceci va trasferer le text vers gemeini ")


    
  }
  btn_GoTOGemini_Visibility: { [key: number]: boolean } = {};
  toggleBtn_GoTOGemini_Visibility(issueID: number) {
    this.btn_GoTOGemini_Visibility[issueID] = !this.btn_GoTOGemini_Visibility[issueID];
  }
  btn_option_Visibility: { [key: number]: boolean } = {};
  toggleVisibilityOption(issueID: number) {
    this.btn_option_Visibility[issueID] = !this.btn_option_Visibility[issueID];
  }
  setIssueStatus(issue:any){
    if(this.id_user==issue.id_user){
      if(issue.status=="OPEN"){ 
    const formData = new FormData();
    formData.append("status","CLOSE");
    this.http.put(`http://localhost:8040/api/issue/update-status/${issue.id_issue}`,formData).subscribe(data => {
      console.log("updating status from open ==> close")
      this.ngOnInit();
    })
      }else{
        const formData = new FormData();
        formData.append("status","OPEN");
        this.http.put(`http://localhost:8040/api/issue/update-status/${issue.id_issue}`,formData).subscribe(data => {
          console.log("updating status from close ==> open")
          this.ngOnInit();

        })
      }
     
    }else {
      console.log("No you cant update this issue  ",)

    }

  }


}