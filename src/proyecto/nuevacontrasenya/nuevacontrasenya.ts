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
  usuari: any = { password: '' };
  mensaje: string = "";

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    const dadesGuardades = localStorage.getItem('usuariLoguejat');
    if (dadesGuardades) {
      const user = JSON.parse(dadesGuardades);
      this.usuari = { ...user };
    }
  }

  guardarCanvis() {
    if (!this.usuari.password || this.usuari.password.length < 4) {
      this.mensaje = "La contrasenya és massa curta.";
      return;
    }

    if (!this.usuari.email) {
      this.mensaje = "Error: No s'ha trobat l'email de l'usuari.";
      return;
    }

    this.authService.updatePerfil(this.usuari).subscribe({
      next: () => {
        localStorage.setItem('usuariLoguejat', JSON.stringify(this.usuari));
        this.mensaje = "Contrasenya actualitzada correctament!";
      },
      error: (err) => {
        console.error("Error del servidor:", err);
        this.mensaje = "Error al guardar: " + (err.error || "Error desconegut");
      }
    });
  }
}
