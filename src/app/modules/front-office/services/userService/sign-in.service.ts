import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface AuthentificationRequest {
  email: string; 
  password: string;
}

interface AuthentificationResponse {
  token: string; 
  idUser: number;
  role: string;
}


@Injectable({
  providedIn: 'root'
})
export class SignInService {

  private authUrl = 'http://localhost:8010/api/v1/users/auth'; 

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  authenticate(request: any): Observable<AuthentificationResponse> {
    return this.http.post<AuthentificationResponse>(`${this.authUrl}/authentificate`, request, this.httpOptions);
  }

  

}
