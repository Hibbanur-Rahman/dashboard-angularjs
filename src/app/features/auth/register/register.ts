import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";

@Component({
    selector:'app-register',
    imports: [ReactiveFormsModule,CommonModule,RouterLink],
    templateUrl:'./register.html',
    styleUrl:'./register.css'
})
export class Register {
    private router=inject(Router);
    private fb=inject(FormBuilder);
    private authService=inject(AuthService);

    registerForm:FormGroup;
    isloading=false;

    constructor(){
        this.registerForm=this.fb.group({
            name:[''],
            email:[''],
            password:[''],
        });
    }

    onSubmit(){
        if(this.registerForm.valid){
            this.isloading=true;
            const {name,email,password}=this.registerForm.value;
            const payload={
                username:name,
                email:email,
                password:password
            };
            console.log('Register payload:', payload);
            this.authService.register(payload).subscribe({
                next:(response)=>{
                    console.log('Registration successful',response);
                    this.isloading=false;
                    this.router.navigate(['/login']);
                },
                error:(error)=>{
                    console.error('Registration error:',error);
                    this.isloading=false;
                }
            })
        }
    }
    ngOnInit(){
        if(localStorage.getItem('auth_token')){
            this.router.navigate(['/dashboard']);
        }
    }
}