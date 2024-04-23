import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-services/user-service.service';

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.css']
})
export class UserStatComponent implements OnInit {

  userRegistrationStats: any[] = [];

  constructor(private userStatsService: UserServiceService) {}

  ngOnInit(): void {
    this.userStatsService.getUserRegistrationStats().subscribe(
      (data) => {
        this.userRegistrationStats = data;
        console.log(this.userRegistrationStats);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }

  // Inside your component

getMonthName(monthIndex: number): string {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[monthIndex - 1] || 'Unknown'; // Adjust according to how your months are indexed
}

getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 50%)`;
}


}
