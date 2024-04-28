import { Component, OnInit } from '@angular/core';
import { EventService } from '../event-service/event.service';

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.css'],
})
export class EventComponentComponent implements OnInit {


  events: any = [];
  filteredCars: any = [] ;
  searchTerm: string = '';

  reservations: any = [] ;


  constructor(private eventService: EventService) {}


  ngOnInit(): void {
    this.getAllEvents();
    this.getAllReservations();
  }

  event = {
    eventName: '',
    eventDescription: '',
    eventPrice: 0,
    creationDate: new Date(),
    planifiedDate: new Date(),
    eventNbplace: 0,
  };


  reservation = {
    description : '' ,
    nbPlace : 0 ,
    idUser: 0
  }

  getAllReservations(){
    this.eventService.getAllReservations().subscribe(
      (res) => {
        console.log(res);
        this.reservations= res;
      },
      (err)=> {
        console.log(err);
      }
    )
  }



  getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      (res) => {
        console.log(res);
        this.events = res;
        this.filteredCars = res ;
        ;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterCars() {
    this.filteredCars = this.events.filter((event: any) =>
      event.eventName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  deleteEvent(Idevent: number) {
    console.log(Idevent);
    this.eventService.deleteEvent(Idevent).subscribe(
      (res) => {
        console.log('Successfully deleted the Car');
        this.ngOnInit();
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  postEvent2(){
      console.log(this.event);
      this.eventService.postEvent(this.event).subscribe((data)=>{
        alert("Added Successfully");
        this.ngOnInit();
      },
      (err)=> {
        alert("Failed to add Event");
        console.log(err);
      });
  }

  postEvent(){
    let formData  = new FormData();
    formData.append('eventName', this.event.eventName);
    formData.append('eventDescription', this.event.eventDescription);
    formData.append('eventPrice', this.event.eventPrice.toString());
    formData.append('creationDate',this.event.creationDate.toString());
    formData.append('planifiedDate',this.event.planifiedDate.toString());
    formData.append('eventNbplace',this.event.eventNbplace.toString());
    console.log(this.event);
    this.eventService.postEvent(this.event).subscribe((data)=>{
      alert("Added Successfully");
      this.ngOnInit();
    },
    (err)=> {
      alert("Failed to add Event");
      console.log(err);
    });
}




deleteReservation(idReservation: number) {
  console.log(idReservation);
  this.eventService.deleteReservation(idReservation).subscribe(
    (res) => {
      console.log('Successfully deleted the reservation');
      this.ngOnInit();
      console.log(res);
    },
    (error) => {
      console.log(error);
    }
  );
}

}