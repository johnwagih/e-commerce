import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
// import { platformBrowser } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';

export const headerInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  let toater = inject(ToastrService)
  let platformid = inject(PLATFORM_ID)
  if (isPlatformBrowser(platformid)) {
    if (localStorage.getItem(`tokenUser`)) {
      req = req.clone({
        setHeaders: {
          token: `${localStorage.getItem(`tokenUser`)}`
        }
      })
    }
  }
  return next(req).pipe(
    catchError((err) => {
      if (isPlatformBrowser(platformid)) {
        toater.error(err.error?.message || 'Something went wrong',
          'Sorry!',
          {
            progressBar: true
          })
      }
      return throwError(() => err);
    })
  );
};
