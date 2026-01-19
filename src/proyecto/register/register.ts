import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    MenuComponent,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {

}
