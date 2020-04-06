import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { DataChartService } from '../services/data-chart.service';
import { GoogleChartComponent, ChartErrorEvent } from 'angular-google-charts';
import { Chart } from '../models/ChartModel';
import { ReportedCases, ReportedCasesChart } from '../models/ReportedCasesModel';




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

  geoChart: Chart;
  accumulatedCasesPerDay: Chart;
  accumulatedCases: Chart;

  casesByGender: Chart;
  ageCases: Chart;
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
            this.geoChart = new Chart("GeoChart", arr, ['Departamento', 'Total', 'Infectados'], {
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
            this.casesByGender = new Chart('PieChart', arr, [], {
              legend: { position: 'bottom' },
              slices: {
                0: { color: '#76A7FA' },
                1: { color: 'pink' },
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
            this.accumulatedCasesPerDay = new Chart('Line', arr, ['Días', 'Confirmados'], {
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
            let arr = []
              response.forEach(element => {
                arr.push(Object.values(element));
              });
              this.accumulatedCases = new Chart('Line', arr, ['Días', 'Confirmados'], {
                legend: { position: 'none', textStyle: { color: 'blue', fontSize: 16 } },
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
                this.ageCases = new Chart('Bar', response.data,
                  response.bars, {
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

}
