import { Component, OnInit } from '@angular/core';
import { Purchase } from '../Purchase';
import { ServicePaymentService } from '../service-payment.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-card-purchase',
  templateUrl: './card-purchase.component.html',
  styleUrls: ['./card-purchase.component.css']
})
export class CardPurchaseComponent implements OnInit {
  purchases?: Purchase[];
  totalRevenue: number = 0;
  totalCoursesSold: number = 0;
  chart?: Chart<"bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar", (number | undefined)[], string>;

  constructor(private service: ServicePaymentService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.service.getPurchases().subscribe({
      next: (data) => {
        this.purchases = data;
        this.calculateStatistics();
        this.createChart();
      },
      error: (error) => console.error('Error fetching purchases:', error)
    });
  }

  calculateStatistics(): void {
    this.totalRevenue = this.purchases?.reduce((acc, purchase) => acc + (purchase.price || 0), 0) ?? 0;
    this.totalCoursesSold = this.purchases?.length ?? 0;
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    const ctx = document.getElementById('revenueChart') as HTMLCanvasElement;
    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.purchases?.map(purchase => purchase.dateEnrolled ? new Date(purchase.dateEnrolled).toLocaleDateString() : 'Unknown Date') || [],
        datasets: [{
          label: 'Total Revenue',
          data: this.purchases?.map(purchase => purchase.price) || [],
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2,
          tension: 0.4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#009688' // Adjust tick color for better visibility
            }
          },
          x: {
            ticks: {
              color: '#009688' // Adjust tick color for better visibility
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: true,
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(tooltipItems) {
                return tooltipItems.dataset.label + ': $' + tooltipItems.raw;
              }
            }
          }
        },
        animation: {
          duration: 1500 // general animation time
        }
      }
    });
  }
}
