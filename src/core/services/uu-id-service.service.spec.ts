import { TestBed } from '@angular/core/testing';

import { UuIdServiceService } from './uu-id-service.service';

describe('UuIdServiceService', () => {
  let service: UuIdServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UuIdServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
