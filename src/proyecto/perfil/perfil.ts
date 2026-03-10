import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import {EmailService} from '../services/email';
import {sendEmailVerification} from '@angular/fire/auth';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class PerfilComponent implements OnInit {
  usuari: any = null;
  editant: boolean = false;
  mensaje: string = "";

  constructor(private router: Router, private authService: AuthService, private emailService: EmailService) {}

  ngOnInit() {
    const dades = localStorage.getItem('usuariLoguejat');
    if (dades) {
      this.usuari = JSON.parse(dades);
    } else {
      this.router.navigate(['/login']);
    }
  }
  restablir(){
    const data = {
      email: this.usuari.email,
      subject: 'Restablir contrasenya',
      message: "http://localhost:4200/nuevacontrasenya"
    };
    this.emailService.sendEmail(data).subscribe()

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

  tancarSessio() {
    localStorage.removeItem('usuariLoguejat');
    this.router.navigate(['/login']);
  }
}
