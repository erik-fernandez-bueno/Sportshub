import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-menu',
  imports: [
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true,
})
export class MenuComponent {

}
