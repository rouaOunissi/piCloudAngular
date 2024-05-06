import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { User } from 'src/app/modules/front-office/components/user/model/User';
import { LocalStorageService } from 'src/app/modules/front-office/services/userService/localStorage/local-storage.service';
import { map } from 'rxjs/operators';

interface RegistrationStat {
  month: number;
  count: number;
}

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

  editUser( userId: number , formData: FormData): Observable<any> {
    const headers = this.createAuthorization();
    return this.http.put("http://localhost:8010/api/v1/users/user/update/"+userId , formData , { headers });

    
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

  private apiBaseUrl = 'http://localhost:8010/api/v1/users/auth';
  public setPassword(email: string, newPassword: string): Observable<any> {
    const body = { newPassword: newPassword };
    return this.http.put(`${this.apiBaseUrl}/set-password?email=${encodeURIComponent(email)}`, body);
  }

  private statUrl = 'http://localhost:8010/api/v1/users/user/user-registration-stats';
 
  getUserRegistrationStats(): Observable<RegistrationStat[]> {
    const headers = this.createAuthorization();
    return this.http.get<any[]>(this.statUrl, {headers})
      .pipe(
        map(response => response.map(item => ({
          month: item[0],
          count: item[1]
        } as RegistrationStat)))
      );
  }
  private apiUrl = ' http://localhost:8010/api/v1/users/user';
  updateUserImage(userId: number, imageFile: File): Observable<any> {
    const headers = this.createAuthorization();
    const formData = new FormData();
    formData.append('image', imageFile);

    return this.http.put(`${this.apiUrl}/${userId}/image`, formData, {headers});
  }

  private baseUrl='http://localhost:8010/api/v1/users' ;

  getUsersBySpeciality(speciality: string): Observable<User[]> {
    const headers = this.createAuthorization();
    return this.http.get<User[]>(`${this.baseUrl}/user/users/by-speciality?speciality=${speciality}`, {headers}); 
  }


  private specialityUrl = 'http://localhost:8010/api/v1/users/specialities';
  getAllSpecialities(): Observable<string[]> {
    const headers = this.createAuthorization();
    return this.http.get<string[]>(`${this.specialityUrl}/all`,  {headers})
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching specialities:', error);
          throw error;
        })
      );
  }

  
  
  

}
