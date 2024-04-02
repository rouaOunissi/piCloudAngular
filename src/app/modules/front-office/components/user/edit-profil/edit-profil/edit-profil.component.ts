import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';
import { User } from '../../model/User';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.component.html',
  styleUrls: ['./edit-profil.component.css']
})
export class EditProfilComponent implements OnInit {

  userId: string | null;

  constructor(
    private fb: FormBuilder,
    private userService: UserServiceService,
    private route: ActivatedRoute,
    private router : Router
  ) {
    this.editForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      password: [''],
      level: [''],
      numTel: [''],
      speciality: [''],
      image:[null]
      // You might need another form control for the image
    });
    this.userId = localStorage.getItem('userId');
  }


  ngOnInit(): void {
    if (this.userId) {
      this.userService.getUserById(+this.userId).subscribe(
        (userData: User) => {
          
          this.editForm.patchValue({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            level: userData.level,
            numTel: userData.numTel,
            speciality: userData.speciality
          });

        },
        (error) => {
          console.error('Error fetching user data', error);
        }
      );
    }
  }

  

  onFileSelected(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if (fileList) {
      this.selectedFile = fileList[0];
    }
  }

  editForm: FormGroup;
  selectedFile: File | null = null;



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

      if (this.userId) {
        const userIdNumber = +this.userId; // Ensure this is a number
        this.userService.editUser( userIdNumber, formData ).subscribe({
          next: (response) => {
            this.router.navigate(['/front/main/profil']);
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

 


    

  }
