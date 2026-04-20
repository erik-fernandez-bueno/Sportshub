import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductesService } from '../services/productes';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-hombre',
  standalone: true,
  imports: [MenuComponent, RouterLink, FormsModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './hombre.html',
  styleUrls: ['./hombre.css'],
})
export class HombreComponent implements OnInit {

  categorias: string[] = ['Pantalones', 'Camisetas', 'Zapatillas', 'vehiculo', 'Bicicleta'];
  categoriaSeleccionada: string = 'todas';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private productesService: ProductesService,  private cgf: ChangeDetectorRef) {}

  ngOnInit() {
    this.productesService.getProductesByGenere('home').subscribe({
      next: (data) => {
        this.productos = data;
        this.productosFiltrados = [...data];
        console.log('Productes carregats:', this.productosFiltrados);
        this.cgf.detectChanges();
      },
      error: (err) => console.error('Error carregant productes:', err)
    });

  }


  filtrarProductos() {
    if (this.categoriaSeleccionada === 'todas') {
      this.productosFiltrados = [...this.productos];
    } else {
      this.productosFiltrados = this.productos.filter(producto => {
        const cat = producto.category;
        if (Array.isArray(cat)) {
          return cat.includes(this.categoriaSeleccionada);
        }
        return cat === this.categoriaSeleccionada;
      });
    }
  }
}
