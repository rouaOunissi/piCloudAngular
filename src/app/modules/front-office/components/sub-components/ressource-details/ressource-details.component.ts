import { Component, OnInit,ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RessourceService } from '../ressource-service/ressource.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-ressource-details',
  templateUrl: './ressource-details.component.html',
  styleUrls: ['./ressource-details.component.css']
})
export class RessourceDetailsComponent implements OnInit{
  @ViewChildren('notUser') notUser: any;
  ressourceContent: string  = ''; 
  fileContent: string  = '';
  qrCodeUrl: string = '';
  userId: number | null = null;
  totalReactions: number = 0; 


  constructor(
    private route: ActivatedRoute, 
    private ressourceService: RessourceService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }

  ressource = {
    idRessource: 0,
    typeR: '',
    description: '',
    idUser: 0,
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
      this.checkUserReaction3(id);
      this.checkUserReaction2(id);
      this.getTotalReactionsForRessource(id);

      const userIdFromStorage = localStorage.getItem("userId");
      console.log('User ID from storage:', userIdFromStorage);
      
      if (userIdFromStorage) {
          this.userId = parseInt(userIdFromStorage, 10);
          console.log('Parsed user ID:', this.userId);
      }
  
      if (this.userId !== null) {
        this.ressourceService.checkUserReaction(id, this.userId)?.subscribe(
          (hasReacted: boolean) => {
            this.isLiked = hasReacted; 
            if (hasReacted) {
              this.reactedRessources.push(id);
            }
          },
          (error) => {
            console.error('Error checking user reaction:', error);
          }
        );
      }
    });
    this.generateQrCode();

  }
  
  getTotalReactionsForRessource(id: number): void {
    this.ressourceService.getTotalReactionsForRessource(id).subscribe(
      (data: any) => {
        this.totalReactions = data; 
      },
      (error) => {
        console.error('Error fetching total reactions:', error);
      }
    );
  }

  checkUserReaction3(idRessource: number): void {
    // Check if userId is not null before subscribing
    if (this.userId !== null) {
        this.ressourceService.checkUserReaction(idRessource, this.userId).subscribe(
            (reaction: any) => {
                if (reaction) {
                    this.reactedRessources.push(idRessource);
                }
            },
            (error) => {
                console.error('Error checking user reaction:', error);
            }
        );
    }
}


  checkUserReaction2(idRessource: number): void {
    const reactionState = localStorage.getItem(`reaction_${idRessource}`);
    if (reactionState === 'liked') {
      this.isLiked = true;
    } else if (reactionState === 'disliked') {
      this.isLiked = false;
    }
  }

  reactedRessources: number[] = [];
  isLiked: boolean = false;
  
  reactToRessource(idRessource: number): void {
    console.log('User ID:', this.userId);
    if (this.userId !== null) {
      this.ressourceService.reactToRessource(idRessource, this.userId).subscribe(
        (res) => {
          console.log(res);
          if (!this.isLiked) {
            // Augmenter le nombre de réactions après un like réussi
            this.ressource.nbrReact++; // Incrémenter le nombre de réactions
            this.reactedRessources.push(idRessource);
          } else {
            // Diminuer le nombre de réactions après un dislike
            this.ressource.nbrReact--; // Décrémenter le nombre de réactions
            // Retirer la réaction de la liste
            const index = this.reactedRessources.indexOf(idRessource);
            if (index !== -1) {
              this.reactedRessources.splice(index, 1);
            }
          }
          // Inverser l'état du bouton
          this.isLiked = !this.isLiked;
          // Enregistrer l'état de la réaction dans le stockage local
          localStorage.setItem(`reaction_${idRessource}`, this.isLiked ? 'liked' : 'disliked');
          this.getTotalReactionsForRessource(idRessource);
        },
        (error) => {
          console.log(error);
          alert("Try again!");
        }
      );
    } else {
      console.error('User ID is null. Cannot react to resource.');
    }
  }
  
  

  // Méthode pour vérifier si l'utilisateur a réagi à une ressource
  isReacted(idRessource: number): boolean {
    return this.reactedRessources.includes(idRessource);
  }


  getPdfUrl(urlFile: string): SafeResourceUrl {
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`http://localhost/Files/${urlFile}`);
      return sanitizedUrl;
  }

    formatDate(date: Date): string {
      const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: '2-digit' };
      return date.toLocaleDateString('en-GB', options);
    }
    
    shouldHideButtons = false;
    getRessourceByID(id: number): void {
      this.ressourceService.getRessourceByID(id).subscribe(
        (data: any) => {
          this.ressource = data;
          this.ressource.dateCreation = new Date(this.ressource.dateCreation); 
  
          console.log('connected UserId:', this.userId);
          console.log('Parsed id User de la resource:', this.ressource.idUser);
          const url = this.ressource.urlFile;
          this.generateQrCode();
    
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

        const blob = new Blob([data], { type: 'application/octet-stream' });

        const url = window.URL.createObjectURL(blob);
  

        window.open(url, '_blank');
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching file content:', error);
      }
    );
  }
  
  
  deleteRessource(idRessource: number): void {
    console.log(idRessource);
    this.ressourceService.deleteRessource(idRessource).subscribe(
      () => {
        console.log('Resource deleted successfully!');
        this.router.navigate(['/front/main/ressource']);
      },
      (error) => {
        console.log(error);
      }
    );
  } 
  
  downloadFile(): void {
    if (this.ressource.urlFile) {
        const fileId = this.ressource.urlFile; 
        const fileName = this.ressource.fileName;
        const userId = this.userId;
        const downloadUrl = `http://localhost:8060/api/v1/download/download/${fileId}/${fileName}/${userId}`;
        const anchor = document.createElement('a');
        anchor.href = downloadUrl;
        anchor.download = fileName;

        anchor.click();
    }
}


generateQrCode(): void {
  const urlFile = this.ressource.urlFile;
  const downloadUrl = `http://localhost:8060/api/qr/generate?urlFile=${urlFile}`;
  this.http.post(downloadUrl, this.ressource, { responseType: 'blob' }).subscribe(
    (data: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.qrCodeUrl = e.target.result;
      };
      reader.readAsDataURL(data);
    },
    (error) => {
      console.error('Error generating QR code:', error);
    }
  );
}



}