// src/app/app.routes.ts

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../proyecto/home/home';
import { MenuComponent } from '../proyecto/menu/menu';
import { CestaComponent } from '../proyecto/cesta/cesta';
import { LoginComponent } from '../proyecto/login/login';
import { PerfilComponent } from '../proyecto/perfil/perfil';
import { MujerComponent } from '../proyecto/mujer/mujer';
import { HombreComponent } from '../proyecto/hombre/hombre';
import { ProductoComponent } from '../proyecto/producto/producto';
import { RegisterComponent } from '../proyecto/register/register';
import {UnisexComponent} from '../proyecto/unisex/unisex';
import {NenComponent} from '../proyecto/nen/nen';
import {nuevacontrasenyaComponent} from '../proyecto/nuevacontrasenya/nuevacontrasenya';
import {AdminHistorial} from '../proyecto/admin-historial/admin-historial';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'mujer', component: MujerComponent },
  { path: 'hombre', component: HombreComponent },
  { path: 'unisex', component: UnisexComponent },
  { path: 'nen', component: NenComponent },
  { path: 'nuevacontrasenya', component: nuevacontrasenyaComponent },
  { path: 'producto/:id', component: ProductoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'historial', component: AdminHistorial },
  { path: '**', redirectTo: '' }
];

export const AppRoutingModule = RouterModule.forRoot(routes);
