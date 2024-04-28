import { Component, OnInit } from '@angular/core';
import { EventServiceService } from '../event-service/event-service.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  events: any = [];
  filteredCars: any = [];
  searchTerm: string = '';

  reservationDto = {
    reservation : {
      nbPlace: 0,
    },
    idEvent: 0,
    // add the id of the user that you get it from the local storage
  };

  constructor(private eventService: EventServiceService) {}

  ngOnInit(): void {
    this.getAllEvents();
  }

  event = {
    eventName: '',
    eventDescription: '',
    eventPrice: 0,
    creationDate: new Date(),
    planifiedDate: new Date(),
    eventNbplace: 0,
  };


  showReservationForm(event: any) {
    event.showReservationForm = !event.showReservationForm;
  }

  submitReservation(event: any) {
    // Implement the logic to submit the reservation
    console.log('Reservation submitted for event:', event);
    // You can also reset the form or perform any other actions as needed
    event.showReservationForm = false; // Hide the reservation form after submission
  }


  getAllEvents() {
    this.eventService.getAllEvents().subscribe(
      (res) => {
        console.log(res);
        this.events = res;
        this.filteredCars = res;
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

  reserve(idEvent: number) {
    this.reservationDto.idEvent = idEvent;
    console.log(this.reservationDto);

    this.eventService.postReservation(this.reservationDto).subscribe(
      (res) => {
        alert("Added Successfully");
      },
      (err)=>{
        console.log(err);
      }
    )

  }
}