import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginChatComponent } from './login-chat/login-chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { ChatUserComponent } from './chat-user/chat-user.component';

const routes: Routes = [
  { 
    path: '', component: LoginChatComponent,
  },
  { 
    path: 'chat/:nome', component: ChatListComponent,
  },
  {
    path:'chat/:nome/:nome2', component:ChatUserComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
