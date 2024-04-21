import { Component, OnInit } from '@angular/core';
import { ProjectServiceService } from 'src/app/modules/admin/service-projet/project-service.service';



@Component({
  selector: 'app-stat-project',
  templateUrl: './stat-project.component.html',
  styleUrls: ['./stat-project.component.css']
})
export class StatProjectComponent implements OnInit  {

  categoryStats: any[] = [];

  constructor(private projectStatsService: ProjectServiceService) {}

  ngOnInit() {
    this.loadCategoryStats();
  }

  loadCategoryStats(): void {
    this.projectStatsService.getCategoryStats().subscribe(
      stats => {
        this.categoryStats = stats;
      },
      error => {
        console.error('There was an error fetching the category statistics!', error);
      }
    );
  }

  getRandomColor(): string {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 50%)`;
  }

}
