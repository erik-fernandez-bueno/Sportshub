import { Component } from '@angular/core';
import {MenuComponent} from "../menu/menu";
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-mujer',
    imports: [
      MenuComponent,
      RouterLink
    ],
  templateUrl: './mujer.html',
  styleUrl: './mujer.css',
  standalone: true,
})
export class MujerComponent {

}
