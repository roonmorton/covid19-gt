import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryOfCasesComponent } from './summary-of-cases.component';

describe('SummaryOfCasesComponent', () => {
  let component: SummaryOfCasesComponent;
  let fixture: ComponentFixture<SummaryOfCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryOfCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryOfCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
