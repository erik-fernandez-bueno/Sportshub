import {ChangeDetectorRef, Component} from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgOptimizedImage, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {ProductesService} from '../services/productes';

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

  categorias: string[] = ['Pantalones', 'Camisetas', 'Zapatillas', 'vehiculo', 'Bicicleta'];
  categoriaSeleccionada: string = 'todas';
  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(private productesService: ProductesService,  private cgf: ChangeDetectorRef) {}

  ngOnInit() {
    this.productesService.getProductesByGenere('dona').subscribe({
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
