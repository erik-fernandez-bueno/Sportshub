import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-hombre',
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './hombre.html',
  styleUrl: './hombre.css',
  standalone: true,
})
export class HombreComponent {

}
