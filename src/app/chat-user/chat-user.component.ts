import { Component, ElementRef, Input, NgZone, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../message.service';
import {Observable, forkJoin} from 'rxjs';
import { Message } from '../model/message';
import { NgForm } from '@angular/forms';
import { ChatserviceService } from '../chatservice.service';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.css']
})
export class ChatUserComponent {



  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  nome:string
  nomeTo:string
  listMessages:any=[]
  imgTo:string
  img:string
  @Input() msg:string
  container:HTMLElement
  
  constructor(
    private route:ActivatedRoute, 
    private service:MessageService,
    private chatservice:ChatserviceService
  
    ){}

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.nome = params['nome']
      this.nomeTo = params['nome2']
    });
    this.loadMessages();
    this.scrollToBottom();
    this.chatservice.getNewMessage().subscribe((msg:Message)=>{
      this.listMessages.push(msg)
      
    }) 
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  // ngAfterViewInit(){
  //   this.container = document.getElementById("msgChat");           
  //   this.container.scrollTop = this.container.scrollHeight;
  // }
  
  loadMessages(){
    forkJoin({
      requestOne:this.service.getMensagens(this.nome,this.nomeTo),
      resquestTwo: this.service.getMensagens(this.nomeTo,this.nome)
    }).subscribe(({requestOne,resquestTwo})=>{
      this.listMessages = this.listMessages.concat(requestOne);
      this.listMessages = this.listMessages.concat(resquestTwo);
      // console.log(this.listMessages)
      this.listMessages.sort((a,b)=>a.id-b.id)
      // console.log(this.listMessages)
      this.listMessages.forEach(element => {
        if(element.to === this.nomeTo){
          this.imgTo = element.img
        }
        if(element.from === this.nomeTo){
          this.imgTo = element.imgFrom
        }if(element.to === this.nome){
          this.img = element.img
        }
        if(element.from === this.nome){
          this.img = element.imgFrom
        }
      });

    
    })
    
  }

  sendMessage(){
    if(this.msg!=''){
      let newMsg = new Message(this.nomeTo,this.nome,this.msg,this.imgTo,this.img)
      // console.log(newMsg)
      // console.log(JSON.stringify(newMsg))
      this.chatservice.sendMessage(newMsg)
      this.service.postMessage(newMsg).subscribe((res) =>{
        console.log("Mensagem Enviada");
      })
      this.msg = ''
    }
    
  }

  private sortFunction(a, b) {
    if (a[0].id === b[0].id) {
        return 0;
    }
    else {
        return (a[0].id < b[0].id) ? -1 : 1;
    }
}
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }
}


