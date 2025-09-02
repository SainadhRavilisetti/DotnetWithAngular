import {
  Component,
  HostListener,
  inject,
  OnDestroy,
  OnInit,
  signal,
  ViewChild,
  viewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditableMember, profile } from '../../../types/profile';
import { DatePipe } from '@angular/common';
import { AgePipe } from '../../../core/pipes/age-pipe';
import { AccountService } from '../../../core/services/account-service';
import { MemberService } from '../../../core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastService } from '../../../core/services/toast-service';
import { TimeAgoPipe } from '../../../core/pipes/time-ago-pipe';

@Component({
  selector: 'app-members-profile',
  imports: [DatePipe, AgePipe, FormsModule,TimeAgoPipe],
  templateUrl: './members-profile.html',
  styleUrl: './members-profile.css',
})
export class MembersProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editFrom?: NgForm;
  @HostListener('window:beforeunload',['$event']) notify($event:BeforeUnloadEvent){
    if(this.editFrom?.dirty){
      $event.preventDefault();
    }
  }
  private accountService=inject(AccountService);
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  protected editableMember: EditableMember={
    Name:'',
    description:'',
    city:'',
    country:''
  };

  ngOnInit(): void {
    this.editableMember = {
      Name: this.memberService.member()?.name || '',
      description: this.memberService.member()?.description || '',
      city: this.memberService.member()?.city || '',
      country: this.memberService.member()?.country || '',
    };
  }
  updateProfile() {
    if (!this.memberService.member()) return;
    const updateMember = { ...this.memberService.member(), ...this.editableMember };
    this.memberService.updatemembers(this.editableMember).subscribe({
      next:()=>{
        const currentUser=this.accountService.currentuser();
        if(currentUser){
           if(updateMember.name!==currentUser.name){
            if(updateMember.name!=undefined){
              currentUser.name=updateMember.name;
              this.accountService.setcurrentuser(currentUser);
            }
          }
        }
        this.toast.success('profile updated successfully');
        this.memberService.editMode.set(false);
        this.memberService.member.set(updateMember as profile);
        this.editFrom?.reset(updateMember);
      }
    })
  }
  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
