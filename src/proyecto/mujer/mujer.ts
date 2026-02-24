import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgOptimizedImage, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mujer',
  standalone: true,
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './mujer.html',
  styleUrls: ['./mujer.css'],
})
export class MujerComponent {

  categorias: string[] = ['Pantalones', 'Camisetas', 'Zapatillas','vehiculo','Bicicleta'];

  categoriaSeleccionada: string = 'todas';

  productos = [
    {
      id: 13,
      price: 30,
      nombre: "Zapatillas Running Hombre",
      descripcion: "Amortiguación avanzada y máxima comodidad.",
      imagen: "assets/ZapatillasRunningKIPRUN.jpg",
      categoria: "Zapatillas"
    }
  ];

  productosFiltrados = [...this.productos];

  filtrarProductos() {
    if (this.categoriaSeleccionada === 'todas') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(producto => {
        if (Array.isArray(producto.categoria)) {
          return producto.categoria.includes(this.categoriaSeleccionada);
        } else {
          return producto.categoria === this.categoriaSeleccionada;
        }
      });
    }
  }

}
