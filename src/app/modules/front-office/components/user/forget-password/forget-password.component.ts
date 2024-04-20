import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  email: string=""; 
  successMessage : string;
  constructor(private http: HttpClient,private router : Router) {
    this.successMessage = "";
  }

  forgetPassword() {
    this.http.put('http://localhost:8010/api/v1/users/auth/forgot-password?email=' + this.email, {})
      .pipe(
        finalize(() => {
          // Cette action se déroulera après que la requête est terminée, indépendamment du résultat.
          this.router.navigateByUrl("/front/login");
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.successMessage = "We have sent an email to your registered email address with instructions on how to reset";
          alert(this.successMessage);
        },
        error: (error) => {
          console.error(error);
          
        }
      });

}


}
