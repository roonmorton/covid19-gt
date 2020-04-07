import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CaseService } from '../services/case.service';
import { DepartamentService } from '../services/departament.service';
import { Departament } from '../models/Departament';
import { GenderService } from '../services/gender.service';
import { Gender } from '../models/Gender';
import { StatusService } from '../services/status.service';
import { Status } from '../models/Status';
import { Case } from '../models/Case';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { map, filter } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';


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
    gender: new FormControl('',
      Validators.required),
    status: new FormControl('',
      Validators.required),
    state: new FormControl('',
      Validators.required), // Departamento
    address: new FormControl(''),
    description: new FormControl(''),
    contagionDate: new FormControl('',
    Validators.required),
    recoveryDate: new FormControl(''),
    idPerson: new FormControl('')
  });

  private routeSub: Subscription;
  private caseEdit: Case = new Case();
  private idCase: string;
  constructor(
    private casesService: CaseService,
    private departamentService: DepartamentService,
    private genderService: GenderService,
    private statusService: StatusService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    public router: Router,
  ) {

    this.routeSub = this.route.params.subscribe(params => {
      this.idCase = params['id'];
    });

  }

  ngOnInit(): void {
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
    if (this.idCase) {
      this.casesService.getCase(this.idCase).subscribe(response => {
        //console.log(response);
        if (response != null) {
          if (response instanceof Array) {
            if (response.length == 1) {
              this.caseForm.patchValue(
                {
                  idCase: response[0].id_case,
                  names: response[0].name,
                  lastname: response[0].lastname,
                  age: response[0].age,
                  gender: response[0].id_gender,//id Genero
                  status: response[0].id_estado,
                  state: response[0].id_department,
                  address: response[0].address,
                  description: response[0].description,
                  contagionDate: response[0].contagion_date == 'NO DISPONIBLE' ? '' : response[0].contagion_date,
                  recoveryDate: response[0].recovery_date == 'NO DISPONIBLE' ? '' : response[0].recovery_date,
                  idPerson: response[0].id_person
                });
            }
          }
        } else
          this.loader = -1;
      },
        err => {
          this.loader = -1;
        });
    }




  }


  saveCase(frmCase: Case) {
//console.log(frmCase);
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
            this.router.navigate(['report-cases']);
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
