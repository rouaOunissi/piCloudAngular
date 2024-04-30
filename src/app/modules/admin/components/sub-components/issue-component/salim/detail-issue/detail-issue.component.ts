import { HttpClient, HttpParams } from '@angular/common/http';
import {  ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { raceWith } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-issue',
  templateUrl: './detail-issue.component.html',
  styleUrls: ['./detail-issue.component.css']
})
export class DetailIssueComponent implements OnInit {
  @Input() idIssue!:number;
  comments:any;
  id_user:number=2;
  c:any;
  comment:any;
  issue:any;
  response:any;
  page:number =1;
  isHidden: boolean = true;
  mycomment:any;
  comment_text:any;
  myreact:any;
  reacts:any
  nbrReact:any;
  comment_id:any;
  nbrTotalReact:number=0;
  constructor(private http:HttpClient ,private route:ActivatedRoute,private cdr: ChangeDetectorRef){

  }

  ngOnInit(): void {
    this.getIssueByID(this.idIssue);
    this.http.get(`http://localhost:8040/api/comment/issue/${this.idIssue}`).subscribe(data=>{
      this.comments=data; 
      this.comments.forEach((c: { id_comment: any; })=> {
        this.verifyNumberReact(c.id_comment);


      });
    },error=>{
      console.log(error)
    });
  }


  commentVisibility: { [key: number]: boolean } = {};
  toggleCommentVisibility(commentId: number) {
    this.commentVisibility[commentId] = !this.commentVisibility[commentId];
  }


    getIssueByID(id_issue:any){
      this.http.get(`http://localhost:8040/api/issue/${id_issue}`).subscribe(data=>{
        this.issue=data;
      },error=>{
        console.log(error);
      })
    }
   
    deletecomment(id_comment:any){
      this.http.delete(`http://localhost:8040/api/comment/delete/${id_comment}`).subscribe(
        () => {
          this.getAllComment(this.idIssue);
          console.log(`Issue with ID ${id_comment} deleted successfully.`);
          // Optionally, you can perform additional actions after successful deletion
        },
        (error) => {
          console.error(`Error deleting issue with ID ${id_comment}:`, error);
          // Optionally, you can handle the error accordingly
        }
      );
       

    } 
    getAllComment(idIssue:any){
      this.http.get(`http://localhost:8040/api/comment/issue/${idIssue}`).subscribe(data=>{
      this.comments=data;
     
      this.getAllComment(idIssue);
     
    },error=>{
      console.log(error)
    })
    }
   
    commentReact: {[key: number]: number} = {};

   
    
    verifyNumberReact(id_comment:any):number{
      this.http.get(`http://localhost:8040/api/comment/comment-id/${id_comment}`).subscribe(data=>{
        this.nbrReact=data;
        this.commentReact[id_comment] = this.nbrReact 

      },error=>{
        console.log(error)
      });
      return this.nbrReact;

    }
  
    getValueOfreact(commentId : any):number{
      return this.commentReact[commentId] || 0;

    }
  
  

}


