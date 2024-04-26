import { Component } from '@angular/core';
import { UserServiceService } from './user-services/user-service.service';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/front-office/components/user/model/User';

@Component({
  selector: 'app-user-component',
  templateUrl: './user-component.component.html',
  styleUrls: ['./user-component.component.css']
})
export class UserComponentComponent {

  users: any = [];
  texteDeRecherche: string = '';
  specialities: string[] = [];
  selectedSpeciality: string = '';

  constructor(private userService: UserServiceService ,  private router: Router) { }

  ngOnInit() {
    this.userService.findAll().subscribe(data => {
      this.users = data;
    });

    
    this.userService.getAllSpecialities()
      .subscribe(
        (data: string[]) => {
          this.specialities = data;
        },
        (error) => {
          console.error('Error fetching specialities:', error);
        }
      );
  


  }

  modifyUser(userId: number): void {
    console.log('UserID:', userId); // This should not print 'undefined'
    if (userId) {
      this.router.navigate(['/main/edit-user', userId]);
    } else {
      // Handle the case where userId is undefined
      console.error('UserID is undefined');
    }

  }

  

  deleteUser(idUser: number) {
    console.log(idUser);
    this.userService.deleteUser(idUser).subscribe(
      (res) => {
        console.log('Successfully deleted the USER');
        //this.ngOnInit();
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
  effectuerRecherche(): void {
    // Supprime les espaces blancs au début et à la fin de la chaîne de recherche
    const rechercheTrimmed = this.texteDeRecherche.trim();
  
    if (rechercheTrimmed) {
      
      this.userService.searchUsers(rechercheTrimmed).subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Erreur lors de la recherche des utilisateurs', error);
        }
      );
    } else {
      
      this.userService.findAll().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Erreur lors de l\'obtention des utilisateurs', error);
        }
      );
    }
  }



  filterBySpeciality(speciality: string): void {
    if (!speciality) {
      // If no speciality is selected, fetch all users
      this.userService.findAll().subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error fetching all users:', error);
        }
      );
    } else {
      // If a speciality is selected, filter users by that speciality
      this.userService.getUsersBySpeciality(speciality).subscribe(
        data => {
          this.users = data;
        },
        error => {
          console.error('Error fetching users by speciality:', error);
        }
      );
    }
  }
  
  

 
 
  
  


}
