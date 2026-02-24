import { Component, OnInit } from '@angular/core';
import { CartService, CartProduct } from '../services/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  templateUrl: './cesta.html',
  styleUrls: ['./cesta.css'],
  imports: [
    CommonModule,
    DecimalPipe,
    RouterLink
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
  increaseQuantity(item: CartProduct) {
    item.quantity++;
  }

  decreaseQuantity(item: CartProduct) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  setQuantity(item: CartProduct, value: string) {
    const quantity = parseInt(value);
    item.quantity = quantity > 0 ? quantity : 1;
  }

}
