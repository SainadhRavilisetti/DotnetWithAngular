import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { EditableMember, Photos, profile } from '../../types/profile';
import { AccountService } from './account-service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode=signal(true);
  member=signal<profile | null>(null);
  getMembers() {
    return this.http.get<profile[]>(this.baseUrl + 'Profile');
  }
  getMemberById(id: string) {
    return this.http.get<profile>(this.baseUrl + 'Profile/' + id).pipe(
      tap(member=>{
        this.member.set(member)
      })
    )
  }
  getMembersPhotos(id: string) {
    return this.http.get<Photos[]>(this.baseUrl + 'Profile/' + id + '/photos');
  }
  updatemembers(member:EditableMember){
    return this.http.put(this.baseUrl+'Profile',member);
  }
  uploadPhoto(file:File){
    const fromData=new FormData();
    fromData.append('file',file);
    return this.http.post<Photos>(this.baseUrl+'Profile/add-photo',fromData);
  }
}
