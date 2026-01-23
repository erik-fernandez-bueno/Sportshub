import { Injectable } from '@angular/core';

export interface CartProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedSize?: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: CartProduct[] = [];

  getCart() {
    return this.cart;
  }

  addProduct(product: CartProduct) {
    const item = this.cart.find(
      p => p.id === product.id && p.selectedSize === product.selectedSize
    );

    if (item) {
      item.quantity++;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }
  }

  removeProduct(product: CartProduct) {
    this.cart = this.cart.filter(
      p => !(p.id === product.id && p.selectedSize === product.selectedSize)
    );
  }

  clearCart() {
    this.cart = [];
  }
}
