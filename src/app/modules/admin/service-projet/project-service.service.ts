import { HttpClient , HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseProjet } from './response-projet.model';
import { ResponseCategory } from './response-category.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private baseUrl: string = 'http://localhost:8050/api/v1/projets/'
  private apiUrl1: string = 'http://localhost:8050/api/v1/projets/admin-accepted';
  private apiUrl2: string = 'http://localhost:8050/api/v1/projets/admin-pending';
  private catBaseUrl: string ='http://localhost:8050/api/v1/projets/category'


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

  getAllCategories(): Observable<ResponseCategory[]> {
    return this.http.get<ResponseCategory[]>(this.catBaseUrl+`/admin-cat`);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.catBaseUrl}/${id}`);
  }

  createCategory(categoryName: string): Observable<any> {
    const params = new HttpParams().set('categoryName', categoryName);
    return this.http.post(this.catBaseUrl, null, { params });
  }
  updateCategory(id: number, categoryName: string): Observable<any> {
    const params = new HttpParams().set('categoryName', categoryName);
    return this.http.put(`${this.catBaseUrl}/${id}`, {}, { params });
  }

  private statsUrl = 'http://localhost:8050/api/v1/projets/category/stats'; 
  getCategoryStats(): Observable<any> {
    return this.http.get<any>(this.statsUrl);
  }


  


  
}
