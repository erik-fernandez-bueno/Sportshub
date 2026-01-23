import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../services/cart.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  standalone: true,            // 👈 OBLIGATORIO
  templateUrl: './producto.html',
  styleUrls: ['./producto.css'],
  imports: [
    CommonModule,              // 👈 ngIf / ngFor
    FormsModule
  ]
})
export class ProductoComponent implements OnInit {

  product: any;
  selectedSize: string | null = null;


  products = [
    {
      id: 1,
      name: 'Pantalón vaquero resistente Hombre Simond Vertika',
      description: 'Ofrecen un talle alto que te da libertad de movimiento, 3 bolsillos prácticos y una cinta para tu cepillo.',
      price: 44.99,
      image: 'assets/Pantalonvaquerohombre.jpg',
      size: ['38', '40', '42', '44', '46', '48']
    },
    {
      id: 2,
      name: 'Bicicleta',
      price: 1200,
      image: 'assets/Bicicletademontanya29.jpg',
      description: 'Tienen dos ruedas.',
      size:  []
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.products.find(p => p.id === id);

    console.log('PRODUCT:', this.product);
  }

  addToCart() {
    if (this.product?.size?.length && !this.selectedSize) {
      alert('Selecciona una talla');
      this.cartService.addProduct({
        ...this.product,
        quantity: 1,
        selectedSize: this.selectedSize
      });

      this.router.navigate(['/cesta']);
      return;
    }

    this.cartService.addProduct({
      ...this.product,
      quantity: 1,
      selectedSize: this.selectedSize
    });
  }
}
