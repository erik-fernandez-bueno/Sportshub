import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [
    CommonModule
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class PerfilComponent implements OnInit{
  usuari: any = null;

  constructor(private router: Router) {}

  ngOnInit() {
    const dades = localStorage.getItem('usuariLoguejat');

    if (dades) {
      this.usuari = JSON.parse(dades);
    } else {
      this.router.navigate(['/login']);
    }
  }

  tancarSessio() {
    localStorage.removeItem('usuariLoguejat');
    this.router.navigate(['/login']);
  }
}
