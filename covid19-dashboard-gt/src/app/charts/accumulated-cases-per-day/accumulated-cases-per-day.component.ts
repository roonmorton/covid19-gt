import { Component, OnInit } from '@angular/core';
import { DataChartService } from 'src/app/services/data-chart.service';
import { ChartJS } from 'src/app/helpers/ChartJS';
import * as Chart from 'chart.js'


@Component({
  selector: 'accumulated-cases-per-day',
  templateUrl: './accumulated-cases-per-day.component.html',
  styleUrls: ['./accumulated-cases-per-day.component.scss']
})
export class AccumulatedCasesPerDayComponent implements OnInit {

  loading: number = 0;

  constructor(
    private dataChartsService: DataChartService
  ) { }

  ngOnInit(): void {
    this.dataChartsService.getAccumulatedCasesPerDay().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            //console.log(response);
            let arrLevels = [];
            let arrData = [];
            //let arr = [];
            response.forEach(item => {
              arrLevels.push(item.dia);
              arrData.push(item.num_casos_acum);
              let ele = Object.values(item);
              ele.push(ele[1].toString());
              //arr.push(ele);
            });
            new ChartJS({
              canvas: 'chartAccumulatedCasesPerDay',
              type: 'line',
              data: {
                labels: arrLevels,
                datasets: [{
                  label: "Casos reportados por día",
                  data: arrData,
                  borderColor: 'rgba(67, 80, 220, 0.93)',
                  backgroundColor: 'rgba(145, 149, 199, 0.69)',
                  //lineTension: 0,
                  //fill: false,
                  //borderColor: 'orange',
                  //backgroundColor: 'rgba(20, 51, 224, 0.26)',
                  //borderDash: [5, 5],
                  //pointBorderColor: 'orange',
                  //pointBackgroundColor: 'rgba(255,150,0,0.5)',
                  //pointRadius: 5,
                  //pointHoverRadius: 10,
                  //pointHitRadius: 30,
                  //pointBorderWidth: 2,
                  //pointStyle: 'rectRounded'
                }]
              },
              options: {
                scales: {
                  /* yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Casos'
                    }
                  }], */
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Fechas'
                    }
                  }]
                },
                responsive: true,
                display: true,
                responsiveAnimationDuration: 100,
                maintainAspectRatio: false,
                events: true,
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
                }
                /*                 animation: {
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
            /*  */
            /* let arr = []
            response.forEach(element => {
              arr.push(Object.values(element));
            });
            this.accumulatedCasesPerDay = new MyChart('Line', arr, ['Días', 'Confirmados'], {
              legend: { position: 'none', textStyle: { color: 'blue', fontSize: 16 } },
            }); */
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
