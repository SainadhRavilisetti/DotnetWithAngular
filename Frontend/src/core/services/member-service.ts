import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Photos, profile } from '../../types/profile';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class MemberService {

  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode=signal(false);
  getMembers() {
    return this.http.get<profile[]>(this.baseUrl + 'Profile');
  }
  getMemberById(id: string) {
    return this.http.get<profile>(this.baseUrl + 'Profile/' + id);
  }
  getMembersPhotos(id: string) {
    return this.http.get<Photos[]>(this.baseUrl + 'Profile/' + id + '/photos');
  }
}
