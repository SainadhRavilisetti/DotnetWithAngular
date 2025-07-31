import { Component, inject } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Photos } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-members-photos',
  imports: [AsyncPipe],
  templateUrl: './members-photos.html',
  styleUrl: './members-photos.css'
})
export class MembersPhotos {
private memberService=inject(MemberService);
private route=inject(ActivatedRoute);
protected photos$?:Observable<Photos[]>;
constructor(){
  const memberId=this.route.parent?.snapshot.paramMap.get('id');
  if(memberId){
    this.photos$=this.memberService.getMembersPhotos(memberId);
  }
}
get photoMocks(){
  return Array.from({length:20},(_,i)=>({
    url:'/user.png'
  }))
}
}
