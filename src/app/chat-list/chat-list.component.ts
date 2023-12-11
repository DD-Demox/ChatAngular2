import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent {

  constructor(private msg_service:MessageService, private route:ActivatedRoute,private router:Router){}

  listContacts:any=[]
  nome:string

  ngOnInit(){
    this.route.params.subscribe(params => this.nome = params['nome']);
    console.log(this.nome)
    this.loadContacts()
  }

  loadContacts(){
    var lookup = {};
    var fullList:any=[]



    this.msg_service.getContatos(this.nome).subscribe((data:{})=>{
      fullList = data
      fullList=fullList.reverse()
      for (var item, i = 0; item = fullList[i++];) {
        var name = item.to;
      
        if (!(name in lookup)) {
          lookup[name] = 1;
          this.listContacts.push(item);
        }
      }
    })  
  }

  chatUser(user){
    this.router.navigate(['chat',this.nome,user.to])
  }
  
  
}
