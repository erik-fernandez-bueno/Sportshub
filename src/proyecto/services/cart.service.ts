import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  usuari: any = null;
  private cart: CartProduct[] = [];
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {
    const dades = localStorage.getItem('usuariLoguejat');
    this.usuari = dades ? JSON.parse(dades) : null;

    if (this.usuari) {
      if (!this.usuari.cesta) {
        this.usuari.cesta = [];
      }
      this.cart = this.usuari.cesta;

      if (this.usuari.email) {
        this.loadCartFromFirebase();
      }
    }
  }

  private loadCartFromFirebase() {
    this.http.get<CartProduct[]>(`${this.apiUrl}/cesta/${this.usuari.email}`)
      .subscribe({
        next: (cesta) => {
          this.cart = cesta;
          this.usuari.cesta = cesta;
          localStorage.setItem('usuariLoguejat', JSON.stringify(this.usuari));
        },
        error: (err) => console.error('Error carregant cesta des de Firebase:', err)
      });
  }

  private persistCart() {
    if (this.usuari) {
      this.usuari.cesta = this.cart;
      localStorage.setItem('usuariLoguejat', JSON.stringify(this.usuari));

      if (this.usuari.email) {
        this.http.put(`${this.apiUrl}/cesta/${this.usuari.email}`, { cesta: this.cart })
          .subscribe({
            error: (err) => console.error('Error guardant cesta a Firebase:', err)
          });
      }
    }
  }

  getCart() {
    return this.cart;
  }

  addProduct(product: any) {
    const normalizedProduct: CartProduct = {
      id: product.id ?? product.id_productes,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedSize: product.selectedSize ?? null
    };

    const item = this.cart.find(
      p => p.id === normalizedProduct.id && p.selectedSize === normalizedProduct.selectedSize
    );

    if (item) {
      item.quantity++;
    } else {
      this.cart.push(normalizedProduct);
    }

    this.persistCart();
  }

  removeProduct(product: CartProduct) {
    this.cart = this.cart.filter(
      p => !(p.id === product.id && p.selectedSize === product.selectedSize)
    );

    this.persistCart();
  }

  updateQuantity(product: CartProduct, quantity: number) {
    const item = this.cart.find(
      p => p.id === product.id && p.selectedSize === product.selectedSize
    );

    if (item) {
      item.quantity = quantity > 0 ? quantity : 1;
      this.persistCart();
    }
  }

  clearCart() {
    this.cart = [];
    this.persistCart();
  }
}
