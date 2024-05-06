import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  @Input() idIssue!:number;
  userID:number=0;
  issue:any;
  myUser:any;
  constructor(private http:HttpClient ){}

  ngOnInit(): void {

    this.getIssueByID(this.idIssue);
  }
  getIssueByID(id_issue:any){
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
 

}
