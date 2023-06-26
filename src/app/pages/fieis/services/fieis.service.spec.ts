import { TestBed } from '@angular/core/testing';

import { FieisService } from './fieis.service';

describe('FieisService', () => {
  let service: FieisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FieisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
