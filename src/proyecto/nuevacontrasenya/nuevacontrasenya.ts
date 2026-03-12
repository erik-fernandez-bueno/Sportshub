import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  passwordConfirm: string = '';
  mensaje: string = '';
  mensajeSuccess: boolean = false;
  passwordMismatch: boolean = false;
  showPassword1: boolean = false;
  showPassword2: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const dadesGuardades = localStorage.getItem('usuariLoguejat');
    if (dadesGuardades) {
      const user = JSON.parse(dadesGuardades);
      this.usuari = { ...user };
    }

    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.usuari = { ...this.usuari, email: params['email'], password: '' };
        console.log("Email llegit de la URL:", params['email']);
      }
    });
  }

  contrasenyes_coincideixen(): boolean {
    return this.usuari.password === this.passwordConfirm;
  }

  contrasenya_valida(): boolean {
    return this.usuari.password && this.usuari.password.length >= 4;
  }

  validar(): boolean {
    this.passwordMismatch = false;
    this.mensaje = '';
    this.mensajeSuccess = false;

    if (!this.contrasenya_valida()) {
      this.mensaje = "La contrasenya és massa curta.";
      return false;
    }

    if (!this.contrasenyes_coincideixen()) {
      this.passwordMismatch = true;
      this.mensaje = "Les contrasenyes no coincideixen.";
      return false;
    }

    if (!this.usuari.email) {
      this.mensaje = "Error: No s'ha trobat l'email de l'usuari.";
      return false;
    }

    return true;
  }

  guardarCanvis() {
    if (!this.validar()) return;

    const dadesActualitzar = {
      email: this.usuari.email,
      password: this.usuari.password
    };

    console.log("Guardant contrasenya per:", dadesActualitzar.email);

    this.authService.updatePerfil(dadesActualitzar).subscribe({
      next: () => {
        this.mensajeSuccess = true;
        this.mensaje = "Contrasenya actualitzada correctament!";
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        console.error("Error del servidor:", err);
        this.mensaje = "Error al guardar: " + (err.error || "Error desconegut");
      }
    });
  }
}
