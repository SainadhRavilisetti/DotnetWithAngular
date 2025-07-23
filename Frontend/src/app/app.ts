import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../layout/nav/nav";
import { AccountService } from '../core/services/account-service';
import { Home } from "../features/home/home";
import { User } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private accountService=inject(AccountService);
  private http=inject(HttpClient);
  protected  title = 'Welcome:)';
  protected  profile=signal<User[]>([]);

  async ngOnInit(){
     this.profile.set(await this.GetUsers());
     this.SetCurrentUser();
  }

  SetCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString) {return};
    const user =JSON.parse(userString);
    this.accountService.currentuser.set(user);
  }

  async GetUsers(){
    try{
      return lastValueFrom(this.http.get<User>('https://localhost:5002/api/Profile'));
    }
    catch(error){
      console.log(error);
      throw error;
    }
  }
}
