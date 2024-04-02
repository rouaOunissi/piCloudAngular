import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RessourceService } from '../ressource-service/ressource.service';

@Component({
  selector: 'app-ressource',
  templateUrl: './ressource.component.html',
  styleUrls: ['./ressource.component.css']
})
export class RessourceComponent implements OnInit{
  title = "Liste des Ressources";
  ressources: any[] = [];
  filteredRessources: any[] = [];
  selectedFilter: string = 'all';
  ressourceTypes: any[] = [];

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

  

    loadRessources():  void {
      this.ressourceService.getAllRessources().subscribe(data => {
          this.ressources = data;
      }, error => {
          console.log(error);
      });
  }

    formatDate(date: string): string {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
      return new Date(date).toLocaleDateString('en-GB', options);
  }
  
  filterByType(type: string): void {
    this.selectedFilter = type; 
    if (type === 'all') {
        this.filteredRessources = this.ressources; 
    } else {
        this.filteredRessources = this.ressources.filter(ressource => ressource.typeR === type); 
    }
}

deleteRessource(idRessource: number): void {
  console.log(idRessource);
  this.ressourceService.deleteRessource(idRessource).subscribe(
    () => {
      console.log('Ressource deleted successfully!');
      this.loadRessources();
    },
    (error) => {
      console.log(error);
    }
  );
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
