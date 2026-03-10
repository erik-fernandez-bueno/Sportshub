import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nuevacontrasenya } from './nuevacontrasenya';

describe('Nuevacontrasenya', () => {
  let component: Nuevacontrasenya;
  let fixture: ComponentFixture<Nuevacontrasenya>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nuevacontrasenya]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nuevacontrasenya);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
