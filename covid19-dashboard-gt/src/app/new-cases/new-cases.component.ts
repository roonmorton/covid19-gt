import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';






@Component({
  selector: 'app-new-cases',
  templateUrl: './new-cases.component.html',
  styleUrls: ['./new-cases.component.scss']
})
export class NewCasesComponent implements OnInit {

  caseForm = new FormGroup({
    names: new FormControl(''),
    lastname: new FormControl(''),
     age: new FormControl(''),
    gender: new FormControl(''),
    state: new FormControl(''), // Departamento
    address: new FormControl(''),
   description: new FormControl(''),
    contagionDate: new FormControl(''),
    recoveryDate: new FormControl('') 
  });
  constructor() { }

  ngOnInit(): void {
  }

}
