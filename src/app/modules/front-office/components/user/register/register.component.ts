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
  //user: User = new User();
  successMessage: string = '';


  user: any = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    level: null,
    numTel: null,
    speciality: '',
  };
  selectedFile: File | null = null;

  constructor(private authService: AuthService , private router : Router) {
   
  }

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  
  onSubmit(): void {
    const formData = new FormData();
    formData.append('email', this.user.email);
    formData.append('firstName', this.user.firstName);
    formData.append('lastName', this.user.lastName);
    formData.append('password', this.user.password);
    if (this.user.level !== null) {
      formData.append('level', this.user.level);
    }
    formData.append('numTel', this.user.numTel);
    formData.append('speciality', this.user.speciality);
    
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    this.authService.signUp(formData).subscribe({
      next: (response) => {
        this.successMessage = 'Veuillez vérifier votre e-mail pour activer votre compte.';
        this.selectedFile = null; 
        alert(this.successMessage);
        this.router.navigate(['/front/login']);
      },
      error: (error) => {
        console.error('Erreur lors de l\'inscription', error);
        this.successMessage = 'erreur lors de l\'inscription';
        alert(this.successMessage);
      }
    });
  }
  

  

  
}
