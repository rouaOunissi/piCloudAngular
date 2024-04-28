import { Component } from '@angular/core';
import{User} from '../model/User' ;
import { AuthService } from '../../../services/userService/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user: User = new User();
  successMessage: string = '';


  


  constructor(private authService: AuthService , private router : Router) {
   
  }

  onSubmit(): void {
    console.log('Le formulaire a été soumis', this.user);
    this.authService.signUp(this.user).subscribe({
      next: (response) => {
        
        this.successMessage = 'Inscription réussie. Bienvenue!';
        console.log('Inscription réussie', response);
        
        this.router.navigateByUrl("/front/login");


       
      },
      error: (error) => {
       
        console.error('Erreur lors de l\'inscription', error);
        
      }
    });
  }
}
