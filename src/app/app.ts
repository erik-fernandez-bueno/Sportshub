import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from '../proyecto/home/home';
import {MenuComponent} from '../proyecto/menu/menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sportshub');
}
