import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  constructor(private http : HttpClient) { }



  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:8030/api/events/all');
  }



  postReservation(reservationDto: any): Observable<any> {
    return this.http.post('http://localhost:8030/api/reservations/addReservationToEvent',reservationDto);
  }





}