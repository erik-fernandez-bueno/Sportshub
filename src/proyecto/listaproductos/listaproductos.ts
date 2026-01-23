import { Component } from '@angular/core';

@Component({
  selector: 'app-listaproductos',
  imports: [],
  templateUrl: './listaproductos.html',
  styleUrl: './listaproductos.css',
})
export class Listaproductos {
  products = [
    {
      id: 1,
      name: 'Pantalón vaquero resistente Hombre Simond Vertika',
      price: 44.99,
      image: 'assets/Pantalonvaquerohombre.jpg',
      description: 'Ofrecen un talle alto que te da libertad de movimiento, 3 bolsillos prácticos y una cinta para tu cepillo. Tallaje ligeramente estrecho, recomendamos 1 talla más de la habitual para mayor comodidad.',
      size:  ['38', '40', '42', '44','46','48']
    },
    {
      id: 2,
      name: 'Sudadera Angular',
      price: 40,
      image: 'assets/img/sudadera.jpg',
      description: 'Sudadera con capucha'
    }
  ];
}
