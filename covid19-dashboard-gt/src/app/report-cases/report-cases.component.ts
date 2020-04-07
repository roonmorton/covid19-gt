import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CaseService } from '../services/case.service';
import { Router } from '@angular/router';


/* export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
 */

export class Case {
  id: string;
  name: string;
  age: number;
  status: string;
  departament_name: string;
  fecha_contagio: string;
  recevory_date: string;
  
}

@Component({
  selector: 'app-report-cases',
  templateUrl: './report-cases.component.html',
  styleUrls: ['./report-cases.component.scss']
})
export class ReportCasesComponent implements OnInit {




  /* displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA; */
  loader: boolean = true;

  displayedColumns: string[] = ['name', 'gender', 'status', 'department_name', 'fecha_contagio', 'recovery_date', 'action'];
  dataSource = new MatTableDataSource<Case>();


  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(
    public router: Router,
    private casesService: CaseService
  ) { 
    localStorage.setItem('caseEditable', null);
  }

  ngOnInit(): void {
    this.casesService.getCases().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            this.dataSource = new MatTableDataSource<Case>(response);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
        }
      }
      this.loader = false;

    }, err => {
      this.loader = false;
    });
  }

  gotoEditCase(frmCase: Case) {
    localStorage.setItem('caseEditable', JSON.stringify(frmCase));
    this.router.navigate(['new-case', frmCase.id || '']);
  }

}
