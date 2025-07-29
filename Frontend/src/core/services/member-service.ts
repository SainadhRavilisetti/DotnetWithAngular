import { HttpClient, HttpHeaders } from '@angular/common/http';
import {inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { profile } from '../../types/profile';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private accountService=inject(AccountService);
  private http=inject(HttpClient);
  private baseUrl=environment.apiUrl;
  getMembers(){
    return this.http.get<profile[]>(this.baseUrl+'Profile',this.getHttpOptions());
  }
  getMemberById(id:string){
    return this.http.get<profile>(this.baseUrl+'Profile/'+id,this.getHttpOptions());
  }
  private getHttpOptions(){
    return {
       headers:new HttpHeaders({
        Authorization:'Bearer ' + this.accountService.currentuser()?.token
       })
    }
  }

}
