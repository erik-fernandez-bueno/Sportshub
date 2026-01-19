import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './proyecto/menu/menu';
import { CestaComponent } from './proyecto/cesta/cesta';
import { HomeComponent } from './proyecto/home/home';
import { LoginComponent } from './proyecto/login/login';
import { PerfilComponent } from './proyecto/perfil/perfil';
import { MujerComponent } from './proyecto/mujer/mujer';
import { HombreComponent } from './proyecto/hombre/hombre';
import { ProductoComponent } from './proyecto/producto/producto';
import { RegisterComponent } from './proyecto/register/register';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cesta', component: CestaComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: 'mujer', component: MujerComponent },
  { path: 'hombre', component: HombreComponent },
  { path: 'producto', component: ProductoComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' } // fallback
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
