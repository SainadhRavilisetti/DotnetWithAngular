import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
private http=inject(HttpClient);
baseUrl="https://localhost:5002/api/";
currentuser=signal<User |null>(null);
login(creds:any){
  return this.http.post<User>(this.baseUrl+'Account/login',creds).pipe(
    tap(user=>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user))
        this.currentuser.set(user)
      }
    })
  )
}
logout(){
  localStorage.removeItem('user')
  this.currentuser.set(null);
}
}
