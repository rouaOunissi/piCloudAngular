import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.css']
})
export class ShowIssueComponent implements OnInit {
  idIssue!:number;

  constructor(private http:HttpClient ,private route:ActivatedRoute){

  }
    ngOnInit(): void {
  
      //  this.getIssueListe();
      this.route.params.subscribe(params => {
       this.idIssue = +params['id_issue']; // Accessing route parameter 'id_issue'
  
     });

}
}