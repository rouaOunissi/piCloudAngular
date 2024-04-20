import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../userService/localStorage/local-storage.service';
import { Interest } from '../../components/user/preferences/Interest';

@Injectable({
  providedIn: 'root'
})
export class InterestsService {


  createAuthorization(): HttpHeaders {
    let authHeader = new HttpHeaders();
    const token = LocalStorageService.getToken();
    if (token) {
      authHeader = authHeader.set('Authorization', 'Bearer ' + token);
    }
    return authHeader;
  }

  private apiUrl = 'http://localhost:8010/api/v1/users/interests/inetrests';

  constructor(private http: HttpClient) { }

  getAllInterests(): Observable<Interest[]> {
    const headers = this.createAuthorization();
    return this.http.get<Interest[]>(this.apiUrl,{headers});
  }
}
