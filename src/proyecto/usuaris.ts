// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Usuaris {

  guardarUsuari(nom: string, pass: string) {
    const usuari = { nom: nom, password: pass };
    localStorage.setItem(nom, JSON.stringify(usuari));
  }

  obtenirUsuari(nom: string) {
    const dades = localStorage.getItem(nom);
    return dades ? JSON.parse(dades) : null;
  }
}
