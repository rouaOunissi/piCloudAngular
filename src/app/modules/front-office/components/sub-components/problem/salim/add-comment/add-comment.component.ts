import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import BadWordsFilter from 'bad-words';

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
  id_user:any;
  @Output() commentSaved: EventEmitter<void> = new EventEmitter<void>();

  @Input() issueID!:number;
  constructor(private http:HttpClient, private snackBar: MatSnackBar){}
  ngOnInit(): void {
    this.description="";
    this.id_user=localStorage.getItem("userId");

  }
  detectBadWords() {
    this.filteredText = this.badWordsFilter.clean(this.comment_text);
   console.log('Filtered text:', this.filteredText);
 }
  
  save(){
    if (this.comment_text.length >= 10 && this.comment_text.trim() !== '') {
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
  }else{
    window.alert("you have to verify your comment ");
  }
  this.description="";

}

}
  

