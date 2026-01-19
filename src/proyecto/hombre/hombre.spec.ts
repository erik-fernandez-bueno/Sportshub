import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hombre } from './hombre';

describe('Hombre', () => {
  let component: Hombre;
  let fixture: ComponentFixture<Hombre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hombre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Hombre);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
