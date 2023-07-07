import { TestBed } from '@angular/core/testing';

import { TvseriesService } from './tvseries.service';

describe('TvseriesService', () => {
  let service: TvseriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvseriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
