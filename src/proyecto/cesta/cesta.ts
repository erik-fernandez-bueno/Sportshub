import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-cesta',
  imports: [
    MenuComponent,
    NgOptimizedImage
  ],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class CestaComponent {

}
