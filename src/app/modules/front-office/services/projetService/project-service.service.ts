import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseCategory } from 'src/app/modules/admin/service-projet/response-category.model';
import { ResponseProjet } from 'src/app/modules/admin/service-projet/response-projet.model';
import { NewProject } from './NewProject.model';
import { Requestt } from './Request.model';
import { RequestRequest } from './RequestRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  private apiUrl = 'http://localhost:8222/api/v1/projets/admin-accepted';
  private categoriesUrl = 'http://localhost:8222/api/v1/projets/category'; // Adjust the URL as needed
  private apiUrlcatId = 'http://localhost:8222/api/v1/projets/cat';

  // Replace with your actual API endpoint

  constructor(private http: HttpClient) { }

  getAllAdminAcceptedProjects(): Observable<ResponseProjet[]> {
    return this.http.get<ResponseProjet[]>(this.apiUrl);

    
  }

  getAllCategories(): Observable<ResponseCategory[]> {
    return this.http.get<ResponseCategory[]>(this.categoriesUrl);
  }

  getProjectsByCategory(categoryId: number): Observable<ResponseProjet[]> {
    const url = `${this.apiUrlcatId}/${categoryId}`;
    return this.http.get<ResponseProjet[]>(url);
  }

  createProject(project: NewProject): Observable<ResponseProjet> {
    const createProjectUrl = 'http://localhost:8222/api/v1/projets'; // URL for the POST endpoint
    return this.http.post<ResponseProjet>(createProjectUrl, project);
  }

  getUserProjects(userId: number): Observable<ResponseProjet[]> {
    const userProjectsUrl = `http://localhost:8222/api/v1/projets/userprojets/${userId}`;
    return this.http.get<ResponseProjet[]>(userProjectsUrl);
  }

  getRequestsByEncadreurId(encadreurId: number): Observable<Requestt[]> {
    const requestsUrl = `http://localhost:8222/api/v1/projets/requests/myrequests/${encadreurId}`;
    return this.http.get<Requestt[]>(requestsUrl);
  }

  
  deleteProject(id: number): Observable<any> {
    const url = `http://localhost:8222/api/v1/projets/${id}`;

    return this.http.delete(url); 
  }

  updateProject(id: number, project: any): Observable<any> {
    const url = `http://localhost:8222/api/v1/projets/update/${id}`;
    return this.http.put(url, project);
  }
  createRequest(request: RequestRequest): Observable<any> {
    const url = `http://localhost:8222/api/v1/projets/requests`;
    return this.http.post(url, request);
    
  }

  deleteRequest(id: number): Observable<any> {

    return this.http.delete(`http://localhost:8222/api/v1/projets/requests/delete/${id}`);
  }


  private baseUrl = 'http://localhost:8222/api/v1/projets/requests';
  getRequestByProjectId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/projet/${id}`);
  }

  // In your service file

acceptRequest(reqId: number): Observable<any> {
  return this.http.put(`http://localhost:8222/api/v1/projets/requests/accept/${reqId}`, {});
}

declineRequest(reqId: number): Observable<any> {
  return this.http.put(`http://localhost:8222/api/v1/projets/requests/decline/${reqId}`, {});
}



}
