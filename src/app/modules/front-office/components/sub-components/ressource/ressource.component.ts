import { Component,OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { RessourceService } from '../ressource-service/ressource.service';

import * as jsPDF from 'jspdf';

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
  p: number = 1;
  itemsPerPage: number =3;
  totalressource : any ;
  searchTerm: string = '';
  showResourceTypesList: boolean = false;


  constructor(
    private ressourceService: RessourceService,
    private router: Router,) { }

    ngOnInit(): void {
      this.loadRessources(); 
      this.getRessourceTypes(); 
      this.filterRessources();
 
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
          this.totalressource= data.length;
          this.filterRessources();
      }, error => {
          console.log(error);
      });
  }

  search(): void {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    if (searchTerm !== '') {
      this.ressourceService.searchRessourcesByTitre(searchTerm).subscribe(
        (titleResults) => {
          this.ressourceService.searchRessourcesByKeyword(searchTerm).subscribe(
            (keywordResults) => {
              const mergedResults = [...titleResults, ...keywordResults.filter(keywordResult => !titleResults.some(titleResult => titleResult.id === keywordResult.id))];
              this.filteredRessources = mergedResults;
              console.log("Ressources récupérées avec succès");
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      // If search term is empty, reload all resources
      this.loadRessources();
    }
  }
  
  filterRessources(): void {
    const searchTerm = this.searchTerm.trim().toLowerCase();
    if (searchTerm !== '') {
      // Apply search filter if search term is not empty
      this.search();
    } else {
      // If search term is empty, display all resources
      this.filteredRessources = this.ressources;
    }
  }
    formatDate(date: string): string {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
      return new Date(date).toLocaleDateString('en-GB', options);
  }
  
  filterByType(type: string): void {
    this.selectedFilter = type; 
    if (type === 'all') {
        this.filteredRessources = this.ressources; 
        console.log("all ress");
    } else {
        this.ressourceService.getRessourcesByType(type).subscribe(
          (result) => {
              this.filteredRessources = result;
              console.log("filtred ress")
          },
          (error) => {
              console.error(error);
          }
        );
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

  
  previousPage(): void {
    if (this.p > 1) {
        this.p--;
    }
}

nextPage(): void {
  
    if (this.p < Math.ceil(this.totalressource / this.itemsPerPage)) {
        this.p++;
    }
}

goToPage(pageNumber: number): void {
    this.p = pageNumber;
}

typeImages: { [key: string]: string } = {
  'Examen': 'assets/frontOffice/images/exams.jpg',
  'Tp': 'assets/frontOffice/images/tps.png',
  'TD': 'assets/frontOffice/images/tps.png',
  'Posit': 'assets/frontOffice/images/tps.png',
  'Rapport': 'assets/frontOffice/images/pfe2.jpg',

}; 

   ms: any = '0' + 0;
  sec: any = '0' + 0;
  min: any = '' + 25; 
  hr: any = '0' + 0;
  running = false;
  startTimer: any;
  timeRemaining: number = 25 * 60;

 


  start(): void {
    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        if (this.timeRemaining > 0) {
          this.timeRemaining--;
          this.updateTimeDisplay(); 
        } else {
          clearInterval(this.startTimer); 
          this.running = false;
     
          this.startBreak();
        }
      }, 1000);
    }
  }
  startBreak(): void {
    this.timeRemaining = 5 * 60; 
    this.startTimer = setInterval(() => {
      if (this.timeRemaining > 0) {
        this.timeRemaining--;
        this.updateTimeDisplay();
      } else {
        clearInterval(this.startTimer); 
        this.running = false;

        this.start();
      }
    }, 1000);
  }
  reset(): void {
    clearInterval(this.startTimer);
    this.running = false;
    this.timeRemaining = 25 * 60; 
    this.updateTimeDisplay(); 
  }
  
  updateTimeDisplay(): void {

    let minutes: number = Math.floor(this.timeRemaining / 60);
    let seconds: number = this.timeRemaining % 60;
  

    this.hr = '0' + Math.floor(minutes / 60); 
    this.min = minutes < 10 ? '0' + minutes : minutes;
    this.sec = seconds < 10 ? '0' + seconds : seconds; 
  }
  

  
  userNotes: string = '';

  updateAndDownloadNotes(): void {
    console.log("Contenu de userNotes avant la mise à jour :", this.userNotes);
    const content = this.userNotes.trim(); 
    this.downloadNotesAsPDF(content);
  }
  
  downloadNotesAsPDF(content: string): void {
    const pdf = new jsPDF.default();
    

    const firstWord = content.trim().split(' ')[0];
    

    const fileName = `${firstWord}.pdf`;

     pdf.text(`Titre : ${firstWord}`, 10, 10);
    
   
    pdf.text(content, 10, 20);
    
  
    pdf.save(fileName);
  }
  onUserNotesChange(event: any): void {
    this.userNotes = event.target?.value || ''; 
    console.log("Nouveau contenu de userNotes :", this.userNotes);
  }


}
