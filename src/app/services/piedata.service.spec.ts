import { TestBed } from '@angular/core/testing';

import { PiedataService } from './piedata.service';

describe('PiedataService', () => {
  let service: PiedataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiedataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
