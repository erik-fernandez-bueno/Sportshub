import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Unisex } from './unisex';

describe('Unisex', () => {
  let component: Unisex;
  let fixture: ComponentFixture<Unisex>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Unisex]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Unisex);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
