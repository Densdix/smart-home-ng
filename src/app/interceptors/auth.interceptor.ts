import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { TokenService } from '../services/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  let url = req.url;
  if (!url.startsWith('http') && !url.startsWith('/api')) {
    url = `/api${url}`;
  }

  let modifiedReq = req.clone({ url });

  const token = tokenService.getToken();
  if (token) {
    modifiedReq = modifiedReq.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(modifiedReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        tokenService.clearToken();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
