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
  myUser:any;
  constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.http.get(`http://localhost:8040/api/react/comment/${this.id_comment}`).subscribe(data=>{
      this.listUser=data;
      this.listUser.forEach((c: { id_user: any; })=> {
        this.getUser(c.id_user);


      });
    },error=>{
      console.log(error)
    })
  }
  getUser(id_user:number){
    this.http.get(`http://localhost:8010/api/v1/users/user/user/${id_user}`).subscribe(data=>{
      this.myUser=data;
  })
  }

}
