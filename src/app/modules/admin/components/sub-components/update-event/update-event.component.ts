import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../event-service/event.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit{


  event = {
    eventName: '',
    eventDescription: '',
    eventPrice: 0,
    creationDate: new Date(),
    planifiedDate: new Date(),
    eventNbplace: 0,
  };

  constructor(private active : ActivatedRoute,
    private eventService : EventService,
    private route : Router){
  }

  idEvent:number = this.active.snapshot.params["id"];

  ngOnInit(): void {
      this.getEventById();
  }



  updateEvent(){
    this.eventService.updateEvennt(this.event,this.idEvent).subscribe((res)=>{
      console.log(res);
      alert("Updated Succesfully!!");
    },(err)=>{
      console.log(err);
      alert("Failed to update")
    })
  }


  getEventById(){
    this.eventService.getEventById(this.idEvent).subscribe((response)=>{
      this.event= response ;
      console.log(response);
    });
  }
}
