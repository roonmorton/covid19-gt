import { Component, OnInit } from '@angular/core';
import { DataChartService } from 'src/app/services/data-chart.service';
import { ChartJS } from 'src/app/home/home.component';
import * as Chart from 'chart.js'
import 'chartjs-plugin-labels';

@Component({
  selector: 'summary-of-cases',
  templateUrl: './summary-of-cases.component.html',
  styleUrls: ['./summary-of-cases.component.scss']
})
export class SummaryOfCasesComponent implements OnInit {

  loading:number = 0;
  data: {
    totalcases:number,
    recovered: number,
    deceased: number
  } = {
    totalcases: 0,
    recovered: 0,
    deceased: 0
  }
  constructor(
    private dataChartsService: DataChartService
  ) { }

  ngOnInit(): void {
    this.dataChartsService.getReportCases().subscribe(response => {
      if (response != null) {
        if (response instanceof Object) {
         // console.log(response);
          this.data = response;
          /* new ChartJS({
            canvas: 'chartSummaryCases',
            type: 'bar',
            data: {
              datasets: 
              [
                {
                    label: "Actual",
                    backgroundColor: 'rgba(0, 0, 255, 0.5)',
                    borderWidth: 1,
                    data: [40, 150, 50, 60, 70],
                    xAxisID: "bar-x-axis1",
                    stack: "background"
                },
                {
                    label: "Target",
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    borderWidth: 1,
                    data: [100, 100, 100, 100, 100],
                    xAxisID: "bar-x-axis2"
                }
            ],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            
            labels: ["x1", "x2", "x3", "x4", "x5"],

            },
            options: {
              responsive: true,
              display: true,
              responsiveAnimationDuration: 100,
               maintainAspectRatio: false,
               scales: {
                xAxes: [
                    {
                        id: "bar-x-axis2",
                        stacked: true,
                        categoryPercentage: 0.5,
                        barPercentage: 0.5
                    },
                    {
                        display: true,
                        stacked: true,
                        id: "bar-x-axis1",
                        type: 'category',
                        categoryPercentage: 0.4,
                        barPercentage: 1,
                        gridLines: {
                            offsetGridLines: true
                        }
                    }
                ],

                yAxes: [{
                    id: "bar-y-axis1",
                    stacked: false,
                    ticks: {
                        beginAtZero: true
                    }
                }]

            }
            }
          }); */
          this.loading = 1;
        } else
          this.loading = 2;
      } else
        this.loading = 2;


    }, err => {
      this.loading = 2;
    });
  }

}
