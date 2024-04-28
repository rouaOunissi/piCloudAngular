import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-ressource-update',
  templateUrl: './ressource-update.component.html',
  styleUrls: ['./ressource-update.component.css']
})
export class RessourceUpdateComponent implements OnInit {
 
  selectedFile: File | null = null;
  ressourceTypes: any[] = [];
  fileName: string = 'Choose file'; 
  previousTypeR: string = '';
  ressource = {
    typeR: '',
    description: '',
    idUser: '',
    nbrReact: 0,
    titre: '',
    urlFile: '',
    dateCreation: new Date(),
    fileName: '',
    fileType: '',
  };


  constructor(
    private http: HttpClient,
    private router: Router,
    private activated : ActivatedRoute,
    private ressourceService: RessourceService
) {}

ngOnInit(): void {
  this.getRessourceById();
  this.getRessourceTypes();

}

idRessource:number = this.activated.snapshot.params["id"];

getRessourceById(): void {
 this.ressourceService.getRessourceByID(this.idRessource).subscribe((response)=>
 {
  this.ressource=response;
  this.previousTypeR = response.TypeR;
  console.log(response);
 })
}

updateRess2(): void {
  if (this.selectedFile) {

    this.ressource.urlFile = this.selectedFile.name;
 
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('ressource', JSON.stringify(this.ressource));
    // Envoyer la mise à jour avec le fichier
    this.http.put('http://localhost:8060/api/v1/ressource/updateRess/' + this.idRessource, formData)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert("resource updated successfully!");
          this.router.navigate(['/front/main/ressource']);
        },
        (error: any) => {
          console.log(error);
          alert("An error occurred while updating the resource!");
        }
      );
  } else {
    
    this.http.put('http://localhost:8060/api/v1/ressource/updateRess/' + this.idRessource, this.ressource)
      .subscribe(
        (res: any) => {
          console.log(res);
          alert("resource updated successfully!");
          this.router.navigate(['/front/main/ressource']);
        },
        (error: any) => {
          console.log(error);
          alert("An error occurred while updating the resource!");
        }
      );
  }
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
