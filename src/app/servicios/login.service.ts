import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { map } from "rxjs";

@Injectable()
export class LoginService{

    constructor(public authService: AngularFireAuth){}

    
    login(email:string, password:string){
        return new Promise((resolve, reject)=>{
            this.authService.signInWithEmailAndPassword(email,password).then
            (datos=>resolve(datos),
            error=>reject(error))
        })        
    }

    registrarse(email:string, password:string){
        return new Promise((resolve, reject)=>{
            this.authService.createUserWithEmailAndPassword(email,password).then
            (datos=>resolve(datos),
            error=>reject(error))
        })        
    }
    


    //llamamos servicio de autenticacion y nos regresa el usuario que se ha 
    //pipe y map para poder acceder al objeto
    getAuth(){
        return this.authService.authState.pipe(
            map(auth=>auth)
        )
    }

    logiOut(){
        
        console.log("voy a entrar");
        
        /*
        new Promise((resolve, reject)=>{
            this.authService.signInWithEmailAndPassword('','').then
            (datos=>resolve(datos),
            error=>reject(error))
        })*/

        //voy a sali
        console.log("voy a salir");
        this.authService.signOut();
        console.log("ya sali");
        
    }

    
}