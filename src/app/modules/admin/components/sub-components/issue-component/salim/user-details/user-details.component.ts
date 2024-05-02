import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{
  @Input() idIssue!:number;

  ngOnInit(): void {
    console.log("ce msg depuis user details",this.idIssue);
  }
  

}
