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


  constructor(
      private router: Router,
      private http: HttpClient,
      private ressourceService: RessourceService
  ) {}


    ngOnInit(): void {this.getRessourceTypes();}

    addRessource(): void {
      const formData = new FormData();
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      formData.append('ressource', JSON.stringify(this.ress));
  
      this.http.post('http://localhost:8060/api/v1/ressource/uploadRessData', formData)
        .subscribe(
          (response: any) => { 
            console.log('Ressource added successfully:', response);
          
            this.ress = {};
            this.fileName = ''; 
             // Rediriger vers la table des ressources
            this.router.navigate(['/admin/main/ressource']);
          },
          (error: any) => { 
            console.error('Error adding ressource:', error);
            
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
