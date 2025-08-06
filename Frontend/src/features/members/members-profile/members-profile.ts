import {
  Component,
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

@Component({
  selector: 'app-members-profile',
  imports: [DatePipe, AgePipe, FormsModule],
  templateUrl: './members-profile.html',
  styleUrl: './members-profile.css',
})
export class MembersProfile implements OnInit, OnDestroy {
  @ViewChild('editForm') editFrom?: NgForm;
  protected memberService = inject(MemberService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  protected member = signal<profile | undefined>(undefined);
  protected editableMember: EditableMember={
    displayName:'',
    description:'',
    city:'',
    country:''
  };

  ngOnInit(): void {
    this.route.parent?.data.subscribe((data) => {
      this.member.set(data['member']);
    });
    this.editableMember = {
      displayName: this.member()?.name || '',
      description: this.member()?.description || '',
      city: this.member()?.city || '',
      country: this.member()?.country || '',
    };
  }
  updateProfile() {
    if (!this.member()) return;
    const updateMember = { ...this.member(), ...this.editableMember };
    console.log(updateMember);
    this.toast.success('profile updated successfully');
    this.memberService.editMode.set(false);
  }
  ngOnDestroy(): void {
    if (this.memberService.editMode()) {
      this.memberService.editMode.set(false);
    }
  }
}
