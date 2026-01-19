import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-producto',
  imports: [
    MenuComponent,
    NgOptimizedImage
  ],
  templateUrl: './producto.html',
  styleUrl: './producto.css',
})
export class ProductoComponent {

}
