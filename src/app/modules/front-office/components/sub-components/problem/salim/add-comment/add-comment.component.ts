import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import BadWordsFilter from 'bad-words';
import { LocalStorageService } from 'src/app/modules/front-office/services/userService/localStorage/local-storage.service';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  filteredText:any;
  badWordsFilter = new BadWordsFilter();
  description:any;
  comment_text!:any;
  myUserConnected:any;
  id_user:any;
  image_uri:any;
  @Output() commentSaved: EventEmitter<void> = new EventEmitter<void>();

  @Input() issueID!:number;
  constructor(private http:HttpClient,private router: Router,private localStorage:LocalStorageService){}
  ngOnInit(): void {
    this.description="";
    this.id_user=localStorage.getItem("userId");
    this.getCurrentUserConnected(this.id_user);

  }
  getCurrentUserConnected(id_user:number){
    this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
      this.myUserConnected=data;
      this.image_uri=this.myUserConnected.numTel;
   


    })
  }
  detectBadWords() {
    this.filteredText = this.badWordsFilter.clean(this.comment_text);
   console.log('Filtered text:', this.filteredText);
 }
  
  save(){
    if (this.comment_text.length >= 10 && this.comment_text.trim() !== '' ) {

        const commentRequest = {
          comment_details: this.filteredText ,
          id_user:this.id_user
       };
       this.http.post(`http://localhost:8040/api/comment/issueID/${this.issueID}`,commentRequest).subscribe(response=>{
        this.description="";
       this.commentSaved.emit();
   
       },error=>{
         console.log(error);
        //  this.openDialog('Error while creating issue');
   
       });
       this.description="";
       this.ngOnInit();
       console.log("saved");
       this.description="";
  
      
      
   
  }else{
    window.alert("you have to verify your comment ");
  }

  if(this.filteredText.includes('****')){
    
    this.http.put(`http://localhost:8010/api/v1/users/auth/updateStatus/${this.id_user}`,{}).subscribe(data=>{
      console.log("user Setting Status Has been updated  successfully ");
    })


  setTimeout(() => {
    this.localStorage.logout();
    this.router.navigateByUrl("/front/banAlert");
  }, 10000); // 10000 milliseconds = 10 seconds

  }
}

}
  

