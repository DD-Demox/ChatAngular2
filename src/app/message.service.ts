import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message } from './model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient) { }
  baseurl = 'http://localhost:3000';

  httpOptions = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getContatos(from):Observable<Message>{
    return this.http.get<Message>(this.baseurl + '/messages/?from='+from)
  }

  getMensagens(from,to):Observable<Message>{
    return this.http.get<Message>(this.baseurl+'/messages/?from='+from+'&to='+to)
  }
  
  postMessage(message):Observable<Message>{
    return this.http.post<Message>(this.baseurl + '/messages/', JSON.stringify(message),this.httpOptions)
      
  }

}
