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

  enviat: boolean = false;
  codiUsuari: string = "";
  private codiSecret: string = "1234";

  nouUsuari = {
    nom: '',
    cognom: '',
    password: '',
    email: '',
    adreca: '',
    telefon: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  solicitarVerificacio() {
    if (!this.nouUsuari.email) {
      this.mensaje = "Escriu un email primer per verificar-lo.";
      return;
    }
    this.enviat = true;
    this.mensaje = "S'ha activat el camp de verificació.";
  }

  registrar() {
    if (!this.nouUsuari.nom || !this.nouUsuari.password || !this.nouUsuari.email) {
      this.mensaje = 'El nom, correu i la contrasenya són obligatoris';
      return;
    }

    if (this.codiUsuari !== this.codiSecret) {
      this.mensaje = "El codi de verificació és incorrecte!";
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
