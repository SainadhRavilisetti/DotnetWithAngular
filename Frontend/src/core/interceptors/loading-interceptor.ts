import { HttpEvent, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { delay, finalize, of, tap } from 'rxjs';

const cache=new Map<string,HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyservice=inject(BusyService);
  // if(req.method=='GET'){
  //   const cachedResponse=cache.get(req.url);
  //   if(cachedResponse){
  //     return of(cachedResponse);
  //   }
  // }
  busyservice.busy();
  return next(req).pipe(
    delay(200),
    tap(reponse=>{
      cache.set(req.url,reponse)
    }),
    finalize(()=>{
      busyservice.idle()
    })
  )
};
