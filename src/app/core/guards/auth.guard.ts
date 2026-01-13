import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn:'root'
})
export class AuthGuard{
    constructor(private router:Router){}
    canActivate(){
        const token=localStorage.getItem('auth_token');
        if(token){
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}