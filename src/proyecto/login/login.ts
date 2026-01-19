import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    MenuComponent,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class LoginComponent {

}
