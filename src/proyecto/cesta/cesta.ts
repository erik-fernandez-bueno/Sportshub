import { Component, OnInit } from '@angular/core';
import { CartService, CartProduct } from '../services/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,          // 👈 OBLIGATORIO
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css'],
  imports: [
    CommonModule,            // 👈 ngFor / ngIf
    DecimalPipe
  ]
})
export class CestaComponent implements OnInit {

  cart: CartProduct[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(item: CartProduct) {
    this.cartService.removeProduct(item);
    this.cart = this.cartService.getCart();
  }

  getTotal() {
    return this.cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  buy() {
    alert('Compra realizada correctamente');
    this.cartService.clearCart();
    this.cart = [];
  }
}
