import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DataChartService } from '../services/data-chart.service';
import { GoogleChartComponent, ChartErrorEvent } from 'angular-google-charts';
import { MyChart } from '../models/ChartModel';
import { ReportedCases, ReportedCasesChart } from '../models/ReportedCasesModel';


import * as Chart from 'chart.js'


class DataLoadStatus {
  /*
  0: loading:
  1: Success
  2: End loading and Error
  */
  geoChart: number;
  reportedCases: number;
  accumulatedCasesPerDay: number;
  accumulatedCases: number;
  casesByGender: number;
  ageCases: number;


  constructor() {
    this.geoChart = 0;
    this.reportedCases = 0;
    this.accumulatedCasesPerDay = 0;
    this.accumulatedCases = 0;
    this.casesByGender = 0;
    this.ageCases = 0;

  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  /*  @ViewChild('chartLin') chart: GoogleChartComponent;
   @HostListener('window:resize', ['$event'])
   onWindowResize(event: any) {
     /* let selection = this.chart.wrapper.visualization.getSelection(); 
 
     /* this.chart.redraw();
     this.chart.wrapper.visualization.setSelection(selection); 
   } */

  dataLoadingStatus: DataLoadStatus;
  reportedCases: ReportedCases;
  reportedCasesChart: ReportedCasesChart;

  geoChart: MyChart;
  accumulatedCasesPerDay: MyChart;
  accumulatedCases: MyChart;

  casesByGender: MyChart;
  ageCases: MyChart;
  date: string;


  piChart = {
    type: 'PieChart',
    data: [
      ['', 20],
      ['', 80]
    ],
    options: {
      legend: 'none',
      pieSliceText: 'none',/* 
      pieStartAngle: 135, */
      tooltip: { trigger: 'none' },
      slices: {
        0: { color: 'green' },
        1: { color: '#65d3c3' }
      }
    }
  };

  constructor(private dataChartsService: DataChartService) {

  }

  getDate() {
    let date = new Date();
    let hours = date.getHours() % 12;
    hours = hours ? hours : 12;

    let monthDay = date.toLocaleString('es-MX', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' ');
    let weekDay = date.toLocaleString('es-MX', { weekday: 'long' }).replace('.', '');
    this.date = weekDay + ' ' + monthDay + ' ' + date.getFullYear();

    //segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString()

    /* this.vr = {
      hora: this.hours,
      minutos: (t.getMinutes() < 10) ? '0' + t.getMinutes() : t.getMinutes().toString(),
      ampm: t.getHours() > 11 ? 'PM' : 'AM',
      diaymes: t.toLocaleString('es-MX', { day: '2-digit', month: 'long' }).replace('.', '').replace('-', ' '),
      diadesemana: t.toLocaleString('es-MX', { weekday: 'long' }).replace('.', ''),
      segundo: t.getSeconds() < 10 ? '0' + t.getSeconds() : t.getSeconds().toString() */

  }

  loadResumenCases() {
    let response = {
      totalcases: 25,
      deceased: 1,
      recovered: 5,
      activeCases: 0
    }

    this.reportedCasesChart = new ReportedCasesChart(response);


  }

  ngOnInit(): void {
    this.getDate();
    //this.loadResumenCases();
    this.dataLoadingStatus = new DataLoadStatus();

    this.dataChartsService.getDataGeo().subscribe(response => {

      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            let arr = []
            if (response.length > 0) {
              response.forEach(element => {
                arr.push(Object.values(element));
              });
            }
            this.geoChart = new MyChart("GeoChart", arr, ['Departamento', 'Total', 'Infectados'], {
              region: 'GT',
              displayMode: 'markers',
              colorAxis: { colors: ['red', 'orange'] },
              enableRegionInteractivity: true,
            })
            this.dataLoadingStatus.geoChart = 1;
          } else
            this.dataLoadingStatus.geoChart = 2;

        }
        else
          this.dataLoadingStatus.geoChart = 2;

      } else
        this.dataLoadingStatus.geoChart = 2;

    }, err => {
      this.dataLoadingStatus.geoChart = 2;

    });

    this.dataChartsService.getReportCases().subscribe(response => {
      /* this.reportedCasesChart = new ReportedCasesChart();
      this.reportedCasesChart.totalcases.value = response.totalcases;
      this.reportedCasesChart.deceased.value = response.deceased;
      this.reportedCasesChart.recovered.value = response.recovered; */
      if (response != null) {
        if (response instanceof Object) {
          this.reportedCasesChart = new ReportedCasesChart(response);
          this.dataLoadingStatus.reportedCases = 1;
        } else
          this.dataLoadingStatus.reportedCases = 2;
      } else
        this.dataLoadingStatus.reportedCases = 2;


    }, err => {
      this.dataLoadingStatus.reportedCases = 2;
    });


    this.dataChartsService.getCasesByGender().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            let arr = []
            if (response.length > 0) {
              response.forEach(element => {
                arr.push(Object.values(element));
              });
            }
            this.casesByGender = new MyChart('PieChart', arr, [], {
              legend: { position: 'bottom' },
              slices: {
                0: { color: 'pink' },
                1: { color: '#76A7FA' },
                3: { color: 'gray' }
              }
            });
            this.dataLoadingStatus.casesByGender = 1;
          } else
            this.dataLoadingStatus.casesByGender = 2;

        } else
          this.dataLoadingStatus.casesByGender = 2;

      } else
        this.dataLoadingStatus.casesByGender = 2;


    }, err => {
      this.dataLoadingStatus.casesByGender = 2;
    });


    this.dataChartsService.getAccumulatedCasesPerDay().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            let arr = []
            response.forEach(element => {
              arr.push(Object.values(element));
            });
            this.accumulatedCasesPerDay = new MyChart('Line', arr, ['Días', 'Confirmados'], {
              legend: { position: 'none', textStyle: { color: 'blue', fontSize: 16 } },
            });
            this.dataLoadingStatus.accumulatedCasesPerDay = 1;
          } else
            this.dataLoadingStatus.accumulatedCasesPerDay = 2;

        } else
          this.dataLoadingStatus.accumulatedCasesPerDay = 2;


      } else
        this.dataLoadingStatus.accumulatedCasesPerDay = 2;


    }, err => {
      this.dataLoadingStatus.accumulatedCasesPerDay = 2;
    });



    this.dataChartsService.getAccumulatedCases().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {

          if (response.length > 0) {
            console.log(response);
            let arrLevels = [];
            let arrData = [];
            let arr = [];
            response.forEach(item => {
              arrLevels.push(item.dia);
              arrData.push(item.num_casos_acum);
              //item.x = Number(item.dia);
              /* item.y = item.num_casos_acum;
              delete item.dia;
              delete item.num_casos_acum;
              return item; */
              let ele = Object.values(item);
              ele.push(ele[1].toString());
              arr.push(ele);
            });
            /* console.log(response);
            //console.log(arr);
            response.forEach(element => {
              let ele = Object.values(element);
              ele.push(ele[1].toString());
              arr.push(ele);
            }); */
            this.accumulatedCases = new MyChart('AreaChart', arr, ['Días', 'Confirmados'], {
              legend: { position: 'none', textStyle: { color: 'blue', fontSize: 16 } },
            });
            this.canvas = document.getElementById('myChart');
            this.ctx = this.canvas.getContext('2d');
            let myChart = new Chart(this.ctx, {
              type: 'line',
              data: {
                labels: arrLevels,
                datasets: [{
                  label: "Casos acumulados",
                  data: arrData,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Casos'
                    }
                  }],
                  xAxes: [{
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: 'Dias'
                    }
                  }]
                },
                responsive: true,
                display: true,
                responsiveAnimationDuration: 100,
                maintainAspectRatio: false,

                events: false,
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
            this.dataLoadingStatus.accumulatedCases = 1;

          } else
            this.dataLoadingStatus.accumulatedCases = 2;

        } else
          this.dataLoadingStatus.accumulatedCases = 2;


      } else
        this.dataLoadingStatus.accumulatedCases = 2;


    }, err => {
      this.dataLoadingStatus.accumulatedCases = 2;
    });

    this.dataChartsService.getAgeCases().subscribe(response => {
      /* let arr = []
      if (response.length > 0) {
        response.forEach(element => {
          arr.push(Object.values(element));
        });
      } */
      //console.log(response);
      if (response != null) {
        if (response instanceof Object) {
          if (response.data) {
            if (response.data instanceof Array) {
              if (response.data.length > 0) {
                console.log(response);
                this.ageCases = new MyChart('Bar', response.data,
                  ["Edades", "Masculino", "Femenino"], {
                  width: '100%',
                  height: '400px',
                  legend: { position: 'labeled', textStyle: { color: 'blue', fontSize: 16 } },
                  pieSliceText: 'label',
                  colors: response.color,
                  chartArea: {
                    height: '200',
                    width: '100%'
                  }
                });
                this.dataLoadingStatus.ageCases = 1;
              }
              else
                this.dataLoadingStatus.ageCases = 2;
            } else
              this.dataLoadingStatus.ageCases = 2;
          } else
            this.dataLoadingStatus.ageCases = 2;
        } else
          this.dataLoadingStatus.ageCases = 2;
      } else
        this.dataLoadingStatus.ageCases = 2;
    }, err => {
      this.dataLoadingStatus.ageCases = 2;
    });

  }




  title = 'angular8chartjs';
  canvas: any;
  ctx: any;
  ngAfterViewInit() {
    /* this.canvas = document.getElementById('myChart');
    this.ctx = this.canvas.getContext('2d');
    let myChart = new Chart(this.ctx, {
      type: 'line',
      data:{
        datasets: [{
            label: 'Casos acumulados',
            data: [{
                x: -10,
                y: 0
            }, {
                x: 0,
                y: 10
            }, {
                x: 10,
                y: 5
            }]
        }]
    },
      options: {
        responsive: true,
        display: true,
        aspectRatio: 1,
        responsiveAnimationDuration:100,
        maintainAspectRatio: true
      }
    }); *//* new Chart(this.ctx, {
      type: 'pie',
      data: {
          labels: ["New", "In Progress", "On Hold"],
          datasets: [{
              label: '# of Votes',
              data: [1,2,3],
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: true,
        display:true
      }
    }); */


  }

}
