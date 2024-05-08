import { HttpClient } from '@angular/common/http';
import { Component, Directive, Input, OnInit, SimpleChanges } from '@angular/core';
import { Comment } from '@angular/compiler';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})

export class CommentComponent implements OnInit {
  iconColor: string = 'black'; // Default color

  @Input() issueID!:number;
  user:any;
  myvar  :any; 
  c:any;
  p:number=1;
  myvar1  :any;
  myValue:any;
  myUserD:any;
  myTestComment:any;
  comments:any;
  commentsSize!:number;
  reactSize!:number;
  heartColor: string = 'black';
  comment:any;
  userID:number=0;
  myUser:any;
  res: any ;
  nbr_like!:any;
  constructor (private http:HttpClient){}
  userDetailsList: {[key: number]: any} = {};

  ngOnInit(): void {
    this.http.get(`http://localhost:8040/api/comment/issue/${this.issueID}`).subscribe(data=>{
      this.comments=data;
      this.comments.forEach((c: { id_comment: any; })=> {
        this.getComment(c.id_comment);
        this.getUserD(c.id_comment);


      });
      this.commentsSize=this.comments.length;
      console.log("Size of comments:", this.commentsSize); // Log the size of comments array

    },error=>{
      console.log(error)
    })
  }
  getUserD(id_comment:number){
    this.http.get(`http://localhost:8040/api/comment/${id_comment}`).subscribe(data=>{
      this.myTestComment=data;
      this.userID=this.myTestComment.id_user;
      this.http.get(`http://localhost:8010/api/v1/users/user/user/${this.userID}`).subscribe(data=>{
      this.myUserD=data;

      this.userDetailsList[id_comment] = this.myUserD;    

  })


    },error=>{
      console.log(error);
    })



  }
  getComment(id_comment:number){

    this.http.get(`http://localhost:8040/api/comment/${id_comment}`).subscribe(data=>{
         this.comment=data;
         this.userID=this.comment.id_user;
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
  refreshData(): void {
    this.ngOnInit();
    // Implement logic to refresh data, for example fetching comments again
    console.log("Refreshing data...");
  }
  getUserImage(commentId:any):any{
    return this.userDetailsList[commentId].image   ;

  }
  getValueOfuser(issueID : any):string{
    // this.myUserImageURI= this.userDetailsList[issueID].image; 
     return this.userDetailsList[issueID].firstName +' '+ this.userDetailsList[issueID].lastName  ;
   }

}

 



