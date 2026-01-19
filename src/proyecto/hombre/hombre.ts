import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-hombre',
  imports: [
    MenuComponent,
    NgOptimizedImage
  ],
  templateUrl: './hombre.html',
  styleUrl: './hombre.css',
  standalone: true,
})
export class HombreComponent {

}
