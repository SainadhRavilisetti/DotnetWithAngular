import { HttpEvent, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { BusyService } from '../services/busy-service';
import { delay, finalize, of, tap } from 'rxjs';

const cache = new Map<string, HttpEvent<unknown>>();

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const busyservice = inject(BusyService);
  const generateCacheKey = (url: string, params: HttpParams): string => {
    const paramString = params
      .keys()
      .map((key) => `${key}=${params.get(key)}`)
      .join('&');
    return paramString ? `${url}?${paramString}` : url;
  }

  
  const invalidateCache=(urlPattern:string)=>{
    for(const key of cache.keys()){
      console.log('key:',key);
      if(key.includes(urlPattern)){
        cache.delete(key);
        console.log(`Cache invalidating for:${key}`);
      }
    }
  }

  const cacheKey = generateCacheKey(req.url, req.params);

  if(req.method.includes('POST')&&req.url.includes('/likes')){
    invalidateCache('/likes')
  }
  if(req.method.includes('POST')&&req.url.includes('/message')){
    invalidateCache('/message')
  }
  if (req.method === 'GET') {
    const cachedResponse = cache.get(cacheKey);
    if (cachedResponse) {
      return of(cachedResponse);
    }
  }
  busyservice.busy();
  return next(req).pipe(
    delay(200),
    tap((reponse) => {
      cache.set(req.url, reponse);
    }),
    finalize(() => {
      busyservice.idle();
    })
  );
};
