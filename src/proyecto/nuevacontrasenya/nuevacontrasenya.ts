import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nuevacontrasenya',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevacontrasenya.html',
  styleUrl: './nuevacontrasenya.css',
})
export class nuevacontrasenyaComponent implements OnInit {
  usuari: any = null;
  editant: boolean = false;
  mensaje: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {

  }

  guardarCanvis() {
    this.authService.updatePerfil(this.usuari).subscribe({
      next: () => {
        localStorage.setItem('usuariLoguejat', JSON.stringify(this.usuari));
        this.editant = false;
        this.mensaje = "Perfil actualitzat correctament!";
      },
      error: () => this.mensaje = "Error al guardar les dades."
    });
  }
}
