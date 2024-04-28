import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';

@Component({
  selector: 'app-ressource-add',
  templateUrl: './ressource-add.component.html',
  styleUrls: ['./ressource-add.component.css']
})
export class RessourceAddComponent implements OnInit {
  ress: any = {}; 
  ressourceTypes: any[] = [];
  selectedFile: File | null = null;
  fileName: string = 'Choose file'; 
  userId: number | null = null;


 
 

  constructor(
    private router: Router,
    private http: HttpClient,
    private ressourceService: RessourceService
) {
  
}



ngOnInit(): void {this.getRessourceTypes();
    // Récupérer l'id de l'utilisateur depuis le localStorage
    const userIdFromStorage = localStorage.getItem('userId');
    console.log('User ID from storage:', userIdFromStorage);
    if (userIdFromStorage) {
        this.userId = parseInt(userIdFromStorage, 10);
        console.log('Parsed user ID:', this.userId);
    }

}



addRessource(): void {
  const formData = new FormData();
  if (this.selectedFile) {
    formData.append('file', this.selectedFile);
  }
   // Pass userId along with ressource object
   const ressourceData = { ...this.ress, idUser: this.userId };

   formData.append('ressource', JSON.stringify(ressourceData));

  // Logging userId to ensure it's not null
  console.log('UserID before appending to formData:', this.userId);

  // Ajouter l'id de l'utilisateur au formulaire
  if (this.userId !== null) {
    formData.append('idUser', this.userId.toString()); 
  }

  this.http.post('http://localhost:8060/api/v1/ressource/uploadRessData', formData)
    .subscribe(
      (response: any) => { 
        console.log('Ressource added successfully:', response);
      
        this.ress = {};
        this.fileName = ''; 
         // Rediriger vers la table des ressources
        this.router.navigate(['/front/main/ressource']);
      },
      (error: any) => { 
        console.error('Error adding ressource:', error);
      }
    );
}




onFileSelected(event: any): void {

  this.selectedFile = event.target.files[0];

  const fileName = this.selectedFile ? this.selectedFile.name : 'Choose file';
  const inputElement = document.getElementById('exampleInputFile');
  if (inputElement && inputElement.nextElementSibling) {
      inputElement.nextElementSibling.innerHTML = fileName;
  }
}



getRessourceTypes(): void {
  this.ressourceService.getRessourceTypes().subscribe(
      (types: any[]) => {
          this.ressourceTypes = types; 
      },
      (error: any) => {
          console.log(error);
      }
  );
}



}
