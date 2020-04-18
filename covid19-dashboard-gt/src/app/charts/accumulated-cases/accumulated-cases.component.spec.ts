import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedCasesComponent } from './accumulated-cases.component';

describe('AccumulatedCasesComponent', () => {
  let component: AccumulatedCasesComponent;
  let fixture: ComponentFixture<AccumulatedCasesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccumulatedCasesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
