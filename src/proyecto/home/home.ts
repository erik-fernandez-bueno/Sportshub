import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true,
})
export class HomeComponent {

}
