import { TestBed } from '@angular/core/testing';

import { DataChartService } from './data-chart.service';

describe('DataChartsService', () => {
  let service: DataChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
