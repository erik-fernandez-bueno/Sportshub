import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Usuaris } from '../usuaris';


@Component({
  selector: 'app-register',
  imports: [
    RouterLink,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  mensaje: string = "";

  nouUsuari = {
    nom: '',
    cognom: '',
    password: '',
    adreca: '',
    telefon: ''
  };

  constructor(private usuaris: Usuaris) {}

  registrar() {
    if (!this.nouUsuari.nom || !this.nouUsuari.password) {
      this.mensaje = 'El nom i la contrasenya són obligatoris';
      return;
    }

    const usuariExistent = localStorage.getItem(this.nouUsuari.nom);

    if (usuariExistent) {
      this.mensaje = 'Aquest usuari ja existeix!';
    } else {
      localStorage.setItem(this.nouUsuari.nom, JSON.stringify(this.nouUsuari));
      this.mensaje = 'Usuari registrat correctament!';

      this.nouUsuari = { nom: '', cognom: '', password: '', adreca: '', telefon: '' };
    }
  }
}
