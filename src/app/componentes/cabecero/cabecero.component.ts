import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfiguracionServicio } from 'src/app/servicios/configuracion.service';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-cabecero',
  templateUrl: './cabecero.component.html',
  styleUrls: ['./cabecero.component.css']
})
export class CabeceroComponent implements OnInit {

  isLoggedIn:boolean;
  loggedInUser:string;

  mostrarRegistro:boolean;
  permitirRegistro:boolean;

  constructor(private loginService:LoginService,
              private router:Router,
              private configuracionServicio:ConfiguracionServicio) { }

  ngOnInit(): void {
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        if (auth.email!=null){
           this.loggedInUser=auth.email;
        }
        else{
          this.isLoggedIn=false;
        }
        

      }
    })
    
    //asignar  el valor que tengamos en la base de datos a la variable
    //permitir el link de registro o no
    this.configuracionServicio.getConfiguracion().subscribe
    (configuracion=>{
      if (configuracion?.permitirRegistro!=undefined)
      this.permitirRegistro=configuracion?.permitirRegistro;
    });
  }

  logOut(){
    this.loginService.logiOut()
    //this.isLoggedIn=false;
    this.isLoggedIn=false;
    this.router.navigate(['login'])

  }

}
