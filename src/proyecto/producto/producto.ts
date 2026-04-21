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

    this.productesService.getProducteById(id).subscribe({
      next: (data) => {
        this.product = data;
        this.cgf.detectChanges();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  get logueado(): boolean {
    return !!localStorage.getItem('usuariLoguejat');
  }

  addToCart() {
    const usuari = JSON.parse(localStorage.getItem('usuariLoguejat') || '{}');
    const email = usuari?.email;

    if (!email) {
      alert('Has d\'iniciar sessió per poder comprar');
      return;
    }
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
