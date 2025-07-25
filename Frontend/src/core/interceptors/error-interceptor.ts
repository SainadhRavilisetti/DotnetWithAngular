import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { NavigationExtras, Router } from '@angular/router';
import { TokenType } from '@angular/compiler';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if (error.error.errors) {
              const modelstatusErrors = [];
              for (const key in error.error.errors) {
                if (error.error.errors[key]) {
                  modelstatusErrors.push(error.error.errors[key]);
                }
              }
              throw modelstatusErrors.flat();
            } else {
              toast.error(error.error);
            }
            break;
          case 401:
            toast.error('Unarthorized');
            break;
          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationextras: NavigationExtras = {
              state: { error: error.error },
            };
            router.navigateByUrl('/server-error', navigationextras);
            break;
          default:
            toast.error('Something went wrong');
            break;
        }
      }
      throw error;
    })
  );
};
