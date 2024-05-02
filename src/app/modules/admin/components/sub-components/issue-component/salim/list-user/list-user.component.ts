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
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get(`http://localhost:8040/api/react/comment/${this.id_comment}`).subscribe(data=>{
      this.listUser=data;
    },error=>{
      console.log(error)
    })
  }

}
