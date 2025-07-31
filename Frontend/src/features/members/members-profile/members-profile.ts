import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { profile } from '../../../types/profile';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-members-profile',
  imports: [DatePipe],
  templateUrl: './members-profile.html',
  styleUrl: './members-profile.css'
})
export class MembersProfile implements OnInit {
  private route=inject(ActivatedRoute);
  protected member=signal<profile | undefined>(undefined);
ngOnInit(): void {
this.route.parent?.data.subscribe(data=>{
  this.member.set(data['member']);
})
}
}
