import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import {
  EditableMember,
  memberParams,
  Photos,
  profile,
} from '../../types/profile';
import { AccountService } from './account-service';
import { tap } from 'rxjs';
import { PaginationResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private accountService = inject(AccountService);
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  editMode = signal(false);
  member = signal<profile | null>(null);
  getMembers(memberParams: memberParams) {
    let params = new HttpParams();
    params = params.append('PageNumber', memberParams.pageNumber);
    params = params.append('PagSize', memberParams.pageSize);
    params = params.append('minAge', memberParams.minAge);
    params = params.append('maxAge', memberParams.maxAge);
    if(memberParams.gender){
      params=params.append('gender',memberParams.gender);
    }
    return this.http.get<PaginationResult<profile>>(this.baseUrl + 'Profile', {
      params,
    });
  }
  getMemberById(id: string) {
    return this.http.get<profile>(this.baseUrl + 'Profile/' + id).pipe(
      tap((member) => {
        this.member.set(member);
      })
    );
  }
  getMembersPhotos(id: string) {
    return this.http.get<Photos[]>(this.baseUrl + 'Profile/' + id + '/photos');
  }
  updatemembers(member: EditableMember) {
    return this.http.put(this.baseUrl + 'Profile', member);
  }
  uploadPhoto(file: File) {
    const fromData = new FormData();
    fromData.append('file', file);
    return this.http.post<Photos>(this.baseUrl + 'Profile/add-photo', fromData);
  }
  setMainPage(photo: Photos) {
    return this.http.put(
      this.baseUrl + 'Profile/set-main-photo/' + photo.id,
      {}
    );
  }
  deletePhoto(photoId: number) {
    return this.http.delete(this.baseUrl + 'Profile/delete-photo/' + photoId);
  }
}
