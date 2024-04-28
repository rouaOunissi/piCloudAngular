import { Injectable } from '@angular/core';

const TOKEN="token";
const USER_ID = 'userId';
const USER_ROLE = 'userRole';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  static saveToken(token: string):void{
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }
  static saveUser(userId: string): void {
    window.localStorage.removeItem(USER_ID);
    window.localStorage.setItem(USER_ID, userId);
  }

  static saveUserRole(role: string): void {
    window.localStorage.removeItem(USER_ROLE);
    window.localStorage.setItem(USER_ROLE, role);
  }

  static getToken(): string | null {
    return window.localStorage.getItem('authToken');
  }

  static getUserId(): string | null {
      return window.localStorage.getItem(USER_ID) ;
  }

  static getUserRole(): string | null {
    return window.localStorage.getItem(USER_ROLE);
  }

  logout(): void {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem("authToken");
    localStorage.removeItem(USER_ID);
    localStorage.removeItem(USER_ROLE);
   
  }

  

}
