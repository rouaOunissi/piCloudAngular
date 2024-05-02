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
  comments:any;
  commentsSize!:number;
  reactSize!:number;
  heartColor: string = 'black';
  res: any ;
  nbr_like!:any;
  constructor (private http:HttpClient){}
  ngOnInit(): void {
    this.http.get(`http://localhost:8040/api/comment/issue/${this.issueID}`).subscribe(data=>{
      this.comments=data;
      this.commentsSize=this.comments.length;
      console.log("Size of comments:", this.commentsSize); // Log the size of comments array

    },error=>{
      console.log(error)
    })
  }
  
 
  refreshData(): void {
    this.ngOnInit();
    // Implement logic to refresh data, for example fetching comments again
    console.log("Refreshing data...");
  }

  }

 



