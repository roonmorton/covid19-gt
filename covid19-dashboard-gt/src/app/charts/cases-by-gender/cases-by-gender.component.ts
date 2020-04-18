import { Component, OnInit } from '@angular/core';
import { DataChartService } from 'src/app/services/data-chart.service';
import { ChartJS } from 'src/app/home/home.component';

@Component({
  selector: 'cases-by-gender',
  templateUrl: './cases-by-gender.component.html',
  styleUrls: ['./cases-by-gender.component.scss']
})
export class CasesByGenderComponent implements OnInit {
  loading: number = 0;

  constructor(
    private dataChartsService: DataChartService
  ) { }

  ngOnInit(): void {
    this.dataChartsService.getCasesByGender().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            //console.log(response);
            let data: Array<any> = new Array<any>();
            let labels: Array<any> = new Array<any>();
            let colors: Array<any> = new Array<any>();
            //let arr = []
            response.forEach(element => {
              //arr.push(Object.values(element));
              data.push(element.count);
              labels.push(element.gender);
              colors.push(element.color);
            });
            /* this.casesByGender = new MyChart('PieChart', arr, [], {
              legend: { position: 'bottom' },
              slices: {
                0: { color: 'pink' },
                1: { color: '#76A7FA' },
                3: { color: 'gray' }
              }
            }); */

            new ChartJS({
              canvas: 'chartCasesByGender',
              type: 'pie',
              data: {
                datasets: [{
                  data: data,
                  backgroundColor: colors
                }],

                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: labels
              },
              options: {
                plugins: {
                  labels: {
                    render: 'value',
                    /* fontColor: 'white', */
                    fontSize: 14,
                    fontStyle: 'bold',
                    position: 'outside'
                  }
                },
                responsive: true,
                display: true,
                responsiveAnimationDuration: 100,
                maintainAspectRatio: false,
                tooltips: {
                  enabled: true
                },
                hover: {
                  animationDuration: 1
                },
                /* animation: {
                  duration: 0,
                  onComplete: function () {
                    // render the value of the chart above the bar
                    var ctx = this.chart.ctx;
                    ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                    ctx.fillStyle = this.chart.config.options.defaultFontColor;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'bottom';
                    this.data.datasets.forEach(function (dataset) {
                      for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        ctx.fillText(dataset.data[i], model.x, model.y - 5);
                      }
                    });
                  }
                } */
              }
            });
            this.loading = 1;
          } else
            this.loading = 2;

        } else
          this.loading = 2;

      } else
        this.loading = 2;


    }, err => {
      this.loading = 2;
    });
  }

}
