import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/modules/front-office/services/userService/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {


  private getAllUrl = 'http://localhost:8010/api/v1/users/user';

  constructor(private http: HttpClient , private localStorageService: LocalStorageService) { }
  

  createAuthorization(): HttpHeaders {
    let authHeader = new HttpHeaders();
    const token = LocalStorageService.getToken();
    if (token) {
      authHeader = authHeader.set('Authorization', 'Bearer ' + token);
    }
    return authHeader;
  }

  findAll(): Observable<any> {
    console.log("TOKEN")
    console.log(LocalStorageService.getToken());
    console.log("USER ID")
    console.log(LocalStorageService.getUserId());

    
    
    const headers = this.createAuthorization(); 
    return this.http.get(this.getAllUrl, { headers: headers });
  }
  

}
