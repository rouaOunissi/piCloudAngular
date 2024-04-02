import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
@Component({
  selector: 'app-ressource-component',
  templateUrl: './ressource-component.component.html',
  styleUrls: ['./ressource-component.component.css']
})
export class RessourceComponentComponent implements OnInit{
  title = "Liste des Ressources";
  ressources: any[] = [];

  constructor(
    private ressourceService: RessourceService,
    private router: Router,) { }

  ngOnInit(): void {
    this.loadRessources(); 
  }

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

  
  loadRessources(): void {
    this.ressourceService.getAllRessources().subscribe((data: any[]) => {
      this.ressources = data; 
    });
  }

  deletRessource(idRessource: number) {
    console.log(idRessource);
    this.ressourceService.deletRessource(idRessource).subscribe(
      (res) => {
        console.log('Ressource deleted successfully!');
        this.loadRessources();
        console.log(res);
   
      },
      (error) => {
        console.log(error);
      }
    );
  }
  
}
