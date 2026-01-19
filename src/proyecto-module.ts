import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';

// Importa aquí todos los componentes de tus carpetas
import { MenuComponent } from './proyecto/menu/menu';
import { CestaComponent } from './proyecto/cesta/cesta';
import { HomeComponent } from './proyecto/home/home';
import { LoginComponent } from './proyecto/login/login';
import { PerfilComponent } from './proyecto/perfil/perfil';
import { MujerComponent } from './proyecto/mujer/mujer';
import { HombreComponent } from './proyecto/hombre/hombre';
import { ProductoComponent } from './proyecto/producto/producto';
import { RegisterComponent } from './proyecto/register/register';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  bootstrap: [] // o HomeComponent como inicio
})
export class ProyectoModule { }
