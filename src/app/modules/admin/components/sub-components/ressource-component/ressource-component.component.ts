import { Component, OnInit,ElementRef, ViewChild} from '@angular/core';
import { Router } from '@angular/router'; 
import { RessourceService } from '../ressource-service/ressource.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgbModal,NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-ressource-component',
  templateUrl: './ressource-component.component.html',
  styleUrls: ['./ressource-component.component.css']
})
export class RessourceComponentComponent implements OnInit{
  title = "Liste des Ressources";
  ressources: any[] = [];
  @ViewChild('content') popupview !: ElementRef;
  selectedRessourceUrl: string = '';
  showPdfViewer: boolean = false;
  isPdfModalOpen: boolean = false;
  filteredRessources: any[] = [];
  selectedFilter: string = 'all';
  ressourceTypes: any[] = [];
  searchTerm: string = '';
  showResourceTypesList: boolean = false;

  constructor(
    private ressourceService: RessourceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private modalService: NgbModal) { 
      this.isPdfModalOpen = false; 
    }

  ngOnInit(): void {

    this.loadRessources(); 
    this.getRessourceTypes(); 
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
      this.filterRessources();
    });
  }


  filterRessources(): void {
   
    if (this.searchTerm.trim() !== '') {
      this.search();
    } else {
    
      this.filteredRessources = this.ressources;
    }
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

  
  modalRef: NgbModalRef | undefined;

  showPdf(urlFile: string): void {
    this.selectedRessourceUrl = urlFile;
    console.log('Opening PDF modal...');
    this.isPdfModalOpen = true;
    this.modalService.open(this.popupview, { size: 'lg' });
  }

  openPdfModal(): void {
    console.log('Opening PDF modal...');
    this.modalRef = this.modalService.open(this.popupview, { size: 'lg' });
  }

  closePdfModal(): void {
    console.log('Closing PDF modal...');
    if (this.modalRef) {
        this.modalRef.close();
    }
    this.isPdfModalOpen = false;
  }

  getPdfUrl(urlFile: string): SafeResourceUrl {
    const safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost/Files/${urlFile}`);
    return safeUrl;
  }

  getSafeUrl(url: string): SafeResourceUrl {
   
    const safeUrl = url.startsWith('http') ? url : `http://localhost/Files/${url}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(safeUrl);
  }
  

  pdfLoaded() {
    this.showPdfViewer = true;
  }



  search(): void {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    if (searchTerm !== '') {
      // Effectuer une recherche par titre
      this.ressourceService.searchRessourcesByTitre(searchTerm).subscribe(
        (titleResults) => {
          // Effectuer une recherche par mot-clé
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
      this.filteredRessources = [];
    }
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
