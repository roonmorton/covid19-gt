import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedCasesPerDayComponent } from './accumulated-cases-per-day.component';

describe('AccumulatedCasesPerDayComponent', () => {
  let component: AccumulatedCasesPerDayComponent;
  let fixture: ComponentFixture<AccumulatedCasesPerDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccumulatedCasesPerDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedCasesPerDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
