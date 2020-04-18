import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CasesByLocationComponent } from './cases-by-location.component';

describe('CasesByLocationComponent', () => {
  let component: CasesByLocationComponent;
  let fixture: ComponentFixture<CasesByLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CasesByLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CasesByLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
