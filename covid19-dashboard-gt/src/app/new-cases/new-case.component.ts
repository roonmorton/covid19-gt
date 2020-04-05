import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CaseService } from '../services/case.service';
import { DepartamentService } from '../services/departament.service';
import { Departament } from '../models/Departament';
import { GenderService } from '../services/gender.service';
import { Gender } from '../models/Gender';
import { StatusService } from '../services/status.service';
import { Status } from '../models/Status';
import { Case } from '../report-cases/report-cases.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-new-case',
  templateUrl: './new-case.component.html',
  styleUrls: ['./new-case.component.scss']
})
export class NewCaseComponent implements OnInit {

  public loader: number = 0;
  public departaments: Array<Departament> = new Array<Departament>();
  public genders: Array<Gender> = new Array<Gender>();
  public status: Array<Status> = new Array<Status>();




  caseForm = new FormGroup({
    idCase: new FormControl(''),
    names: new FormControl(''),
    lastname: new FormControl(''),
    age: new FormControl(''),
    gender: new FormControl(''),
    status: new FormControl(''),
    state: new FormControl('',
      Validators.required), // Departamento
    address: new FormControl(''),
    description: new FormControl(''),
    contagionDate: new FormControl(''),
    recoveryDate: new FormControl('')
  });

  private routeSub: Subscription;
  private idCase: string;
  constructor(
    private casesService: CaseService,
    private departamentService: DepartamentService,
    private genderService: GenderService,
    private statusService: StatusService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {

    this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id'])
      this.idCase = params['id'];
    });

  }

  ngOnInit(): void {
    if (this.idCase) {
      this.casesService.getCase(this.idCase).subscribe(response => {
        if (typeof response === 'object') {
          if (response.status === '200') {
            console.log(response);
          }
        } else
          this.loader = -1;
      },
        err => {
          this.loader = -1;
        });
    }


    this.departamentService.getDepartament().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            this.departaments = response;
            this.loader++;
          } else
            this.loader = -1;
        } else
          this.loader = -1;
      } else
        this.loader = -1;
    },
      err => {
        this.loader = -1;
      });

    this.genderService.getGender().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            this.genders = response;
            this.loader++;
          } else
            this.loader = -1;
        } else
          this.loader = -1;
      } else
        this.loader = -1;
    },
      err => {
        this.loader = -1;
      });

    this.statusService.getStatus().subscribe(response => {
      if (response != null) {
        if (response instanceof Array) {
          if (response.length > 0) {
            this.status = response;
            this.loader++;
          } else
            this.loader = -1;
        } else
          this.loader = -1;
      } else
        this.loader = -1;
    },
      err => {
        this.loader = -1;
      });
  }


  saveCase(frmCase: Case) {

    this.loader = 4;
    this.casesService.saveCase(frmCase).subscribe(response => {
      if (response != null) {
        if (typeof response === 'object') {
          if (response.status === '200') {
            this.caseForm.patchValue(
              {
                idCase: '',
                names: '',
                lastname: '',
                age: '',
                gender: '',
                status: '',
                state: '',
                address: '',
                description: '',
                contagionDate: '',
                recoveryDate: ''
              }
            );
            this.loader = 5;
            this.showMessage("Caso guardado correctamente");
          } else {
            this.loader = 5;
            this.showMessage("Ocurrio un error, intentarlo mas tarde");
          }
        } else {
          this.loader = 5;
          this.showMessage("Ocurrio un error, intentarlo mas tarde");
        }
      } else {
        this.loader = 5;
        this.showMessage("Ocurrio un error, intentarlo mas tarde");
      }
    },
      err => {
        this.loader = 5;
        this.showMessage("Ocurrio un error, intentarlo mas tarde");
      });
  }

  showMessage(message: string, action?: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
    });
  }

}
