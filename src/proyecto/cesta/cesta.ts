import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-cesta',
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class CestaComponent {

}
