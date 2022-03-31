


import { NgModule } from '@angular/core';
//import { environment } from 'src/environments/environment';
import { environment } from '../environments/environment';

import { AngularFireModule} from '@angular/fire/compat'
//import {AngularFireModule} from '@angular/fire';

import {AngularFirestoreModule, Settings, SETTINGS} from '@angular/fire/compat/firestore';
//import {AngularFirestoreModule} from '@angular/fire/firestore';

import {AngularFireAuthModule} from '@angular/fire/compat/auth';
//import {AngularFireAuthModule} from '@angular/fire/auth';

import { initializeApp } from "firebase/app";

import { FlashMessagesModule } from 'flash-messages-angular';

import{FormsModule} from '@angular/forms'

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceroComponent } from './componentes/cabecero/cabecero.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { ClientesComponent } from './componentes/clientes/clientes.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { PiePaginaComponent } from './componentes/pie-pagina/pie-pagina.component';
import { ClienteServicio } from './servicios/cliente.service';
import { LoginService } from './servicios/login.service';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionServicio } from './servicios/configuracion.service';
import { ConfiguracionGuard } from './guardianes/configuaracion.guard';



@NgModule({
  declarations: [
    AppComponent,
    CabeceroComponent,
    TableroComponent,
    ClientesComponent,
    EditarClientesComponent,
    LoginComponent,
    RegistroComponent,
    ConfiguracionComponent,
    NoEncontradoComponent,
    PiePaginaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFireModule,
    AngularFireAuthModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firestore, 'control-clientes'),
    AngularFireModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot()
    //FlashMessagesModule.forRoot()
    
  ],
  providers: [
    ClienteServicio, 
    LoginService, 
    AuthGuard, 
    ConfiguracionServicio,
    ConfiguracionGuard
  //,{provide:FirestoreSettingsToken, useValue:{}
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
