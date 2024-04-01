import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent {

  userId: string | null = localStorage.getItem('userId');
  editForm: FormGroup;

  constructor(
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

  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(+this.userId).subscribe(user => {
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
  }


  onSubmit(): void {
    console.log('Form submitted', this.editForm.valid);
    if (this.editForm.valid && this.userId) {
      const updatedUser = this.editForm.value;
     
      this.userService.editUser(updatedUser, +this.userId).subscribe(
        (response) => {

          this.router.navigate(['/front/main/profil/']);

          
        },
        (error) => {
          console.error('Update failed:', error);
          // Handle the error here
        }

        
      );
     
    }
  }
  
  


    

  }
