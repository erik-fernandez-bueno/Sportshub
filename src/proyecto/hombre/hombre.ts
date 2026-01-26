import { Component } from '@angular/core';
import {MenuComponent} from '../menu/menu';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';
import  {ProductoComponent} from '../producto/producto'
import {FormsModule} from '@angular/forms';
import {HomeComponent} from '../home/home';
import {ProyectoModule} from '../../proyecto-module';

@Component({
  selector: 'app-hombre',
  imports: [
    MenuComponent,
    NgOptimizedImage,
    RouterLink,
    FormsModule
  ],
  templateUrl: './hombre.html',
  styleUrl: './hombre.css',
  standalone: true,
})
export class HombreComponent {

  protected HomeComponent = HomeComponent;
  protected readonly ProyectoModule = ProyectoModule;
}
