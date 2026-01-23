import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import  {ProductoComponent} from '../producto/producto'
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-hombre',
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './hombre.html',
  styleUrl: './hombre.css',
  standalone: true,
})
export class HombreComponent {

}
