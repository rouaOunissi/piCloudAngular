import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../user-services/user-service.service';
import { map } from 'rxjs/operators';

interface UserRegistrationStat {
  month: number;
  count: number;
}

@Component({
  selector: 'app-user-stat',
  templateUrl: './user-stat.component.html',
  styleUrls: ['./user-stat.component.css']
})
export class UserStatComponent implements OnInit {

  userRegistrationStats: UserRegistrationStat[] = [];

  constructor(private userStatsService: UserServiceService) {}

  ngOnInit(): void {
    this.userStatsService.getUserRegistrationStats().subscribe(
      (data: string[]) => {
        const processedData = data.map((item: string) => {
          const parts = item.match(/Month: (\d+), Count: (\d+)/);
          return parts ? { month: parseInt(parts[1], 10), count: parseInt(parts[2], 10) } : null;
        }).filter((stat): stat is UserRegistrationStat => stat !== null);
    
        // Aggregate data and assign
        this.userRegistrationStats = this.aggregateData(processedData);
        console.log('Processed and aggregated data:', this.userRegistrationStats);
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
    
  }
  
  private aggregateData(data: UserRegistrationStat[]): UserRegistrationStat[] {
    const aggregation: { [key: number]: number } = {};
  
    // Aggregate counts by month
    data.forEach(stat => {
      aggregation[stat.month] = (aggregation[stat.month] || 0) + stat.count;
    });
  
    // Convert to array and sort by month for consistent order
    const sortedStats = Object.keys(aggregation)
      .map(key => ({
        month: parseInt(key, 10),
        count: aggregation[parseInt(key, 10)]
      }))
      .sort((a, b) => a.month - b.month);  // Ensure sorting by month index
  
    return sortedStats;
  }
  
  
  
  
  

  // Inside your component

  getMonthName(monthIndex: number): string {
    console.log('Received month index:', monthIndex);
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"];
    const name = monthNames[monthIndex - 1] || 'Unknown';
    console.log('Resolved month name:', name);
    return name;
  }
  

getRandomColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 50%, 50%)`;
}





}
