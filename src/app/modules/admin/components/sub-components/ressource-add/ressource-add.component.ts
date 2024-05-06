import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient } from '@angular/common/http';
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
  ) {}


  ngOnInit(): void {
    this.getRessourceTypes();

    // Récupérer l'id de l'utilisateur depuis le localStorage
    const userIdFromStorage = localStorage.getItem('userId');
    console.log('User ID from storage:', userIdFromStorage);
    if (userIdFromStorage) {
        this.userId = parseInt(userIdFromStorage, 10);
        console.log('Parsed user ID:', this.userId);
    }
}

showErrorMessage: boolean = false;

addRessource(): void {

  /////////TESSTTT FOR MEERGEEE  

  if (!this.ress.titre || !this.ress.typeR || !this.selectedFile || !this.ress.description) {

    this.showErrorMessage = true;
    return; 
  }

  const formData = new FormData();

    if (this.selectedFile) {
        formData.append('file', this.selectedFile);
    } else {
   
        alert('File is required');
        return;
    }

   const ressourceData = { ...this.ress, idUser: this.userId };

   formData.append('ressource', JSON.stringify(ressourceData));


  console.log('UserID before appending to formData:', this.userId);


  if (this.userId !== null) {
    formData.append('idUser', this.userId.toString()); 
  }

  this.http.post('http://localhost:8060/api/v1/ressource/uploadRessData', formData)
    .subscribe(
      (response: any) => { 
        console.log('Ressource added successfully:', response);
        alert('Resource added successfully');
        this.ress = {};
        this.fileName = ''; 
        this.router.navigate(['/admin/main/ressource']);
      },
      (error: any) => { 
        console.error('Error adding ressource:', error);
        alert('Try again !');
        this.showErrorMessage = true; 
        this.ress = {};
        this.fileName = '';
      }
      
    );
}   

    onFileSelected(event: any): void {
      // Mettez à jour la variable selectedFile avec le fichier sélectionné
      this.selectedFile = event.target.files[0];
      // Mettez à jour le label personnalisé avec le nom du fichier sélectionné
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
