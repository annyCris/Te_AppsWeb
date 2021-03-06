import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing, appRoutingProviders } from "./app.routing"
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { CommonModule } from "@angular/common";


//Importar los modulos
import { UsersModule } from "./Gestion_Usuarios/Componentes/principal/users-module";

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './Gestion_Usuarios/Componentes/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpModule,
    routing,
    UsersModule
  ],
  providers: [
    appRoutingProviders,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
