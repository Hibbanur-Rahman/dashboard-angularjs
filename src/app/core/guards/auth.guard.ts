import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";

@Injectable({
    providedIn:'root'
})
export class AuthGuard{
    private platformId = inject(PLATFORM_ID);
    
    constructor(private router:Router){}
    
    canActivate(){
        // Only access localStorage in browser environment
        if (!isPlatformBrowser(this.platformId)) {
            return true; // Allow navigation during SSR, actual auth check happens on client
        }
        
        const token=localStorage.getItem('auth_token');
        if(token){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }

}