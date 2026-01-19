import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';

@Component({
  selector: 'app-perfil',
  imports: [
    MenuComponent
  ],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
  standalone: true,
})
export class PerfilComponent {

}
