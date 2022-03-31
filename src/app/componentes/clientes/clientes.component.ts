import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'flash-messages-angular';
import { Cliente } from 'src/app/modelo/cliente.model';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { NgForm } from '@angular/forms';

@Component({

  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  

  clientes:Cliente[];
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  
  // Definir un atributo, accedemos a la referencia local por medio
  // del nombre, ese nombre lo definimos al inicio del formulario
  //ClienteForm y botonCerrar son referencias locales creadas en el html
  @ViewChild("clienteForm") clienteForm:NgForm;
  @ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private flashMessages:FlashMessagesService,
              private clientesServicio:ClienteServicio) { }

  ngOnInit(): void {
    //Solicitamos el metodo getClientes esto nos regresa la colleción
    // de clientes, tenemos que subscribirnos
    this.clientesServicio.getClientes().subscribe(
      clientes =>{
        this.clientes=clientes;
      }
    )
  }

  getSaldoTotal(){
    let saldoTotal: number=0;
    
    if(this.clientes){
      this.clientes.forEach(cli=>{
        saldoTotal+=cli.saldo;
      }
      )
    }
    return saldoTotal;
  }


  agregar3(){

  }
  agregar({value, valid}:NgForm){
  //agregar(){
    

    console.log("el nombre es.... " +this.cliente.nombre)
    if(!valid){
      /*
      if(this.cliente.nombre=='' ||
      this.cliente.apellido=='' ||
      this.cliente.email==''||
      this.cliente.saldo==0
       ){
  
        this.flashMessages.show('Por favor llena el formulario correctamente',{
          cssClass:'alert-danger', timeout:4000
        });
      } 
      else{
        //
      }*/
      this.flashMessages.show('Por favor llena el formulario correctamente',{
        cssClass:'alert-danger', timeout:4000
      });
      
    }else{
      this.clientesServicio.agregarCliente(value);
      // de este modo borramos el formulario 
      this.clienteForm.resetForm();
      this.cerrarModal();
    }
  } 

  private cerrarModal(){
    this.botonCerrar.nativeElement.click();
  }
  
}
