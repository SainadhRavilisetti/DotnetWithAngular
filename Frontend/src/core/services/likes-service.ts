import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { profile } from '../../types/profile';
import { PaginationResult } from '../../types/pagination';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private baseUrl=environment.apiUrl;
  private http=inject(HttpClient);
  likeIds=signal<string[]>([]);
  toggleLike(targetMemberId:string){
    return this.http.post(`${this.baseUrl}likes/${targetMemberId}`,{})
  }
  getLikes(predicate:string,pageNumber:number,pageSize:number){
    let params=new HttpParams();
    params=params.append('pageNumber',pageNumber);
    params=params.append('pageNumber',pageSize);
    params=params.append('predicate',predicate);
    return this.http.get<PaginationResult<profile>>(this.baseUrl+'likes',{params});
  }
  getLikeIds(){
    return this.http.get<string[]>(this.baseUrl+'likes/list').subscribe({
      next:ids=>this.likeIds.set(ids)
    })
  }
  clearLikesIds(){
    this.likeIds.set([]);
  }
}
