import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from '../proyecto/menu/menu';
import { EmailService } from '../proyecto/services/email';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('Sportshub');

  constructor(private emailService: EmailService) {}

  sendEmail(mesaje:string) {
    const data = {
      email: 'destino@gmail.com',
      subject: 'Hola desde Sportshub',
      message: mesaje
    };

    this.emailService.sendEmail(data).subscribe({
      next: res => console.log('Correo enviado correctamente', res),
      error: err => console.error('Error enviando correo', err)
    });
  }
}
