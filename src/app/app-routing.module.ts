import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracionComponent } from './componentes/configuracion/configuracion.component';
import { EditarClientesComponent } from './componentes/editar-clientes/editar-clientes.component';
import { LoginComponent } from './componentes/login/login.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { TableroComponent } from './componentes/tablero/tablero.component';
import { AuthGuard } from './guardianes/auth.guard';
import { ConfiguracionGuard } from './guardianes/configuaracion.guard';

const routes: Routes = [
  {path:'', component: TableroComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent},
  {path:'registrarse', component:RegistroComponent, canActivate:[ConfiguracionGuard]},
  {path:'configuracion', component:ConfiguracionComponent,canActivate:[AuthGuard]},
  {path:'cliente/editar/:id', component:EditarClientesComponent,canActivate:[AuthGuard]},
  {path:'**', component:NoEncontradoComponent}
  
];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
