import { HttpClient, HttpParams } from '@angular/common/http';
import {  ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { raceWith } from 'rxjs';

@Component({
  selector: 'app-display-all-comment',
  templateUrl: './display-all-comment.component.html',
  styleUrls: ['./display-all-comment.component.css'],
})
export class DisplayAllCommentComponent implements OnInit {
  idIssue!:number;
  comments:any;
  id_user:any;
  c:any;
  comment:any;
  issue:any;
  response:any;
  myUser:any;
  userID:number=0;
  page:number =1;
  isHidden: boolean = true;
  mycomment:any;
  comment_text:any;
  myreact:any;
  reacts:any
  nbrReact:any;
  comment_id:any;
  nbrTotalReact:number=0;
  myvarcomment:any;
  myvaruserid:number=1;
  myUserD:any;
  myvaruser:any;
  myTestComment:any;
  postUser:any;
  postUserID:any;
  myConnectedUser:any;
  constructor(private http:HttpClient ,private route:ActivatedRoute,private cdr: ChangeDetectorRef){

  }
  userDetailsList: {[key: number]: any} = {};

  ngOnInit(): void {
    this.id_user=localStorage.getItem("userId");
    this.route.params.subscribe(params => {
      this.idIssue = +params['id_issue']; 
      this.getIssueByID(this.idIssue);
      this.http.get(`http://localhost:8040/api/comment/issue/${this.idIssue}`).subscribe(data=>{
        this.comments=data; 
        this.comments.forEach((c: { id_comment: any; })=> {
          this.verifyReact(c.id_comment);
          this.verifyNumberReact(c.id_comment);
          this.getComment(c.id_comment);
          this.getUserD(c.id_comment);


        });

      },error=>{
        console.log(error)
      });
    });
    this.getMyConnectedUserr(this.id_user);
  
  }
  getMyConnectedUserr(id_user:any){
    this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
      this.myConnectedUser=data;
  })
  }
  getValueOfuser(issueID : any):string{
    // this.myUserImageURI= this.userDetailsList[issueID].image; 
     return this.userDetailsList[issueID].firstName +' '+ this.userDetailsList[issueID].lastName  ;
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

  
  optionVisibility: { [key: number]: boolean } = {};
  toggleOptionVisibility(commentId: number) {
    this.optionVisibility[commentId] = !this.optionVisibility[commentId];
  }

    getIssueByID(id_issue:any){
      this.http.get(`http://localhost:8040/api/issue/${id_issue}`).subscribe(data=>{
        this.issue=data;
        this.postUserID=this.issue.id_user;
        this.getPostUser(this.postUserID);
      },error=>{
        console.log(error);
      })
    }
    getPostUser(id_user:any){
      this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
        this.postUser=data;
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
    commentColors: {[key: number]: string} = {};
    commentReact: {[key: number]: number} = {};

   
    setReaction(id_comment: any) {
      const formData = new FormData();
      formData.append("id_user",this.id_user.toString());
      this.http.post(`http://localhost:8040/api/react/comment/${id_comment}`, formData).subscribe(data => {

      this.myreact = data; 
      }, error => {
        console.log(error);
      });
      this.ngOnInit();
    

    }
    getComment(id_comment:number){
      this.http.get(`http://localhost:8040/api/comment/${id_comment}`).subscribe(data=>{
        this.myvarcomment=data;

        this.userID=this.myvarcomment.id_user;
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
    verifyNumberReact(id_comment:any):number{
      this.http.get(`http://localhost:8040/api/comment/comment-id/${id_comment}`).subscribe(data=>{
        this.nbrReact=data;
        this.commentReact[id_comment] = this.nbrReact 

      },error=>{
        console.log(error)
      });
      return this.nbrReact;

    }
    verifyReact(id_comment:any){
      const params = new HttpParams().set('id_user', this.id_user.toString());

      this.http.get(`http://localhost:8040/api/react/userReact/${id_comment}`,{params}).subscribe(data=>{
        this.response=data;
        this.commentColors[id_comment] = this.response ? 'red' : 'black';
      },error=>{
        console.log(error)
      });

    }
    updatecomment(id_comment:any){
      this.http.get(`http://localhost:8040/api/comment/${id_comment}`).subscribe(data=>{
        this.mycomment=data;
        this.comment_text=this.mycomment.comment_details;
        this.comment_id=this.mycomment.id_comment;
      },error=>{
        console.log(error)
      })
    }
    getIconColor(commentId: any): string {
      return this.commentColors[commentId] || 'black';
    }
    getValueOfreact(commentId : any):number{
      return this.commentReact[commentId] || 0;

    }
    getUserImage(commentId:any):any{
      return this.userDetailsList[commentId].image   ;
  
    }
    save(){
      const commentRequest = {
        comment_details: this.comment_text
      };
      const jsonCommentRequest = JSON.stringify(commentRequest);

         this.http.put(`http://localhost:8040/api/comment/update/${this.comment_id}`, commentRequest).subscribe(response=>{
         //  this.openDialog('Issue Created Successfully');
     
           this.comment_text="";
           this.getAllComment(this.idIssue);
         
          
     
         },error=>{
           console.log(error);
          //  this.openDialog('Error while creating issue');
     
         });
         console.log("updated ");
       }
  


    }


