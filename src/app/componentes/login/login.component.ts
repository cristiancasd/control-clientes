import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'flash-messages-angular';
import { LoginService } from 'src/app/servicios/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string='';
  password:string='';

  constructor(private router:Router,
              private flashMessages:FlashMessagesService,
              private loginService:LoginService) { }

  ngOnInit(): void {
    //revisamos si el User está logueado y así no aparezca
    this.loginService.getAuth().subscribe(auth=>{
      if(auth){
        this.router.navigate(['/'])
      }
    })
  }

  //cuando el metodo retorna una promesa siempre se unsa .then
  login(){
    this.loginService.login(this.email,this.password)
    .then(res=>{
      this.router.navigate(['/']);
    })
    .catch(error=>{
      this.flashMessages.show(error.messages,{
        cssClass:'alert-danger', timeout:4000
      })
    })
  
  }


}
