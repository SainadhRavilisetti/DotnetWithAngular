import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
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
  const generateCacheKey=(url:string ,params:HttpParams):string=>{
    const paramString=params.keys().map(key=>`${key}=${params.get(key)}`).join('&');
    return paramString ? `${url}?${paramString}`:url;
  }
  const cacheKey=generateCacheKey(req.url,req.params);
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
