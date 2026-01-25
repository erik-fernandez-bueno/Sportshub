import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class LoginComponent {
  mensaje: string = "";

  dadesLogin = {
    nom: '',
    cognom: '',
    password: '',
    adreca: '',
    telefon: ''
  };

  constructor(private router: Router) {}

  iniciarSessio() {

    const dadesGuardades = localStorage.getItem(this.dadesLogin.nom);

    if (dadesGuardades) {
      const usuari = JSON.parse(dadesGuardades);

      if (usuari.password === this.dadesLogin.password) {
        localStorage.setItem('usuariLoguejat', JSON.stringify(usuari));
        this.mensaje = "Login correcte! Benvingut " + usuari.nom;

        setTimeout(() => {
          this.router.navigate(['/perfil']);
        }, 1000);

      } else {
        this.mensaje = "Contrasenya incorrecta.";
      }
    } else {
      this.mensaje = "L'usuari no existeix.";
    }
  }
}
