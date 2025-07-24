import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountservice = inject(AccountService);
  init() {
    const userstring = localStorage.getItem('user');
    if (!userstring) return of(null);
    const user = JSON.parse(userstring);
    this.accountservice.currentuser.set(user);
    return of(null);
  }
}
