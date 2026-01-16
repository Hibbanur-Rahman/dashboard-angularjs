import { Injectable, inject } from "@angular/core";
import { RequestService } from "../request/request.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'    
})
export class AuthService {
    private requestService = inject(RequestService);

    login(payload: { email: string; password: string }): Observable<any> {
        return this.requestService.Request({
            url:'login',
            method:'POST',
            secure:false,
            data: payload
        });
    }

    register(payload: any): Observable<any> {
        return this.requestService.Request({
            url:'register',
            method:'POST',
            secure:false,
            data: payload
        });
    }
}