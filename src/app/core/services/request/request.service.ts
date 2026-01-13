import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IS_SECURE_REQUEST, IS_FILES_REQUEST } from '../../interceptors/api.inceptors';
import { environment } from '../../../../environments/environment';

export interface RequestOptions {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    data?: any;
    params?: any;
    secure?: boolean;
    files?: boolean;
    exact?: boolean; // If true, use the URL as-is without prepending base URL
    headers?: Record<string, string>;
}

@Injectable({
    providedIn: 'root'
})
export class RequestService {
    private http = inject(HttpClient);
    
    // Base API URL from environment
    private baseUrl =environment.apiUrl;
    
    Request<T = any>(options: RequestOptions){
        // Build full URL
        const url = options.exact ? options.url : `${this.baseUrl}/${options.url}`;
        
        // Create HttpContext with custom flags
        const context = new HttpContext()
            .set(IS_SECURE_REQUEST, options.secure ?? true) // Default to secure
            .set(IS_FILES_REQUEST, options.files ?? false);
        
        // Build request options
        const httpOptions: any = {
            headers: options.headers || {},
            context,
            params: options.params
        };
        
        // Execute request based on method
        switch (options.method) {
            case 'GET':
                return this.http.get<T>(url, httpOptions);
            case 'POST':
                return this.http.post<T>(url, options.data, httpOptions);
            case 'PUT':
                return this.http.put<T>(url, options.data, httpOptions);
            case 'PATCH':
                return this.http.patch<T>(url, options.data, httpOptions);
            case 'DELETE':
                return this.http.delete<T>(url, httpOptions);
            default:
                throw new Error(`Unsupported HTTP method: ${options.method}`);
        }
    }
}
