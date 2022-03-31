import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from "@angular/fire/compat/firestore";
import {  Observable, observable } from "rxjs";
import { map } from "rxjs/operators";
import { Cliente } from "../modelo/cliente.model";

@Injectable()

export class ClienteServicio{
    //Utilizar un tipo en concreto cuando estamos recuperando la colección
    clientesColeccion:AngularFirestoreCollection<Cliente>;
    clienteDoc:AngularFirestoreDocument<Cliente>;
    clientes: Observable<Cliente[]>;
    // esta parte es necesario para especificar que el null es posible
    cliente: Observable<Cliente | null >;

    constructor(private db:AngularFirestore){
        this.clientesColeccion = db.collection('clientes', ref=>ref.orderBy('nombre','asc'))
    }
    //nos regresa un observable que es un arreglo de tipo clientes
    getClientes():Observable<Cliente[]>{
        //Metodo obtener clientes
        //snapshot me devuelve la colección
        this.clientes=this.clientesColeccion.snapshotChanges().pipe(
            map(cambios=>{ 
                //aqui recuperamos cada uno de los elementos de la coleccion
                return cambios.map(accion => {
                    //la accionque contiene los atributos del elemento, es decir el payload
                    const datos=accion.payload.doc.data() as Cliente;
                    datos.id =accion.payload.doc.id;
                    return datos;
                })
            })
        );
        //retornamos el observable que contiene cada uno de nuestros elementos
        return this.clientes;
    }

    agregarCliente(cliente:Cliente){
        this.clientesColeccion.add(cliente)
    }

    //recuperamos el cliente desde la base de datos
    getCliente(id:string){
        //indicamos que vamos a recibir un objeto tiepo cliente
        //recuperamos el documento con el id que estamos proporcionando
        this.clienteDoc=this.db.doc<Cliente>('clientes/'+id);
        
        //Ya tenemos el objeto tipo doc, ahora recuperamos el cliente tipo observable
        //con pipe recuperamos, el map recibe una acción y podemos preguntar
        //si tenemos accion en este elemento con payload y exists.
        this.cliente=this.clienteDoc.snapshotChanges().pipe(
            map(accion=>{
                if(accion.payload.exists===false){
                    return null;
                }
                else{
                    const datos=accion.payload.data() as Cliente;
                    datos.id=accion.payload.id;
                    //retornamos el obserable y lo definimos en la variable
                    //this.cliente
                    return datos;
                }
              }
            )
        );
        //retornamos un observable
        return this.cliente;
    }

    modificarCliente(cliente:Cliente){
        //por medio de cliente doc inicializamos la variable con el id que estamos recibiendo
        this.clienteDoc=this.db.doc(`clientes/${cliente.id}`);
        //actualizamos por medio de update
        this.clienteDoc.update(cliente);
    }

    eliminarCliente(cliente:Cliente){
        this.clienteDoc=this.db.doc(`clientes/${cliente.id}`);
        this.clienteDoc.delete();

    }
}