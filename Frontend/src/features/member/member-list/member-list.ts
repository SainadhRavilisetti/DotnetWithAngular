import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css'
})
export class MemberList {
  private memberservice=inject(MemberService);
  protected members$:Observable<profile[]>;
  constructor(){
   this.members$=this.memberservice.getMembers();
  }
}
