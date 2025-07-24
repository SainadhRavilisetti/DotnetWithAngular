import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { login, register, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = 'https://localhost:5002/api/';
  currentuser = signal<User | null>(null);
  register(creds: register) {
    return this.http.post<User>(this.baseUrl + 'Account/register', creds).pipe(
      tap((user) => {
        if (user) {
          this.setcurrentuser(user);
        }
      })
    );
  }
  login(creds: login) {
    return this.http.post<User>(this.baseUrl + 'Account/login', creds).pipe(
      tap((user) => {
        if (user) {
          this.setcurrentuser(user);
        }
      })
    );
  }
  setcurrentuser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.currentuser.set(user);
  }
  logout() {
    localStorage.removeItem('user');
    this.currentuser.set(null);
  }
}
