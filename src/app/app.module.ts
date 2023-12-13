import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatUserComponent } from './chat-user/chat-user.component';
import { LoginChatComponent } from './login-chat/login-chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from './message.service';
import { ChatserviceService } from './chatservice.service';

@NgModule({
  declarations: [
    AppComponent,
    ChatListComponent,
    ChatUserComponent,
    LoginChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [MessageService,ChatserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
