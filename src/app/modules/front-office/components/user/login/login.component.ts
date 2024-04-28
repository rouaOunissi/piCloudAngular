import { Component } from '@angular/core';
import { SignInService } from '../../../services/userService/sign-in.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../services/userService/localStorage/local-storage.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

 
  email: string='' ;
  password: string = '';
  errorMessage: string='' ;
  
  constructor(private signinService: SignInService , private router : Router ) {

  }

  
  onLogin(): void {
    const authRequest = {
      email: this.email,
      password: this.password
    };
  
    this.signinService.authenticate(authRequest).subscribe({
      next: (response) => {

        

        localStorage.setItem('authToken', response.token);
        LocalStorageService.saveUser(response.idUser.toString());
        LocalStorageService.saveUserRole(response.role);

       if (LocalStorageService.getUserRole() == "ADMIN") {
               this.router.navigateByUrl("/admin/main");
      } else if (LocalStorageService.getUserRole() == "STUDENT") {
                this.router.navigateByUrl("/front/main");
      } else {
                console.log("Erreur de redirection");
}

      },
      error: (error) => {
        console.error('Erreur lors de l\'authentification', error);
        this.errorMessage = 'Erreur lors de l\'authentification. Veuillez vérifier vos identifiants.';
      }
    });
  }
  

}
