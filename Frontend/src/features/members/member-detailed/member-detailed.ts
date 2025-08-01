import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { AgePipe } from '../../../core/pipes/age-pipe';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit{
private memberService=inject(MemberService);
private route=inject(ActivatedRoute);
private router=inject(Router);
protected members=signal<profile | undefined>(undefined);
protected title=signal<string | undefined>('Profile');

ngOnInit(): void {
  this.route.data.subscribe({
    next:data=>this.members.set(data['member'])
  })
  this.title.set(this.route.firstChild?.snapshot?.title);
  this.router.events.pipe(
    filter(event=>event instanceof NavigationEnd)
  ).subscribe({
    next:()=>{
      this.title.set(this.route.firstChild?.snapshot?.title);
    }
  })
}
}
