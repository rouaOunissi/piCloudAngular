import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserServiceService } from 'src/app/modules/admin/components/sub-components/user-component/user-services/user-service.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userId: string | null = localStorage.getItem('userId');


  user?: User;

  constructor(private userService: UserServiceService , private httpClient: HttpClient, private sanitizer: DomSanitizer) {}
  userImageUrl: string | null = null;



  ngOnInit(): void {
    const userId = this.userId;
    if (userId) {
      this.userService.getUserById(+userId).subscribe(
        (userData: User) => {
          this.user = userData;
          if (userData.image) {
            this.loadUserImage();
          }
        },
        (error) => {
          console.error('An error occurred while fetching user data', error);
        }
      );
    }
  }

  loadUserImage(): void {
    const userId = localStorage.getItem('userId')!;
    this.httpClient.get(`http://localhost:8010/api/users/${userId}/image`, { responseType: 'blob' }).subscribe(blob => {
      // Create a local URL for the image blob
      const objectUrl = URL.createObjectURL(blob);
      this.userImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl) as string;
    });
  }


}




