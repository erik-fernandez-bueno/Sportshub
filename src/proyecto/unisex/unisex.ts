import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgOptimizedImage, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-unisex',
  standalone: true,
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule,
    NgFor,
    NgIf
  ],
  templateUrl: './unisex.html',
  styleUrls: ['./unisex.css'],
})
export class UnisexComponent {

  categorias: string[] = ['Pantalones', 'Camisetas', 'Zapatillas','vehiculo','Bicicleta'];

  categoriaSeleccionada: string = 'todas';

  productos = [
    {
      id: 1,
      price: 25,
      nombre: "Balón de Fútbol",
      descripcion: "Balón de fútbol profesional con superficie texturada para mejor control.",
      imagen: "assets/balon_futbol.jpg",
      categoria: "Balones"
    },
    {
      id: 2,
      price: 75,
      nombre: "Raqueta de Tenis",
      descripcion: "Raqueta ligera con marco de aluminio y agarre cómodo.",
      imagen: "assets/raqueta_tenis.jpg",
      categoria: "Raquetas"
    },
    {
      id: 3,
      price: 18,
      nombre: "Mancuernas de Neopreno 3kg",
      descripcion: "Set de mancuernas para ejercicio de fuerza y tonificación.",
      imagen: "assets/mancuernas_3kg.jpg",
      categoria: "Fitness"
    },
    {
      id: 4,
      price: 12,
      nombre: "Cuerda para Saltar Ajustable",
      descripcion: "Cuerda ligera con mango ergonómico para entrenamiento cardiovascular.",
      imagen: "assets/cuerda_saltar.jpg",
      categoria: "Accesorios"
    },
    {
      id: 5,
      price: 30,
      nombre: "Esterilla de Yoga",
      descripcion: "Esterilla antideslizante para yoga, pilates y estiramientos.",
      imagen: "assets/esterilla_yoga.jpg",
      categoria: "Fitness"
    },
    {
      id: 6,
      price: 10,
      nombre: "Botella Deportiva 1L",
      descripcion: "Botella de agua resistente para hidratación en entrenos.",
      imagen: "assets/botella_deportiva.jpg",
      categoria: "Accesorios"
    },
    {
      id: 7,
      price: 20,
      nombre: "Bandas Elásticas de Resistencia",
      descripcion: "Juego de bandas con diferentes resistencias para entrenamiento.",
      imagen: "assets/bandas_resistencia.jpg",
      categoria: "Fitness"
    },
    {
      id: 9,
      price: 65,
      nombre: "Portería de Fútbol Plegable",
      descripcion: "Portería ligera y fácil de montar para partidos y entrenos.",
      imagen: "assets/porteria_futbol.jpg",
      categoria: "Equipamiento"
    },
    {
      id: 10,
      price: 120,
      nombre: "Cámara Deportiva 4K",
      descripcion: "Cámara de acción para grabar tus aventuras deportivas.",
      imagen: "assets/camara_4k.jpg",
      categoria: "Tecnología"
    },
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
