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
    return this.http.get<any[]>('http://localhost:8060/api/v1/ressource/getRessource');
  }

  deletRessource(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8060/api/v1/ressource/deleteRessByid/` + id);
  }



  getRessourceByID(id: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/api/v1/ressource/getRessourceByid/` + id);
  }

  updateRessource(ressource : any, id: number): Observable<any> { 
    return this.http.put<any>(`http://localhost:8060/api/v1/ressource/update/` + id, ressource);
  }



  searchRessourcesByTitre(titre: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/search?titre=${titre}`);
  }

  searchRessourcesByKeyword(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/searchContent?keyword=${keyword}`);
  }

  getRessourcesByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/ressourceByType?typeRessource=${type}`);
  }

  getRessourceTypes(): Observable<any[]> {
    
    return this.http.get<any[]>('http://localhost:8060/api/v1/ressource/listeTypeRess');
  }
  
}
