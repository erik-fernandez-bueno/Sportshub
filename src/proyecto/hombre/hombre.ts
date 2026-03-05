import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgOptimizedImage, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hombre',
  standalone: true,
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './hombre.html',
  styleUrls: ['./hombre.css'],
})
export class HombreComponent {
  selectedCategory: any;

  categorias: string[] = ['Pantalones', 'Camisetas', 'Zapatillas','vehiculo','Bicicleta'];

  categoriaSeleccionada: string = 'todas';

  productos = [
    {
      id: 8,
      price: 35,
      nombre: "Guantes de Boxeo",
      descripcion: "Guantes acolchados para seguridad y confort en boxeo.",
      imagen: "assets/guantes_boxeo.jpg",
      categoria: ["Deportes de contacto"]
    },
    {
      id: 11,
      price: 44.99,
      nombre: "Pantalón vaquero resistente Hombre Simond Vertika",
      descripcion: "Ofrecen un talle alto, 3 bolsillos prácticos y una cinta para tu cepillo.",
      imagen: "assets/Pantalonvaquerohombre.jpg",
      categoria: ["Pantalones"]
    },
    {
      id: 12,
      price: 1200,
      nombre: "Bicicleta",
      descripcion: "Bicicleta de montaña con dos ruedas resistente.",
      imagen: "assets/Bicicletademontanya29.jpg",
      categoria: ["vehiculo" ,"Bicicleta"]
    },
    {
      id: 13,
      price: 30,
      nombre: "Zapatillas Running Hombre",
      descripcion: "Amortiguación avanzada y máxima comodidad.",
      imagen: "assets/ZapatillasRunningKIPRUN.jpg",
      categoria: ["Zapatillas"]
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
