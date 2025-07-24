import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = () => {
  const accountservice=inject(AccountService);
  const toast=inject(ToastService);
  if(accountservice.currentuser()) return true;
  else{
    toast.error('you shall not pass');
    return false;
  }
};
