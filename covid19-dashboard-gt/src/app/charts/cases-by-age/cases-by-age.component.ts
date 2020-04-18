import { Component, OnInit } from '@angular/core';
import { DataChartService } from 'src/app/services/data-chart.service';
import * as Chart from 'chart.js'
import 'chartjs-plugin-labels';
import { ChartJS } from 'src/app/home/home.component';

@Component({
  selector: 'cases-by-age',
  templateUrl: './cases-by-age.component.html',
  styleUrls: ['./cases-by-age.component.scss']
})
export class CasesByAgeComponent implements OnInit {

  loading: number = 0;
  constructor(
    private dataChartsService: DataChartService
  ) { }

  ngOnInit(): void {
    this.dataChartsService.getCasesByAge().subscribe(response => {
      /* let arr = []
      if (response.length > 0) {
        response.forEach(element => {
          arr.push(Object.values(element));
        });
      } */
      if (response != null) {
        if (response instanceof Array) {
          let labels: Array<any> = new Array<any>();
          let data: Array<any> = new Array<any>();;
          response.forEach((element, idx) => {
            let color = element.color;
            delete element.color;
            let gender = element.gender;
            delete element.gender;
            labels = labels.length == 0 ? Object.keys(element) : labels;
            data.push({
              label: gender,
              backgroundColor: color,
              data: Object.values(element),
              orden: idx
            });
          });
          new ChartJS({
            canvas: 'chartAgeCases',
            type: 'bar',
            data: {
              datasets: data,
              labels: labels
            },
            options: {
              scales: {
              /*   yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Casos'
                  }
                }], */
                xAxes: [{
                  display: true,
                  scaleLabel: {
                    display: true,
                    labelString: 'Edades'
                  }
                }]
              },
              responsive: true,
              display: true,
              responsiveAnimationDuration: 100,
              maintainAspectRatio: false,
              plugins: {
                labels: {
                  render: 'value',
                  /* fontColor: 'white',
                  fontSize: 14,
                  fontStyle: 'bold',
                  position: 'outside' */
                }
              }
              /* events: false,
              tooltips: {
                enabled: true
              },
              hover: {
                animationDuration: 0
              },
              animation: {
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
    }, err => {
      this.loading = 2;
    });
  }

}
