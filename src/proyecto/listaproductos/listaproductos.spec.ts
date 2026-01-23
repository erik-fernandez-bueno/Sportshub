import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Listaproductos } from './listaproductos';

describe('Listaproductos', () => {
  let component: Listaproductos;
  let fixture: ComponentFixture<Listaproductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Listaproductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Listaproductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
