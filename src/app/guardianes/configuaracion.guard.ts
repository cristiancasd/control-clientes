import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable,map } from "rxjs";
import { ConfiguracionServicio } from "../servicios/configuracion.service";

@Injectable()
export class ConfiguracionGuard implements CanActivate{
    constructor(
        private router:Router,
        private afAuth:AngularFireAuth,
        private configuracionServicio:ConfiguracionServicio
    ){}

    canActivate():Observable<boolean|undefined>{
       return this.configuracionServicio.getConfiguracion().pipe(
            map((configuracion:any)=>{
                if(configuracion.permitirRegistro){
                    return true;
                }else{                    
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        )
    }
}