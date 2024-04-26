import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  email: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(
    private authService: UserServiceService,
    private route: ActivatedRoute,
    private router : Router,
    private ngZone: NgZone,
    
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      console.log('Email from queryParams:', this.email); // Ajoutez ceci pour déboguer
    });
  }
  

  changePassword() {

    console.log("CHANGIN PASSWORD ");
    // Check if newPassword and confirmPassword are the same
    if (this.newPassword === this.confirmPassword) {

    
      this.authService.setPassword(this.email, this.newPassword).subscribe({
        next: (response) => {
          this.router.navigateByUrl("/front/login");

        },
        error: (error) => {
          console.error('Error occurred while changing password:', error);
          console.error('Error Status:', error.status);
          console.error('Error Status Text:', error.statusText);
          console.error('Error occurred:', error.error);
        }
      });
    } else {
      
    }
  }
}
