import { TestBed } from '@angular/core/testing';

import { Productes } from './productes';

describe('Productes', () => {
  let service: Productes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Productes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
