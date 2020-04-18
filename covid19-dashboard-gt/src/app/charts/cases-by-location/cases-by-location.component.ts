import { Component, OnInit } from '@angular/core';
import { DataChartService } from 'src/app/services/data-chart.service';
import { GoogleChartModel } from 'src/app/models/GoogleChartModel';

@Component({
  selector: 'cases-by-location',
  templateUrl: './cases-by-location.component.html',
  styleUrls: ['./cases-by-location.component.scss']
})
export class CasesByLocationComponent implements OnInit {

  loading: number = 0;
  geoChart: GoogleChartModel;
  constructor(
    private dataChartsService: DataChartService
  ) { }

  ngOnInit(): void {
    this.dataChartsService.getDataGeo().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            let arr = [];
            //console.log(response);
            if (response.length > 0) {
              response.forEach(element => {
                let total = element.total;
                let total_departaments =element.total_departaments;
                delete element.total;
                delete element.total_departaments;
                element.total_departaments = total_departaments;
                element.total = total;
                arr.push(Object.values(element));
              });
            }
            //console.log(arr);
            this.geoChart = new GoogleChartModel("GeoChart", arr, ['Departamento', 'Infectados', 'Total'], {
              /* sizeAxis: { minValue: 10, maxValue: 100 }, */
              region: 'GT',
              resolution: 'provinces',
             /*  displayMode: 'text', */
              enableRegionInteractivity: true,
              /* colorAxis: {colors: ['#e7711c', '#4374e0']}, */
              colorAxis: {minValue: 0, maxValue:153, colors: ['e8b584', '#e6ab0f',
              '#f4a386', '#ea460c']}
            })
            this.loading = 1;
          } else
            this.loading = 2;

        }
        else
          this.loading = 2;

      } else
        this.loading = 2;

    }, err => {
      this.loading = 2;

    });
  }

}
