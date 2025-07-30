import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { Observable } from 'rxjs';
import { profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../../members/member-card/member-card";

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
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
