import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');
  userImage: SafeUrl | null = null;
  


  user?: User;

  constructor(private userService: UserServiceService , private httpClient: HttpClient, private sanitizer: DomSanitizer) {}
  

  



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
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files[0]) {
      this.selectedFile = event.target.files[0];
    }
  }
  addPic() : void{

    if (this.userId && this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
      
      
      this.userService.editUser(+this.userId, formData).subscribe({
        next: (response) => console.log('Image uploaded successfully'),
        error: (error) => console.error('Error uploading image:', error)
      });
    }
  }
  

  


}




