import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/modules/front-office/components/user/model/User';
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

  
  getUserById(id: number): Observable<User> {
    const headers = this.createAuthorization();
    return this.http.get<User>("http://localhost:8010/api/v1/users/user/user/"+id , { headers });
  }

  editUser(user : any , id : number) {
    const headers = this.createAuthorization();
    return this.http.put("http://localhost:8010/api/v1/users/user/"+id , user , { headers });

    
  }

  deleteUser(id: number): Observable<any> {
    const headers = this.createAuthorization();
    return this.http.delete("http://localhost:8010/api/v1/users/user/"+id , { headers });


  }

  private searchUrl = 'http://localhost:8010/api/v1/users/user';
  searchUsers(firstName: string): Observable<any> {
    const headers = this.createAuthorization();
    return this.http.get(`${this.searchUrl}/search`, {
      params: { firstName },
      headers: headers
    });
  }

  getImageUrl(filename: string): string {
    const baseUrl = 'http://localhost:8010/api/v1/users/auth/images';
    return `${baseUrl}/${filename}`;
  }
  
  

}
