import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const BASIC_URL = ['http://localhost:8030'];
@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private http : HttpClient) { }



  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:8030/api/events/all');
  }


  deleteEvent(id: number): Observable<any> {
    return this.http.delete('http://localhost:8030/api/events/delete/' + id );
  }



  postEvent(event: any): Observable<any> {
    return this.http.post(BASIC_URL + '/api/events/add',event );
  }


  getEventById(id : number): Observable<any>{
    return this.http.get("http://localhost:8030/api/events/"+id );
  }


  updateEvennt(event : any , id : number) {
    return this.http.put("http://localhost:8030/api/events/update/"+id , event);
  }

}
