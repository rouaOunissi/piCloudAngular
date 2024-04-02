import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
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

   updateRessource(): void {
   this.ressourceService.updateRessource(this.ressource, this.idRessource).subscribe((res)=>{
    console.log(res);
    alert("ressource updated Succesfully!");
    this.router.navigate(['/front/main/ressource']);
   },(error)=>
  {
    console.log(error);
    alert("Try again!")
   })
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
