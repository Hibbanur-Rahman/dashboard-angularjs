import { HttpInterceptorFn, HttpErrorResponse, HttpContextToken } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { catchError, throwError } from 'rxjs';

// Context tokens to control interceptor behavior per request
export const IS_SECURE_REQUEST = new HttpContextToken<boolean>(() => true);
export const IS_FILES_REQUEST = new HttpContextToken<boolean>(() => false);

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    const platformId = inject(PLATFORM_ID);
    
    // Read context flags
    const isSecure = req.context.get(IS_SECURE_REQUEST);
    const isFiles = req.context.get(IS_FILES_REQUEST);
    
    // Only access localStorage in browser
    const token = isPlatformBrowser(platformId) 
        ? localStorage.getItem('auth_token') 
        : null;
    
    // Prepare headers
    const headers: Record<string, string> = {
        'Accept': 'application/json'
    };
    
    // Set Content-Type based on files flag
    if (!isFiles) {
        headers['Content-Type'] = 'application/json';
    }
    // Note: For multipart/form-data, don't set Content-Type - browser will set it with boundary
    
    // Clone request with headers
    let modifiedReq = req.clone({
        setHeaders: headers
    });
    
    // Add authorization header only if secure flag is true and token exists
    if (isSecure && token) {
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
