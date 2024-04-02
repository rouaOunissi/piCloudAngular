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

  deleteRessource(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8060/api/v1/ressource/deleteRessByid/` + id);
  }

  getRessourceTypes(): Observable<any[]> {
    
    return this.http.get<any[]>('http://localhost:8060/api/v1/ressource/listeTypeRess');
  }

  getRessourceByID(id: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/api/v1/ressource/getRessourceByid/` + id);
  }
  
  getFileContent(id: number): Observable<string> {
    return this.http.get(`http://localhost:8060/api/v1/ressource/extractContent/${id}`, { responseType: 'text' });
  }

  private apiUrl = 'http://localhost:8060/api/v1/ressource';
  getRessourceContent(url: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/getRessourceContent?url=${encodeURIComponent(url)}`);
  }
  
  
  
  updateRessource(ressource : any, id: number): Observable<any> { 
    return this.http.put(`http://localhost:8060/api/v1/ressource/update/` + id, ressource);
  }

  GenerateInvoicePDF(id: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/api/v1/ressource/generateInvoicePDF/` + id);
  }
  



}
