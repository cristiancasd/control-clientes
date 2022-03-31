import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from 'src/app/modelo/cliente.model';
import { NgForm } from '@angular/forms';
import { FlashMessagesService } from 'flash-messages-angular';
import { ClienteServicio } from 'src/app/servicios/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-clientes',
  templateUrl: './editar-clientes.component.html',
  styleUrls: ['./editar-clientes.component.css']
})
export class EditarClientesComponent implements OnInit {


 
  cliente:Cliente={
    nombre:'',
    apellido:'',
    email:'',
    saldo:0
  }
  id:string;
  
 
  @ViewChild("clienteForm") clienteForm:NgForm;
  //@ViewChild("botonCerrar") botonCerrar: ElementRef;

  constructor(private flashMessages:FlashMessagesService,
    private clientesServicio:ClienteServicio,
    private router:Router,
    private route:ActivatedRoute) { }


  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    this.clientesServicio.getCliente(this.id).subscribe(cliente=>{
      if (cliente!=null){
        this.cliente=cliente;
      }
      
    });
  }

  eliminar(){
    if(confirm('¿Seguro que quieres eliminar?')){
      this.clientesServicio.eliminarCliente(this.cliente);
      this.router.navigate(['/'])
    }
  
  
  }

  guardar({value, valid}:NgForm){
    if(!valid){
      this.flashMessages.show('Por favor llene el formulario correctamente',{
        cssClass:'alert-danger', timeout:4000
      });
    }
    else{
      value.id=this.id;
      this.clientesServicio.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }


}
