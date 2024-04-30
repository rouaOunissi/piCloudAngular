import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-all-stat',
  templateUrl: './all-stat.component.html',
  styleUrls: ['./all-stat.component.css']
})
export class AllStatComponent  implements OnInit {

  pieChart: any;
  pieChart2: any;
  highissueList:any;
  mediumissueList:any;
  lowissueList:any;
  nbrHighIssue:number=0;
  nbrMediumIssue:number=0;
  nbrLowIssue:number=0;
  myData : any[] = [];
  myDataStatus : any[] = [];
  openissueList:any;
  closedissueList:any;
  nbrOpenIssue:number=0;
  nbrClosedIssue:number=0;
  constructor(private http:HttpClient){
   
  }
  ngOnInit(): void {

    this.collectIssueData();
    this.collectIssueData2();
  }
  collectIssueData(){
    this.getHighIssue();
  }
  collectIssueData2(){
    this.getOpenIssue();
  
  }
  getOpenIssue(){
    this.http.get(`http://localhost:8040/api/issue/status/OPEN`).subscribe(response=>{
    this.openissueList=response;
    this.nbrOpenIssue=this.openissueList.length;
    this.myDataStatus.push(this.nbrOpenIssue);
    this.getClosedIssue();
  },error=>{
    console.log(error);
  })

  }
  getClosedIssue(){
    this.http.get(`http://localhost:8040/api/issue/status/CLOSE`).subscribe(response=>{
    this.closedissueList=response;
    this.nbrClosedIssue=this.closedissueList.length;
    this.myDataStatus.push(this.nbrClosedIssue);
    this.generatePieChart2(this.myDataStatus);
  },error=>{
    console.log(error);
  })

  }
  
  getHighIssue(){
    this.http.get(`http://localhost:8040/api/issue/priority/HIGH`).subscribe(response=>{
    this.highissueList=response;
    this.nbrHighIssue=this.highissueList.length;
    this.myData.push(this.nbrHighIssue);
    this.getMediumIssue();
  },error=>{
    console.log(error);
  })

  }
  getMediumIssue(){
    this.http.get(`http://localhost:8040/api/issue/priority/MEDIUM`).subscribe(response=>{
      this.mediumissueList=response;
      this.nbrMediumIssue=this.mediumissueList.length;
      this.myData.push(this.nbrMediumIssue);
      this.getLowIssue();

    },error=>{
      console.log(error);
    })
  }
  getLowIssue(){
    this.http.get(`http://localhost:8040/api/issue/priority/LOW`).subscribe(response=>{
      this.lowissueList=response;
      this.nbrLowIssue=this.lowissueList.length;
      this.myData.push(this.nbrLowIssue);
      this.generatePieChart(this.myData);  

    },error=>{
      console.log(error);
    })

  }

  generatePieChart(myData:any): void {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      this.pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['HIGH', 'MEDIUM', 'LOW'],
          datasets: [{
            label: 'Issue Representation  by priority ',

            data: myData,
            backgroundColor: ['red', 'orange', 'yellow']
          }]
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }
  generatePieChart2(myData2:any): void {
    const canvas2 = document.getElementById('pieChart2') as HTMLCanvasElement;
    const ctx = canvas2.getContext('2d');
    if (ctx) {
      this.pieChart2 = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['OPEN', 'CLOSE'],
          datasets: [{
            label: 'Issue Representation  by status ',
            data: myData2,
            backgroundColor: ['yellow', 'green']
          }]
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }

 
}