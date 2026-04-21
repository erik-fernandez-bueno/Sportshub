import { Component, OnInit } from '@angular/core';
import { CartService, CartProduct } from '../services/cart.service';
import { CommonModule, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  constructor(private cartService: CartService, private http: HttpClient) {}

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
    const usuari = JSON.parse(localStorage.getItem('usuariLoguejat') || '{}');
    const email = usuari?.email;

    if (!email) {
      alert('Has d\'iniciar sessió per poder comprar');
      return;
    }

    this.http.post('http://localhost:3000/api/comprar', {
      email,
      cart: this.cart
    }).subscribe({
      next: () => {
        alert('Compra realitzada correctament');
        this.cartService.clearCart();
        window.location.href = '/';
      },
      error: (err) => {
        console.error('Error al comprar:', err);
        alert('Hi ha hagut un error en processar la compra');
      }
    });
  }

  increaseQuantity(item: CartProduct) {
    this.cartService.updateQuantity(item, item.quantity + 1);
  }

  decreaseQuantity(item: CartProduct) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item, item.quantity - 1);
    }
  }

  setQuantity(item: CartProduct, value: string) {
    const quantity = parseInt(value);
    this.cartService.updateQuantity(item, quantity > 0 ? quantity : 1);
  }
}
