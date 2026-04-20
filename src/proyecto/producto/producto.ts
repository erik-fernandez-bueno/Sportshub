import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartService } from '../services/cart.service';
import { ProductesService } from '../services/productes';

@Component({
  selector: 'app-producto',
  standalone: true,
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
  imports: [CommonModule, FormsModule]
})
export class ProductoComponent implements OnInit {

  product: any;
  selectedSize: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private productesService: ProductesService,
    private cgf: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    console.log('ID URL:', id);

    this.productesService.getProducteById(id).subscribe({
      next: (data) => {
        this.product = data;
        console.log('PRODUCTO:', this.product);
        this.cgf.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });

  }

  addToCart() {

    if (!this.product) return;

    if (this.product?.size?.length && !this.selectedSize) {
      alert('Selecciona una talla');
      return;
    }

    this.cartService.addProduct({
      ...this.product,
      quantity: 1,
      selectedSize: this.selectedSize
    });
  }
}
