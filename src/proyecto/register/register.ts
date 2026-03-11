import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { EmailService } from '../services/email';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  mensaje: string = '';
  enviat: boolean = false;
  codiUsuari: string = '';
  private codiSecret: string = '1234';

  nouUsuari = {
    nom: '',
    cognom: '',
    password: '',
    email: '',
    adreca: '',
    telefon: '',
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private emailService: EmailService
  ) {}

  solicitarVerificacio() {
    if (!this.nouUsuari.email) {
      this.mensaje = 'Escriu un email primer per verificar-lo.';
      return;
    }
    this.setcodi();
    const data = {
      email: this.nouUsuari.email,
      subject: 'Verificació Sportshub',
      message: this.codiSecret,
    };
    this.enviat = true;
    this.mensaje = 'nosortir';
    this.emailService.sendEmail(data).subscribe();
  }

  setcodi() {
    this.codiSecret = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
  }

  restablir() {
    if (!this.nouUsuari.email) {
      this.mensaje =
        'Si us plau, introdueix el teu correu per restablir la contrasenya.';
      return;
    }

    this.authService.checkEmailExists(this.nouUsuari.email).subscribe({
      next: (existeix: boolean) => {
        if (!existeix) {
          this.mensaje = "Error: aquest correu no està registrat.";
          return;
        }
        const data = {
          email: this.nouUsuari.email,
          subject: 'Restablir contrasenya',
          message: '',
        };
        this.emailService.sendEmail(data).subscribe({
          next: () => {
            this.mensaje = "S'ha enviat un enllaç al teu correu.";
          },
          error: () => {
            this.mensaje = 'Error en enviar el correu.';
          },
        });
      },
      error: () => {
        this.mensaje = 'Error al comprovar el correu. Torna-ho a intentar.';
      },
    });
  }

  registrar() {
    if (
      !this.nouUsuari.nom ||
      !this.nouUsuari.password ||
      !this.nouUsuari.email
    ) {
      this.mensaje = 'El nom, correu i la contrasenya són obligatoris';
      return;
    }

    if (this.codiUsuari !== this.codiSecret) {
      this.mensaje = 'El codi de verificació és incorrecte!';
      return;
    }

    this.authService.checkEmailExists(this.nouUsuari.email).subscribe({
      next: (existeix: boolean) => {
        if (existeix) {
          this.mensaje =
            "Error: aquest correu ja està registrat. Prova d'iniciar sessió.";
          return;
        }
        this.authService.register(this.nouUsuari).subscribe({
          next: () => {
            this.mensaje = 'Usuari registrat correctament a Firebase!';
            localStorage.setItem(
              'usuariLoguejat',
              JSON.stringify(this.nouUsuari)
            );
            setTimeout(() => this.router.navigate(['/login']), 1500);
          },
          error: (err) => {
            this.mensaje =
              'Error: ' + (err.error || 'No es pot connectar al servidor');
          },
        });
      },
      error: () => {
        this.mensaje = 'Error al comprovar el correu. Torna-ho a intentar.';
      },
    });
  }
}
