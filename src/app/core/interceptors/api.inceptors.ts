import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    
    // Only access localStorage in browser
    const token = isPlatformBrowser(platformId) 
        ? localStorage.getItem('auth_token') 
        : null;
    
    // Clone and modify request
    let modifiedReq = req.clone({
        setHeaders: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    
    // Add authorization header if token exists
    if (token) {
        modifiedReq = modifiedReq.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
    
    // Handle response and errors
    return next(modifiedReq).pipe(
        catchError((error: HttpErrorResponse) => {
            if (isPlatformBrowser(platformId)) {
                handleRequestErrors(error, router);
            }
            return throwError(() => error);
        })
    );
};

function handleRequestErrors(error: HttpErrorResponse, router: Router) {
    if (error.status === 401) {
        // Clear all authentication data
        localStorage.clear();
        console.error('Session expired. Please login again.');
        router.navigate(['/login']);
    } else if (error.status === 413) {
        console.error('File size exceeds the limit');
    } else if (error.error) {
        console.error('API Error:', error.error);
    }
}
