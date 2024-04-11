import { Component } from '@angular/core';
import { SignInService } from '../../../services/userService/sign-in.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/userService/localStorage/local-storage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  email: string='' ;
  password: string = '';
  errorMessage: string='' ;
  inactiveAccountErrorMessage:string='';
  checkEnabled: Observable<boolean> = of(false);
  
  constructor(private signinService: SignInService , private router : Router ) {

  }

  
  onLogin(): void {
    const authRequest = {
      email: this.email,
      password: this.password
    };
  
    this.signinService.authenticate(authRequest).subscribe({
      next: (response) => {
        
        this.signinService.checkUserEnabled(authRequest.email).subscribe({
          next: (isEnabled) => {
            if (!isEnabled) {
              // If the user's account is not enabled, set the appropriate error message
              this.inactiveAccountErrorMessage = 'Account is not enabled. Please check your email to enable it.';
              return; // Return early since we shouldn't proceed with an inactive account
            }
            
            // The account is enabled, proceed with the login process
            localStorage.setItem('authToken', response.token);
            LocalStorageService.saveUser(response.idUser.toString());
            LocalStorageService.saveUserRole(response.role);
  
            // Redirect the user based on their role
            if (LocalStorageService.getUserRole() == "ADMIN") {
              this.router.navigateByUrl("/admin/main");
            } else if (LocalStorageService.getUserRole() == "STUDENT") {
              this.router.navigateByUrl("/front/main");
            } else {
              console.error("Unknown user role for redirection");
            }
          },
          error: (err) => {
            console.error('Error checking if user is enabled: ', err);
          }
        });
      },
      error: (error) => {
        
        this.errorMessage = 'Erreur lors de l\'authentification. Veuillez vérifier vos identifiants ou vérifier votre email pour activer votre compte .';
      }
    });
  }
  

    }
