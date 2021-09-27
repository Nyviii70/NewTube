import { TestBed } from '@angular/core/testing';

import { IMBdService } from './imbd.service';

describe('IMBdService', () => {
  let service: IMBdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IMBdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
