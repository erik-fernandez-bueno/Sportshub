import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {EmailService} from '../services/email';
import {PuzzleCaptchaComponent} from './puzzle-captcha.component';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, PuzzleCaptchaComponent],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilComponent implements OnInit {
  usuari: any = null;
  editant: boolean = false;
  mensaje: string = "";
  reviewText: string = "";
  mostrarReview: boolean = false;
  captchaVerificat: boolean = false;

  constructor(private router: Router, private authService: AuthService, private emailService: EmailService,
              private cgf: ChangeDetectorRef) {}

  ngOnInit() {
    const dades = localStorage.getItem('usuariLoguejat');
    if (dades) {
      this.usuari = JSON.parse(dades);
    } else {
      this.router.navigate(['/login']);
    }
  }

  onCaptchaVerified(result: boolean) {
    this.captchaVerificat = result;
    this.cgf.detectChanges();
  }

  restablir(){
    if (!this.usuari.email) {
      this.mensaje = "Escriu un email per restablir la contrasenya.";
      return;
    }
    this.authService.checkEmailExists(this.usuari.email).subscribe({
      next: (existeix: boolean) => {
        if (!existeix) {
          this.mensaje = "Error: aquest correu no està registrat.";
          return;
        }
        const data = {
          email: this.usuari.email,
          subject: 'Restablir contrasenya',
          message: ""
        };
        this.emailService.sendEmail(data).subscribe()
      },
      error: () => {
        this.mensaje = "Error al comprovar el correu. Torna-ho a intentar.";
      }
    });
  }

  guardarCanvis() {
    this.authService.updatePerfil(this.usuari).subscribe({
      next: () => {
        localStorage.setItem('usuariLoguejat', JSON.stringify(this.usuari));
        this.editant = false;
        this.mensaje = "Perfil actualitzat correctament!";
        this.cgf.detectChanges();
      },
      error: () => this.mensaje = "Error al guardar les dades."
    });
  }

  tancarSessio() {
    localStorage.removeItem('usuariLoguejat');
    this.authService.actualitzarUsuari(null);
    window.location.href = '/login';
  }

  enviarReview() {
    if (!this.reviewText.trim()) {
      this.mensaje = "Escriu alguna cosa a la review.";
      return;
    }

    if (!this.captchaVerificat) {
      this.mensaje = "Si us plau, completa el puzle per verificar que no ets un bot.";
      return;
    }

    this.authService.enviarReview(this.usuari.email, this.reviewText).subscribe({
      next: () => {
        this.mensaje = "Review enviada correctament!";
        this.reviewText = "";
        this.mostrarReview = false;
        this.captchaVerificat = false;
        this.cgf.detectChanges();
      },
      error: () => {
        this.mensaje = "Error al enviar la review.";
      }
    });
  }
}
