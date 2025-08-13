import { Component, computed, Inject, inject, OnInit, Signal, signal } from '@angular/core';
import { MemberService } from '../../../core/services/member-service';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { profile } from '../../../types/profile';
import { AsyncPipe } from '@angular/common';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [RouterLink, RouterLinkActive, RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css'
})
export class MemberDetailed implements OnInit{
protected memberService=inject(MemberService);
private accountService=inject(AccountService);
private route=inject(ActivatedRoute);
private router=inject(Router);
protected title=signal<string | undefined>('Profile');
protected isCurrentUser = computed(()=>{
  return this.accountService.currentuser()?.id===this.route.snapshot.paramMap.get('id');
})
ngOnInit(): void {
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
