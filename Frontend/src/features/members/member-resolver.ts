import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { MemberService } from '../../core/services/member-service';
import { profile } from '../../types/profile';
import { EMPTY } from 'rxjs';

export const memberResolver: ResolveFn<profile> = (route, state) => {
  const memberService=inject(MemberService);
  const router=inject(Router);
  const memberId=route.paramMap.get('id');
  if(!memberId) {
    router.navigateByUrl('/not-found');
    return EMPTY;
  }
  return memberService.getMemberById(memberId);
};
