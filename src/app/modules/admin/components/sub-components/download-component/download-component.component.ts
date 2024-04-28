import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

interface DownloadType {
  type: string;
  count: number;
}
interface MonthlyDownloadData {
  [month: string]: number;
}

interface Ressource {
  idRessource: number;
  typeR: string;
  description: string;
  idUser: string;
  nbrReact: number;
  titre: string;
  urlFile: string;
  dateCreation: Date;
  fileName: string;
  fileType: string;
}


@Component({
  selector: 'app-download-component',
  templateUrl: './download-component.component.html',
  styleUrls: ['./download-component.component.css']
})
export class DownloadComponentComponent implements OnInit{
 
  downloads: any[] = []; 
  totalDownloads: number = 0;
  mostDownloadedResource: Ressource | null = null;


  constructor(private http: HttpClient) { }

  download = {

    idUser: '',
    dateDownload: new Date(),
 
  };
  lastWeekKeys: string[] = [];
  lastWeekValues: number[] = [];

  ngOnInit(): void {
    this.countDownloads();
    this.loadDownloads();
    this.getLastWeekDownloads();
    this.getTotalDownloadsByType();
    this.getDownloadsByDay();
    this.getDownloadsByMonth();
    this.loadMostDownloadedResource();
    
  }


  loadDownloads(): void {
     this.http.get<any[]>('http://localhost:8060/api/v1/download/getDownloads').subscribe(data => {
      this.downloads = data;
  }, error => {
      console.log(error);
  });
  }

  countDownloads(): void {
    this.http.get<number>('http://localhost:8060/api/v1/download/countDownloads')
      .subscribe(
        (count) => {
          this.totalDownloads = count;
        },
        (error) => {
          console.error('Error counting downloads:', error);
        }
      );
  }

 
  deleteDownload(idDownload: number): void {
    console.log(idDownload);
    this.http.delete<any>('http://localhost:8060/api/v1/download/deleteDownByid/' + idDownload).subscribe(
      (res) => {
        console.log('Download deleted successfully!');
        this.loadDownloads();
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  }


  //Statistics

  lastWeekDownloads: Map<string, number> = new Map();
  thisWeekDownloads: Map<string, number> = new Map();
  getLastWeekDownloads(): void {
    this.http.get<Map<string, number>>('http://localhost:8060/api/v1/download/getLastWeekDownloads')
      .subscribe(
        (data) => {
          console.log('Last week downloads received:', data);
          this.lastWeekKeys = Object.keys(data);
          this.lastWeekValues = Object.values(data);
          this.getThisWeekDownloads(this.lastWeekKeys, this.lastWeekValues);
        },
        (error) => {
          console.error('Error getting last week downloads:', error);
        }
      );
  }
  
  getThisWeekDownloads(lastWeekKeys: string[], lastWeekValues: number[]): void {
    this.http.get<Map<string, number>>('http://localhost:8060/api/v1/download/getThisWeekDownloads')
      .subscribe(
        (data) => {
          console.log('This week downloads received:', data);
          const thisWeekKeys = Object.keys(data);
          const thisWeekValues = Object.values(data);
          this.loadChart(lastWeekKeys, lastWeekValues, thisWeekKeys, thisWeekValues); // Appel loadChart avec les données de la semaine dernière et de cette semaine
        },
        (error) => {
          console.error('Error getting this week downloads:', error);
        }
      );
  }
  loadChart(lastWeekKeys: string[], lastWeekValues: number[], thisWeekKeys: string[], thisWeekValues: number[]): void {
    
  
    // Construire les labels en utilisant les clés des téléchargements de la semaine dernière
    const lastWeekLabels = lastWeekKeys.map(key => {
      const [month, day] = key.split('-');
      return ` ${month}-${day}`;
    });
  
    // Construire les labels en utilisant les clés des téléchargements de cette semaine
    const thisWeekLabels = thisWeekKeys.map(key => {
      const [month, day] = key.split('-');
      return `${month}-${day}`;
    });
  
    // Utiliser les valeurs des téléchargements pour la semaine dernière et cette semaine
    const lastWeekData = lastWeekValues;
    const thisWeekData = thisWeekValues;
  
    
    const ctx = document.getElementById('downloads-chart') as HTMLCanvasElement;
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: lastWeekLabels, // Utilisez les labels de la semaine dernière
        datasets: [
          {
            label: 'Last Week Downloads',
            data: lastWeekData,
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          },
          {
            label: 'This Week Downloads',
            data: thisWeekData,
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.1
          }
        ]
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


  pieChart: any;
  getTotalDownloadsByType(): void {
    const types = [
      'totalDownloadsOfTypeExam',
      'totalDownloadsOfTypePosit',
      'totalDownloadsOfTypeTD',
      'totalDownloadsOfTypeTp',
      'totalDownloadsOfTypeRapport'
    ];

    const data: DownloadType[] = []; // Specify type as DownloadType[]

    types.forEach(type => {
      this.http.get<number>(`http://localhost:8060/api/v1/download/${type}`)
        .subscribe(
          (count) => {
            console.log(`Total downloads for type ${type}:`, count); 
            data.push({ type, count });
            
            // Check if all data is fetched before rendering the pie chart
            if (data.length === types.length) {
              this.renderPieChart(data);
            }
          },
          (error) => {
            console.error(`Error getting total downloads for type ${type}:`, error);
          }
        );
    });
  }

  renderPieChart(data: DownloadType[]): void {
    const labelsWithCounts = data.map(item => `${item.type} (${item.count})`);
    const counts = data.map(item => item.count);
    const colors = ['#dc3545', '#28a745', '#ffc107', '#17a2b8', '#007bff', '#6c757d'];

    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: labelsWithCounts, 
        datasets: [{
          data: counts,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Total Downloads by Resource Type'
          },
          legend: {
            display: true,
            position: 'right'
          }
        }
      }
    });
}

  barChart: any;
  dailyDownloads: number[] = [];



  getDownloadsByDay(): void {
    this.http.get<number>('http://localhost:8060/api/v1/download/getDownloadsByDay')
      .subscribe(
        (data) => {
          console.log('Daily downloads data:', data); 
         
          this.dailyDownloads = [data];
         
        },
        (error) => {
          console.error('Error getting daily downloads:', error);
        }
      );
  }
  




  showTotalDownloads: boolean = false;
  showDownloadsByDay: boolean = false;
  showTopDownload: boolean = false;
  
  showAll(): void {

    this.showTotalDownloads = true;
    this.showDownloadsByDay = true; 
    this.showTopDownload = true;
  }
  
  showTotalDownload(): void {
  
    this.showTotalDownloads = true;
    this.showDownloadsByDay = false;
    this.showTopDownload = false;
  }
  
  showDownloadByDay(): void {
 
    this.showTotalDownloads = false;
    this.showDownloadsByDay = true;
    this.showTopDownload = false;
  }

  showTopsDownload(): void {
 
    this.showTotalDownloads = false;
    this.showDownloadsByDay = false;
    this.showTopDownload = true; 
  }

  getDownloadsByMonth(): void {
    this.http.get<MonthlyDownloadData>('http://localhost:8060/api/v1/download/countDownloadsByMonth')
      .subscribe(
        (data) => {
          console.log('Monthly downloads data:', data);
  
          const months = Object.keys(data);
          const downloadCounts = Object.values(data);
  
          this.renderMonthlyBarChart(months, downloadCounts);
        },
        (error) => {
          console.error('Error getting monthly downloads:', error);
        }
      );
  }

  renderMonthlyBarChart(months: string[], downloadCounts: number[]): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;
    console.log('Rendering monthly bar chart with data:', months, downloadCounts);
    
    this.barChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: months,
        datasets: [{
          label: 'Downloads per month',
          data: downloadCounts,
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
  
  generatePDF(): void {
   
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const margin = {
        top: 20,
        bottom: 20,
        left: 10,
        right: 10
    };

  
    const currentDate = new Date().toLocaleDateString();
    pdf.text(`Statistics Report - ${currentDate}`, margin.left, margin.top);

   
    const reportContent = [
        'This report contains statistics for downloads.',
        `Total Downloads: ${this.totalDownloads}`,
        `Top Downloaded Resource: ${this.mostDownloadedResource ? this.mostDownloadedResource.titre : 'N/A'}`
    ];

    
    let currentY = margin.top + 10; 
    reportContent.forEach(section => {
        pdf.text(section, margin.left, currentY);
        currentY += 10;
    });

    
    const canvasElements = [
        document.getElementById('downloads-chart') as HTMLCanvasElement,
        document.getElementById('pieChart') as HTMLCanvasElement,
        document.getElementById('barChart') as HTMLCanvasElement
    ];


    const imagePromises: Promise<HTMLCanvasElement>[] = canvasElements.map(canvas =>
        html2canvas(canvas, { width: 800, height: 700 })
    );

    Promise.all(imagePromises)
        .then((canvasArray: HTMLCanvasElement[]) => {
   
            canvasArray.forEach((canvas, index) => {
                const imgData = canvas.toDataURL('image/png');
                const width = pdf.internal.pageSize.getWidth();
                const height = (canvas.height * width) / canvas.width;

          
                const remainingHeight = pdf.internal.pageSize.getHeight() - currentY - margin.bottom;
                if (height > remainingHeight) {
                    pdf.addPage();
                    currentY = margin.top;
                }

                pdf.addImage(imgData, 'PNG', margin.left, currentY, width - margin.left - margin.right, height);
                currentY += height + 10; 
            });

            pdf.save('statistics.pdf');
        })
        .catch(error => {
            console.error('Error generating PDF:', error);
        });
}

// the most Downloded resource

ressource = {
  idRessource: 0,
  typeR: '',
  description: '',
  idUser: '',
  nbrReact: 0,
  titre: '',
  urlFile: '',
  dateCreation: new Date(),
  fileName: '',
  fileType: '',
};


  loadMostDownloadedResource(): void {
    this.http.get<Ressource>('http://localhost:8060/api/v1/download/MostDownloadedResource')
      .subscribe(
        (resource) => {
          console.log('Most downloaded resource:', resource);
          this.mostDownloadedResource = resource;
        },
        (error) => {
          console.error('Error loading most downloaded resource:', error);
        }
      );
  }

loadResourceDetails(resourceId: number): void {
  this.http.get<Ressource >(`http://localhost:8060/api/v1/ressource/getRessourceByid/${resourceId}`)
    .subscribe(
      (resource) => { 
        console.log('Most downloaded resource:', resource);
        this.mostDownloadedResource = resource;
      },
      (error) => {
        console.error('Error loading resource details:', error);
      }
    );
}

}
