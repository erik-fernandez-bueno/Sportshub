import { TestBed } from '@angular/core/testing';

import { IaVigilantService } from './ia-vigilant.service';

describe('IaVigilantService', () => {
  let service: IaVigilantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IaVigilantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
