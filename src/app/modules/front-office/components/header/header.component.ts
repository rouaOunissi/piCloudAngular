import { Component } from '@angular/core';
import { LocalStorageService } from '../../services/userService/localStorage/local-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  
  

  constructor(private localStorageService: LocalStorageService , private router: Router) {

  }

  isUserLoggedIn: boolean = false;
  usetNotConnected: boolean = true;

ngOnInit() {
  this.isUserLoggedIn = LocalStorageService.getUserRole() === "STUDENT";
  this.usetNotConnected = !this.isUserLoggedIn;
}

  logout(){
    this.localStorageService.logout();
    this.router.navigateByUrl("/front/login");

  }
  



}
