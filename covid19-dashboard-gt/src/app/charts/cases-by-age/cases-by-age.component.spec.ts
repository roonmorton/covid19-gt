import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByAgeComponent } from './cases-by-age.component';

describe('CasesByAgeComponent', () => {
  let component: CasesByAgeComponent;
  let fixture: ComponentFixture<CasesByAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesByAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
