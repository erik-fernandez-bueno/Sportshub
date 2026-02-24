import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nen } from './nen';

describe('Nen', () => {
  let component: Nen;
  let fixture: ComponentFixture<Nen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Nen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Nen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
