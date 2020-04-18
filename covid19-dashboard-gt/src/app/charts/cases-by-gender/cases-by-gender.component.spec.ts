import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByGenderComponent } from './cases-by-gender.component';

describe('CasesByGenderComponent', () => {
  let component: CasesByGenderComponent;
  let fixture: ComponentFixture<CasesByGenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesByGenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByGenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
