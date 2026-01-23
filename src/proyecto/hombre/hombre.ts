import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductoComponent } from '../producto/producto';

@Component({
  selector: 'app-hombre',
  imports: [
    CommonModule,
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './hombre.html',
  styleUrls: ['./hombre.css'],
  standalone: true,
})
export class HombreComponent {
  products: ProductoComponent | undefined;
  selectedCategory = 'todas';

  get filteredProducts() {
    if (this.selectedCategory === 'todas') return this.products;
    return this.products.product((p: { category: string; }) => p.category === this.selectedCategory);
  }
}
