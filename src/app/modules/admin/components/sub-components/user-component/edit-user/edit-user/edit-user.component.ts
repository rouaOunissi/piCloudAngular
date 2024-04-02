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
  if (this.editForm.valid) {
    const formData = new FormData();
    formData.append('email', this.editForm.get('email')?.value);
    formData.append('firstName', this.editForm.get('firstName')?.value);
    formData.append('lastName', this.editForm.get('lastName')?.value);
    formData.append('password', this.editForm.get('password')?.value);
    formData.append('level', this.editForm.get('level')?.value);
    formData.append('numTel', this.editForm.get('numTel')?.value);
    formData.append('speciality', this.editForm.get('speciality')?.value);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    if (this.idUser) {
      const userIdNumber = +this.idUser; 
      this.userService.editUser( userIdNumber, formData ).subscribe({
        next: (response) => {
          this.router.navigate(['/admin/main/user/']);
          
        },
        error: (error) => {
          console.error('Error during the update', error);
        }
      });
    } else {
      console.error('No user ID found');
    }
  }
}
selectedFile: File | null = null;
onFileSelected(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  let fileList: FileList | null = element.files;
  if (fileList) {
    this.selectedFile = fileList[0];
  }
}





  


}
