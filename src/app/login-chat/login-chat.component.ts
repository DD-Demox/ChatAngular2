import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ChatserviceService } from '../chatservice.service';

@Component({
  selector: 'app-login-chat',
  templateUrl: './login-chat.component.html',
  styleUrls: ['./login-chat.component.css']
})
export class LoginChatComponent {

  constructor(private router:Router,private chat:ChatserviceService){}

  @Input() nome:string

  logar(){
    this.chat.connect(this.nome)
    this.router.navigate(["chat",this.nome])
  }
}
