import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class RegisterComponent {
  mensaje: string = "";

  nouUsuari = {
    nom: '',
    cognom: '',
    password: '',
    email: '',
    adreca: '',
    telefon: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    if (!this.nouUsuari.nom || !this.nouUsuari.password || !this.nouUsuari.email) {
      this.mensaje = 'El nom, correu i la contrasenya són obligatoris';
      return;
    }

    this.authService.register(this.nouUsuari).subscribe({
      next: (res) => {
        this.mensaje = 'Usuari registrat correctament a Firebase!';
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.mensaje = 'Error: ' + (err.error || 'No es pot connectar al servidor');
      }
    });
  }
}
