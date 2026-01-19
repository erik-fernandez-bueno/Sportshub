import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';

@Component({
  selector: 'app-login',
  imports: [
    MenuComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class LoginComponent {

}
