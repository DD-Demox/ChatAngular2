import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { Message } from './model/message';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {

  constructor() {}

  public message:Observable<Message>

  socket = io('http://localhost:4500');

  public sendMessage(message:Message){
    this.socket.emit('message',message)
  }
  
  public getNewMessage() {
    let observable = new Observable<Message>(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }
}
