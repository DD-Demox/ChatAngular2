import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-chat',
  templateUrl: './login-chat.component.html',
  styleUrls: ['./login-chat.component.css']
})
export class LoginChatComponent {

  constructor(private router:Router){}

  @Input() nome:string

  logar(){
    this.router.navigate(["chat",this.nome])
  }
}
