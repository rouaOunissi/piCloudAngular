import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable  } from 'rxjs';

const BASIC_URL = ['http://localhost:8060'];

@Injectable({
  providedIn: 'root'
})
export class RessourceService {



  constructor(private http: HttpClient ) {}
  private baseUrl = 'http://localhost:8060/api/v1';

 


  getAllRessources(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8060/api/v1/ressource/getRessourcesOrderedByNbrReact');
  }

  deleteRessource(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8060/api/v1/ressource/deleteRessByid/` + id);
  }

  getRessourceTypes(): Observable<any[]> {
    
    return this.http.get<any[]>('http://localhost:8060/api/v1/ressource/listeTypeRess');
  }

  getRessourceByidUser(idUser: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8060/api/v1/ressource/getRessourceByidUser/${idUser}`);
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
  
  getTotalReactionsForRessource(id: number): Observable<any> {
    return this.http.get(`http://localhost:8060/api/v1/ressource/getTotalReactionsForRessource/${id}`);
  }
  
  updateRessource(ressource : any, id: number): Observable<any> { 
    return this.http.put(`http://localhost:8060/api/v1/ressource/update/` + id, ressource);
  }

  GenerateInvoicePDF(id: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/api/v1/ressource/generateInvoicePDF/` + id);
  }
  
  searchRessourcesByTitre(titre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ressource/search?titre=${titre}`);
  }

  searchRessourcesByKeyword(keyword: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/searchContent?keyword=${keyword}`);
  }

  searchBySynonyms(word: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/synonyms?word=${word}`);
  }


  getRessourcesByType(type: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8060/api/v1/ressource/ressourceByType?typeRessource=${type}`);
  }
  
  reactToRessource(idRessource: number, userId: number): Observable<any> { 
    return this.http.put(`http://localhost:8060/api/v1/ressource/reactToRessource/${idRessource}/${userId}`, {});
  }
  

    
  findReactionByIdReactionAndIdUser(idRessource: number, userId: number): Observable<any> { 
    return this.http.get(`http://localhost:8060/api/v1/ressource/findReactionByIdReactionAndIdUser/`, { params: { idRessource: idRessource.toString(), userId: userId.toString() } });
  }
  

  getSynonyms(word: string): Observable<string[]> {
    return this.http.get<string[]>(`/api/synonyms/${word}`);
  }

  searchRessourcesBySynonyms(word: string): Observable<any[]> {
    return this.http.get<any[]>(`/api/ressources/synonyms?word=${word}`);
  }


  checkUserReaction(idRessource: number, userId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8060/api/v1/ressource/hasUserReactedToResource/${idRessource}/${userId}`);
  }
  



}
