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
  @ViewChild('myChart1') myCanvas1!: ElementRef<HTMLCanvasElement>; // Marked as definitely assigned

  courses: Course[] = [];
  chart!: Chart;
  chartrate!: Chart;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAll().subscribe((data: Course[]) => {
      console.log("Loaded courses:", data);
      this.courses = data;
      this.updateChart();
      this.updateChartRate();
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

  updateChartRate(): void {
    const titles: string[] = [];
    const rates: (number | null)[] = []; // Change the type to allow null values

    // Extract titles and rates, filtering out courses with undefined titles
    this.courses.forEach(course => {
      if (course.title !== undefined) {
        titles.push(course.title);
        if (typeof course.rate === 'number') {
          rates.push(course.rate);
        } else {
          rates.push(null); // Replace undefined with null
        }
      }
    });

    if (this.chartrate) {
      this.chartrate.data.labels = titles;
      this.chartrate.data.datasets[0].data = rates;
      this.chartrate.update();
    } else {
      this.chartrate = new Chart(this.myCanvas1.nativeElement, {
        type: 'bar',
        data: {
          labels: titles,
          datasets: [{
            label: 'Rate',
            data: rates,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
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
