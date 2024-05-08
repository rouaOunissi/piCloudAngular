import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  @Input() id_comment!:number;
  listUser:any;
  myUser:any;
  userID:any;
  myUserD:any;
  myTestUser:any;
  constructor(private http:HttpClient){}
  userDetailsList: {[key: number]: any} = {};

  ngOnInit(): void {
    this.http.get(`http://localhost:8040/api/react/comment/${this.id_comment}`).subscribe(data=>{
      this.listUser=data;
      this.listUser.forEach((c: { id_user: any; })=> {
        this.getUserD(c.id_user);


      });
    },error=>{
      console.log(error)
    })
  }
  getUserD(id_user:number){
    this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
      this.myUserD=data;

      this.userDetailsList[id_user] = this.myUserD;    

  })



  }

  getUserImage(commentId:any):any{
    return this.userDetailsList[commentId].image   ;

  }
  getValueOfuser(issueID : any):string{
    // this.myUserImageURI= this.userDetailsList[issueID].image; 
     return this.userDetailsList[issueID].firstName +' '+ this.userDetailsList[issueID].lastName  ;
   }

}
