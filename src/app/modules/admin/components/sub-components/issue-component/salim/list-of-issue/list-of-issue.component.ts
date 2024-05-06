import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CommentCleanupService } from '../comment-cleanup.service';
@Component({
  selector: 'app-list-of-issue',
  templateUrl: './list-of-issue.component.html',
  styleUrls: ['./list-of-issue.component.css']
})
export class ListOfIssueComponent implements OnInit{
  
  constructor(private http:HttpClient,private commentCleanupService: CommentCleanupService ){}
  orderVariable:string='id_issue';
  issueList:any;
  texttosearch! :string;
  searchText:string='';
  ngOnInit(): void {
    this.commentCleanupService.startCleanupProcess();

    this.getAllIssue();
  
  }
 
  getAllIssue(){
    this.http.get("http://localhost:8040/api/issue").subscribe(data=>{
      this.issueList=data;

    },error=>{
      console.log(error);
    })
  }
 
 getPriorityColor(priority: string): string {
  switch (priority) {
    case 'HIGH':
      return 'red';
    case 'MEDIUM':
      return 'orange';
    case 'LOW':
      return 'yellow';
    default:
      return 'white'; // Default color
  }
}
sort(variable:string){
  this.orderVariable=variable;
}
getIssueByPriority(priority:string){
  this.http.get(`http://localhost:8040/api/issue/priority/${priority}`).subscribe(response=>{
    this.issueList=response;
    console.log(this.issueList)
  },error=>{
    console.log(error);
  })
}
getClosedIssue(status:string){
  this.http.get(`http://localhost:8040/api/issue/status/${status}`).subscribe(response=>{
    this.issueList=response;
    console.log(this.issueList)
  },error=>{
    console.log(error);
  })
}

}
