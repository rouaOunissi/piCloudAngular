import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseProjet } from './response-projet.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private baseUrl: string = 'http://localhost:8050/api/v1/projets/'
  private apiUrl1: string = 'http://localhost:8050/api/v1/projets/admin-accepted';
  private apiUrl2: string = 'http://localhost:8050/api/v1/projets/admin-pending';
  private catBaseUrl: string = 'http://localhost:8050/api/v1/projets/category'


  constructor(private http: HttpClient) {}

  getAllAcceptedProjects(): Observable<ResponseProjet[]> {
    return this.http.get<ResponseProjet[]>(this.apiUrl1);
  }

  getAdminPendingProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl2);
  }

  getAdminDeclinedProjects(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl +`admin-declined`);
  }

  adminAcceptProject(id: number): Observable<any> {
    return this.http.put(this.baseUrl +`admin-accept/${id}`, null); // Since PUT might not have a body, we're sending null.
  }

  adminDeclineProject(id: number): Observable<any> {
    return this.http.put(this.baseUrl +`admin-decline/${id}`, null); // Since PUT might not have a body, we're sending null.
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(this.baseUrl +`${id}`); // Replace `/your-endpoint/` with your actual endpoint path
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.catBaseUrl);
  }
}
