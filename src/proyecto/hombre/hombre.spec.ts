import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HombreComponent } from './hombre';

describe('Hombre', () => {
  let component: HombreComponent;
  let fixture: ComponentFixture<HombreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HombreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HombreComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
