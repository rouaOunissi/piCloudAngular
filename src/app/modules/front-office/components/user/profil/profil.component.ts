import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');
  userImage: SafeUrl | null = null;
  


  user?: User;

  constructor(private userService: UserServiceService ,
     private httpClient: HttpClient, 
     private sanitizer: DomSanitizer,
     private router : Router) {
    
  }
  

  



  ngOnInit(): void {
    const userId = this.userId;
    if (userId) {
      this.userService.getUserById(+userId).subscribe(
        (userData: User) => {
          this.user = userData;
          // Now we need to check if the user has an image
          if (this.user.image) {
            // Assuming the image property is a base64 string, we convert it to a Blob
            const imageBlob = this.b64toBlob(this.user.image);
            const objectURL = URL.createObjectURL(imageBlob);
            // Sanitize the URL and bind it to the userImage property
            this.userImage = this.sanitizer.bypassSecurityTrustUrl(objectURL);
          }
        },
        (error) => {
          console.error('An error occurred while fetching user data', error);
        }
      );
    }
  }

  b64toBlob(b64Data: string, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
  
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
      const byteNumbers = new Array(slice.length);
  
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
  
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }



  selectedFile: File | null = null;
  
 
 

  onFileSelected(event: Event) {
    const element = event.currentTarget as HTMLInputElement;
    let file: File | null = null;

    if (element.files != null) {
      file = element.files[0];
    }

    if (file) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userService.updateUserImage(+userId, file).subscribe({
          next: (response) => {
            console.log('Image updated successfully:', response);
            window.location.reload();
            
          },
          error: (error) => {
            console.error('Error updating image:', error);
            
          }
        });
      } else {
        console.error('User ID is not found in local storage.');
        
      }
    }
  }

 
  

  


}




