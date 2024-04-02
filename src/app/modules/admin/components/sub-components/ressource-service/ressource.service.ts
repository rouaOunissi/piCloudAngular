import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const BASIC_URL = ['http://localhost:8060'];

@Injectable({
  providedIn: 'root'
})
export class RessourceService {

  constructor(private http: HttpClient ) {}
  getAllRessources(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8060/getRessource');
  }

  deletRessource(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8060/deleteRessByid/` + id);
  }



  getRessourceByID(id: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/getRessourceByid/` + id);
  }

  updateRessource(ressource : any, id: number): Observable<any> { 
    return this.http.put(`http://localhost:8060/update/` + id, ressource);
  }


  

  getRessourceTypes(): Observable<any[]> {
    
    return this.http.get<any[]>('http://localhost:8060/listeTypeRess');
  }
  
}
