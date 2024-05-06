import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-ressource-update',
  templateUrl: './ressource-update.component.html',
  styleUrls: ['./ressource-update.component.css']
})
export class RessourceUpdateComponent implements OnInit{


  selectedFile: File | null = null;
  ressourceTypes: any[] = [];
  fileName: string = 'Choose file'; 
  previousTypeR: string = '';
  ressource = {
    TypeR: '',
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
  this.fileName = this.extractFileName(response.urlFile); 
  console.log(response);
 })
}


extractFileName(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}


updateRess2(): void {
  const formData = new FormData();
  formData.append('ressource', JSON.stringify(this.ressource));

  if (this.selectedFile) {
    this.ressource.urlFile = this.selectedFile.name;
    formData.append('file', this.selectedFile);
  }

  this.http.put('http://localhost:8060/api/v1/ressource/updateRess/' + this.idRessource, formData)
    .subscribe(
      (res: any) => {
        console.log(res);
        alert("Resource updated successfully!");
        this.router.navigate(['/admin/main/ressource']);
      },
      (error: any) => {
        console.log(error);
        alert("An error occurred while updating the resource!");
      }
    );
}


onFileSelected(event: any): void {
  this.selectedFile = event.target.files[0];
  this.fileName = this.selectedFile ? this.selectedFile.name : 'Choose file';
  const inputElement = document.getElementById('exampleInputFile');
  if (inputElement && inputElement.nextElementSibling) {
      inputElement.nextElementSibling.innerHTML = this.fileName;
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
