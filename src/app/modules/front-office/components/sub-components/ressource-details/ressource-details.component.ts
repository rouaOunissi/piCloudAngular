import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.component.html',
  styleUrls: ['./ressource-details.component.css']
})
export class RessourceDetailsComponent implements OnInit{
  
  ressourceContent: string  = ''; 
  fileContent: string  = '';
  
  constructor(
    private route: ActivatedRoute, // Importer ActivatedRoute
    private ressourceService: RessourceService,
    private router: Router,
    private http: HttpClient
  ) { }

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

    ngOnInit(): void {

    this.route.params.subscribe(params => {
      const id = params['id'];
     
      this.getRessourceByID(id);
    });
  
  }
    

  
    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
      return date.toLocaleDateString('en-GB', options);
    }
    

    getRessourceByID(id: number): void {
    this.ressourceService.getRessourceByID(id).subscribe(
      (data: any) => {
        this.ressource = data;
        this.ressource.dateCreation = new Date(this.ressource.dateCreation); 
        
      const url = this.ressource.urlFile;
      
    
      this.getFileContent(id);
    
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRessourceContent(url: string): void {
    this.ressourceService.getRessourceContent(url).subscribe(
      (content: string) => {
        this.fileContent = content;
      },
      error => {
        console.error('Failed to fetch file content:', error);
      }
    );
  }

  getFileContent(id: number): void {
    this.ressourceService.getFileContent(id).subscribe(
      (data: any) => {
        // Créez un objet blob à partir des données binaires
        const blob = new Blob([data], { type: 'application/octet-stream' });
  
        // Génère une URL pour le blob
        const url = window.URL.createObjectURL(blob);
  
        // Ouvrir le fichier dans une nouvelle fenêtre
        window.open(url, '_blank');
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
  
  
  
  

  openPdf(pdfUrl: string): void {
    window.open(pdfUrl, '_blank');
  }

  PreviewInvoice(invoiceno: any) {
    this.ressourceService.GenerateInvoicePDF(invoiceno).subscribe(res => {
      let blob: Blob = res.body as Blob;
      let url = window.URL.createObjectURL(blob);
      this.ressourceContent = url;
    })
  }

  downloadFile(): void {
    if (this.ressource.urlFile) {
      const fileId = this.ressource.urlFile; 
      const fileName = this.ressource.fileName;
      window.open(`http://localhost:8060/api/v1/download/download/${fileId}/${fileName}`, '_blank');
    }
  }






}
