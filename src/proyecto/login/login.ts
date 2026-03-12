import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class LoginComponent {
  mensaje: string = "";
  dadesLogin = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  iniciarSessio() {
    this.authService.login(this.dadesLogin).subscribe({
      next: (usuari) => {
        localStorage.setItem('usuariLoguejat', JSON.stringify(usuari));
        this.mensaje = "Login correcte! Benvingut ";
        this.authService.actualitzarUsuari(usuari);
        setTimeout(() => this.router.navigate(['/perfil']), 500);
      },
      error: (err) => {
        this.mensaje = "Error: " + (err.status === 401 ? "Credencials incorrectes" : "Servidor desconnectat");
      }
    });
  }
}
