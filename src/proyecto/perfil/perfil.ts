import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-perfil',
  imports: [
    MenuComponent,
    RouterLink
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class PerfilComponent {

}
