import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Configuracion } from "../modelo/configuracion.model";

@Injectable()
export class ConfiguracionServicio{
    //importamos la clase con el modelo que acabamos de crear
    configuracionDoc:AngularFirestoreDocument<Configuracion>;
    
    //creamos una variable tipo Observable 
    configuracion:Observable<Configuracion |undefined>  ;


    //el unico ID posible de la coleccion es 1, la de
    //definimos en la base de datos tipo string
    id='1';

    constructor(private db:AngularFirestore){}

    //Obtener el valor de la coleccion que queremos recuperar
    //el valor de permitir registro.

    getConfiguracion():Observable<Configuracion|undefined>{
        //recuperamos el documento por medio del objeto db.doc, accedemos y
        //pasamos el parametro
        this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
        //recuperamos el objeto configuracion
        this.configuracion=this.configuracionDoc.valueChanges();   
        return this.configuracion;       
    }

    getConfiguracion2(){
        
        this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
        //recuperamos el objeto configuracion
        this.configuracion=this.configuracionDoc.valueChanges();   
        return this.configuracion; 
        
    }

    modificarConfiguracion(configuracion:Configuracion){
        this.configuracionDoc=this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }

}