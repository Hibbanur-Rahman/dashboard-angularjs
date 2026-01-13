import { Injectable, inject } from '@angular/core';
import { RequestService } from '../request/request.service';

@Injectable({
    providedIn: 'root'
})
export class OrdersService {
    private requestService = inject(RequestService);
    
    // Example: GET request without auth
    getPublicOrders() {
        return this.requestService.Request({
            url: 'orders/public',
            method: 'GET',
            secure: false // No auth token
        });
    }
    
    // Example: GET request with auth
    getOrders() {
        return this.requestService.Request({
            url: 'orders',
            method: 'GET',
            secure: true // Will add auth token
        });
    }
    
    // Example: POST with JSON data (secure)
    createOrder(payload: any) {
        return this.requestService.Request({
            url: 'orders',
            method: 'POST',
            data: payload,
            secure: true
        });
    }
    
    // Example: POST with file upload
    uploadOrderDocument(formData: FormData) {
        return this.requestService.Request({
            url: 'orders/upload',
            method: 'POST',
            data: formData,
            secure: true,
            files: true // Will use multipart/form-data
        });
    }
    
    // Example: Update order
    updateOrder(id: string, payload: any) {
        return this.requestService.Request({
            url: `orders/${id}`,
            method: 'PUT',
            data: payload,
            secure: true
        });
    }
    
    // Example: Delete order
    deleteOrder(id: string) {
        return this.requestService.Request({
            url: `orders/${id}`,
            method: 'DELETE',
            secure: true
        });
    }
}
