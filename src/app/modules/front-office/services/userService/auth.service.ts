import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{User} from '../../components/user/model/User' ;
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private url="http://localhost:8222/api/v1/users/auth/register" ;

httpOptions: {headers: HttpHeaders}={
  headers: new HttpHeaders({"content-Type":"application/json"})
}

  constructor(private http: HttpClient) { }

  signUp(formData: FormData): Observable<any> {
    return this.http.post(this.url, formData);
  }

  

  }

