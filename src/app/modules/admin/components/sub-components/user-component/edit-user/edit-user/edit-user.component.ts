import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../user-services/user-service.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  
  

  constructor(
    
    private active: ActivatedRoute,
    private userService: UserServiceService,
    private fb: FormBuilder,
    private router: Router
    
  ) {
    this.editForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password:[''],
      level: [''],
      speciality: [''],
      numTel: [''],
      
      
    });
  }
  idUser: number =0;
  editForm: FormGroup;
  

ngOnInit() {
  // Extract the user ID from the route parameters
  this.active.params.subscribe(params => {
    if (params['idUser']) {
      this.idUser = +params['idUser']; // The '+' converts the string to a number
      if (this.idUser) {
        this.userService.getUserById(+this.idUser).subscribe(user => {
          this.editForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            level: user.level,
            speciality: user.speciality,
            numTel: user.numTel,
          });
        });
      } else {
        // Handle not having a userId, redirect or show message
      }
    } else {
      console.error('User ID is undefined');
      
    }
  });
}

onSubmit(): void {
  console.log('Form submitted', this.editForm.valid);
  if (this.editForm.valid && this.idUser) {
    const updatedUser = this.editForm.value;
   
    this.userService.editUser(updatedUser, +this.idUser).subscribe(
      (response) => {

        this.router.navigate(['/admin/main/user/']);

        
      },
      (error) => {
        console.error('Update failed:', error);
        // Handle the error here
      }

      
    );
   
  }
}




  


}
