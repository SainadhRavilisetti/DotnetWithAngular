import { inject, Injectable } from '@angular/core';
import { AccountService } from './account-service';
import { of } from 'rxjs';
import { LikesService } from './likes-service';

@Injectable({
  providedIn: 'root',
})
export class InitService {
  private accountservice = inject(AccountService);
  private likeService=inject(LikesService);
  init() {
    const userstring = localStorage.getItem('user');
    if (!userstring) return of(null);
    const user = JSON.parse(userstring);
    this.accountservice.currentuser.set(user);
    this.likeService.getLikeIds();
    return of(null);
  }
}
