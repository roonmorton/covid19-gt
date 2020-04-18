import { Component, OnInit } from '@angular/core';
import { DataChartService } from '../services/data-chart.service';
import { ReportedCases, ReportedCasesChart } from '../models/ReportedCasesModel';



import * as Chart from 'chart.js'
import 'chartjs-plugin-labels';

export class ChartJS {
  canvas: any;
  ctx: any;
  constructor(config: {
    canvas: string,
    title?: string
    type: string,
    data: any,
    options?: any,
    context?: string,
  }) {
    this.canvas = document.getElementById(config.canvas);
    this.ctx = this.canvas.getContext(config.context || '2d');
    let myChart = new Chart(this.ctx, {
      type: config.type,
      data: config.data,
      options: config.options
    });
  }
}

class DataLoadStatus {
  /*
  0: loading:
  1: Success
  2: End loading and Error
  */
  reportedCases: number;


  constructor() {
    this.reportedCases = 0;

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


  date: string;


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

  /* loadResumenCases() {
    let response = {
      totalcases: 25,
      deceased: 1,
      recovered: 5,
      activeCases: 0
    }

    this.reportedCasesChart = new ReportedCasesChart(response);

  } */

  ngOnInit(): void {
    this.getDate();
    //this.loadResumenCases();
    this.dataLoadingStatus = new DataLoadStatus();

   
  }

}
