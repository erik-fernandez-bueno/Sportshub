import { Component, OnInit } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  standalone: true,
})
export class MenuComponent implements OnInit {
  usuariLoguejat: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    this.comprovarSessio();
  }

  comprovarSessio() {
    const dades = localStorage.getItem('usuariLoguejat');
    if (dades) {
      this.usuariLoguejat = JSON.parse(dades);
    }
  }
}
