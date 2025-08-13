import { CanDeactivateFn } from '@angular/router';
import { MembersProfile } from '../../features/members/members-profile/members-profile';

export const preventUnsavedChangesGuard: CanDeactivateFn<MembersProfile> = (component) => {
  if(component.editFrom?.dirty){
    return confirm('Are you sure you want to continue?All unsaved changes will be lost');
  }
  return true;
};
