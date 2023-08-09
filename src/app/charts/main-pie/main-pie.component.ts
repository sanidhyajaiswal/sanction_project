import { Component, OnInit } from '@angular/core';
import { PiedataService } from 'src/app/services/piedata.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables); 

@Component({
  selector: 'app-main-pie',
  templateUrl: './main-pie.component.html',
  styleUrls: ['./main-pie.component.css']
})
export class MainPieComponent implements OnInit{
  public pieData: any[];
  public agencyList: any[];
  public valList: any[];
  public chart: any;

  constructor(private pieService: PiedataService)
  {
    
  }

  ngOnInit(): void {
    this.pieService.getPieData(). subscribe((data) => {
      this.pieData = data;
      this.agencyList = Array.from(new  Set(this.pieData.map(item=> item.agencyName)));
      console.log(this.agencyList);
      this.valList = Array.from(new  Set(this.pieData.map(i=> i.contractValue)));
      console.log(this.valList);

      this.chart = new Chart("pieChart", {
        type: 'doughnut', //this denotes tha type of chart
  
        data: {// values on X-Axis
          labels: this.agencyList,
           datasets: [{
      label: 'Total Budget Allocated in INR',
      data: this.valList,
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      hoverOffset: 4
    }],
        },
        options: {
          aspectRatio:2.5,
          plugins: {
            title: {
                display: true,
                text: 'Total Budget Share',
                padding: {
                    top: 10,
                    bottom: 30
                }
            }
        }
        }
  
      });
    })

    
  }


}
