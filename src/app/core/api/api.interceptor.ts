import {
  HttpRequest,
  HttpHandlerFn,
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { throwError, catchError } from 'rxjs';
import { ErrorService } from '../services/error.service';
import { inject } from '@angular/core';

export const apiInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const errorService = inject(ErrorService);
  const modifiedRequest = req.clone({
    setHeaders: {
      'Content-Type': 'application/json',
    },
  });

  return next(modifiedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMsg = '';

      if (error.error instanceof ErrorEvent) {
        errorMsg = `Error: ${error.error.message}`;
      } else {
        switch (error.status) {
          case 401:
            errorMsg = 'Unauthorized access';
            break;
          case 403:
            errorMsg =
              "Access forbidden. You don't have permission to access this resource.";
            break;
          case 404:
            errorMsg = 'Resource not found.';
            break;
          case 500:
            errorMsg = 'Server error. Please try again later.';
            break;
          default:
            errorMsg = `Error Code: ${error.status}, Message: ${error.message}`;
        }
        errorService.showError(error.status, errorMsg);
      }
      console.error(errorMsg);
      return throwError(() => new Error(errorMsg));
    })
  );
};
