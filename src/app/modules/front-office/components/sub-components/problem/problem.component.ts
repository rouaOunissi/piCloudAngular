import { Route } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, NgZone, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentCleanupService } from './salim/comment-cleanup.service';
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  passedList:any;
  constructor(private commentCleanupService:CommentCleanupService ,private http:HttpClient ,private router:Router ,private ngZone:NgZone ){}
  ngOnInit(): void {
    this.commentCleanupService.startCleanupProcess();

  }

  isHidden: boolean = true;

  toggleVisibility() {
    this.isHidden = !this.isHidden;
  }
  getHighIssue(){
    this.http.get("http://localhost:8040/api/issue/priority/HIGH").subscribe(response=>{
      this.passedList=response;
      console.log(this.passedList);
    },error=>{
      console.log(error);
    })
  }
  getMediumIssue(){
    this.http.get("http://localhost:8040/api/issue/priority/MEDIUM").subscribe(response=>{
      this.passedList=response;
      console.log(this.passedList);
    },error=>{
      console.log(error);
    })
  }
  getlowIssue(){
    this.http.get("http://localhost:8040/api/issue/priority/LOW").subscribe(response=>{
      this.passedList=response;
      console.log(this.passedList);
    },error=>{
      console.log(error);
    })
  }
  reloadData(): void {
    this.http.get("http://localhost:8040/api/issue").subscribe(response=>{
      this.passedList=response;
      console.log(this.passedList);
      console.log("000000000000000000000000000000000000");
    },error=>{
      console.log(error);
    })
  }


}
