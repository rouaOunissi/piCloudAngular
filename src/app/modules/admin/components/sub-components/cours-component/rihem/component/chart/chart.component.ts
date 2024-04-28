import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { Course } from 'src/app/modules/models/course.model';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('myChart') myCanvas!: ElementRef<HTMLCanvasElement>; // Marked as definitely assigned

  courses: Course[] = [];
  chart!: Chart;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      console.log("Loaded courses:", data);
      this.courses = data;
      this.updateChart();
    });
  }

  updateChart(): void {
    const titles: string[] = [];
    const prices: (number | null)[] = []; // Change the type to allow null values

    // Extract titles and prices, filtering out courses with undefined titles
    this.courses.forEach(course => {
      if (course.title !== undefined) {
        titles.push(course.title);
        if (typeof course.price === 'number') {
          prices.push(course.price);
        } else {
          prices.push(null); // Replace undefined with null
        }
      }
    });

    if (this.chart) {
      this.chart.data.labels = titles;
      this.chart.data.datasets[0].data = prices;
      this.chart.update();
    } else {
      this.chart = new Chart(this.myCanvas.nativeElement, {
        type: 'bar',
        data: {
          labels: titles,
          datasets: [{
            label: 'Price',
            data: prices,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }




  ngAfterViewInit(): void {
    // Register necessary plugins for Chart.js
    Chart.register(...registerables);
  }
}
