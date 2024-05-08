import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EventService } from "../event-service/event.service";
import { HttpClient } from "@angular/common/http";
import  Chart, { ChartType } from "chart.js/auto";

@Component({
  selector: 'app-event-component',
  templateUrl: './event-component.component.html',
  styleUrls: ['./event-component.component.css'],
})
export class EventComponentComponent implements OnInit {
  @ViewChild('floatingBarChart', { static: true }) floatingBarChart: any;
  chart: any;
  pieChart: any;
  eventID:number=0;
  events: any = [];
  filteredCars: any = [] ;
  searchTerm: string = '';
  isHidden: boolean = true;
  isCalendarHidden: boolean = true;
  myEvent:any;
  myEventData : any[] = [];
  public myReservedData : any[] = [];
  mytitleData : any[] = [];
  myReservationList:any;
  eventSize:number=0; 
  free:number=0;
  nbrReservation:number=0;
  reservations: any = [] ;
  myData : any[] = [];
  listOfevent:any;
  mytitle:any;
  constructor(private eventService: EventService,private http:HttpClient) {}


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
toggleCalendarVisibility(){
  this.isCalendarHidden = !this.isCalendarHidden;
  this.free=0;
  this.eventSize=0;
  this.nbrReservation=0;
  this.checkStatForAllEvent();
  
}
checkStatForAllEvent(){
  this.eventService.getAllEvents().subscribe(data=>{
    this.listOfevent=data;
    this.listOfevent.forEach((event: any) => {
      this.eventSize=event.eventNbplace;
      this.mytitle=event.eventName;
      this.eventID=event.idEvent;
      this.myEventData.push(this.eventSize);
      this.mytitleData.push(this.mytitle);
      this.getNbrReservationEvents(this.eventID);

    });
   
    this.generateBarChart(this.mytitleData,this.myEventData,this.myReservedData);
  })
}
toggleVisibility(id_event:number) {
  this.isHidden = !this.isHidden;
  this.free=0;
  this.eventSize=0;
  this.nbrReservation=0;
  this.getStatOfEvent(id_event);
}
getStatOfEvent(id_event:number){
  this.eventService.getEventById(id_event).subscribe(data=>{
    this.myEvent=data;
    this.eventSize=this.myEvent.eventNbplace;
    this.getNbrReservation(id_event);
  })
}
getNbrReservation(id_event:number){
  this.http.get(`http://localhost:8030/api/event/reservation/${id_event}`).subscribe(data=>{
    this.myReservationList=data;
    this.myReservationList.forEach((reservation: any) => {
      this.nbrReservation = this.nbrReservation+reservation.nbPlace;
    });
    this.free=this.eventSize-this.nbrReservation;
    this.myData.push(this.free);
    this.myData.push(this.nbrReservation);
    this.generatePieChart(this.myData);
  })
}
getNbrReservationEvents(id_event:number){
  
  this.http.get(`http://localhost:8030/api/event/reservation/${id_event}`).subscribe(data=>{
    this.nbrReservation=0;
    this.myReservationList=data;
    this.myReservationList.forEach((reservation: any) => {
      this.nbrReservation = this.nbrReservation+reservation.nbPlace;
    });
    this.myReservedData.push(this.nbrReservation);
   
  })
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
generatePieChart(myData:any): void {
  
  const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [ 'free','Reserverd'],
        datasets: [{
          label: 'Event Reservation ',

          data: myData,
          backgroundColor: [ 'orange', 'blue']
        }]
      }
    });
  } else {
    console.error('Canvas context is null.');
  }
}
generateBarChart(mytitledata:any,myData:any,myreservedData:any): void {
  
  const canvas = document.getElementById('barChart') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: mytitledata,
        datasets: [{
          label: 'Event Capacity ',
          data: myData,
          backgroundColor: [ 'orange']
        },{
           label: ' Reserved place ',
        data: myreservedData,
        backgroundColor: [ 'yellow']}]
      }
    });
  } else {
    console.error('Canvas context is null.');
  }
}
}