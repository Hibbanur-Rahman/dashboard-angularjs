import { CommonModule } from "@angular/common";
import { Component, inject, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { Eye, EyeOff, Lock, Mail, User, UserPlus, LucideAngularModule } from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";
import { isPlatformBrowser } from "@angular/common";

@Component({
    selector:'app-register',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        LucideAngularModule,
        InputTextModule,
        ButtonModule,
        ToastModule
    ],
    templateUrl:'./register.html',
    providers:[MessageService]
})
export class Register {
    // Icons
    readonly EyeIcon=Eye;
    readonly EyeOffIcon=EyeOff;
    readonly LockIcon=Lock;
    readonly MailIcon=Mail;
    readonly UserIcon=User;
    readonly UserPlusIcon=UserPlus;

    private router=inject(Router);
    private fb=inject(FormBuilder);
    private authService=inject(AuthService);
    private messageService = inject(MessageService);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);

    registerForm:FormGroup;
    isloading=false;
    showPassword = false;

    constructor(){
        this.registerForm=this.fb.group({
            name:['', [Validators.required]],
            email:['', [Validators.required, Validators.email]],
            password:['', [Validators.required, Validators.minLength(6)]],
        });
    }

    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }

    onSubmit(){
        if(this.registerForm.valid){
            this.isloading=true;
            const {name,email,password}=this.registerForm.value;
            const payload={
                username:name,
                email:email,
                password:password,
                role:'admin'
            };
            console.log('Register payload:', payload);
            this.authService.register(payload).subscribe({
                next:(response)=>{
                    console.log('Registration successful',response);
                    this.messageService.add({
                        severity:'success', 
                        summary: 'Registration Successful',
                        detail: 'Your account has been created successfully!'
                    });
                    this.isloading=false;
                    setTimeout(() => {
                        this.router.navigate(['/login']);
                    }, 1500);
                },
                error:(error)=>{
                    this.messageService.add({
                        severity:'error', 
                        summary: 'Registration Failed',
                        detail: error.error.message || 'An error occurred during registration.'
                    });
                    console.error('Registration error:',error);
                    this.isloading=false;
                }
            })
        } else {
            Object.keys(this.registerForm.controls).forEach(key => {
                this.registerForm.controls[key].markAsTouched();
            });
        }
    }
    ngOnInit(){
        if(this.isBrowser && localStorage.getItem('auth_token')){
            this.router.navigate(['/dashboard']);
        }
    }
}