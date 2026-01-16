import { Component, inject, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router,  RouterModule } from "@angular/router";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { AuthService } from "../../../core/services/auth/auth.service";
import { Eye, EyeOff, Lock, Mail, LogIn, LucideAngularModule } from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from "primeng/api";

@Component({
    standalone: true,
    selector:'app-login',
    imports: [
        ReactiveFormsModule, 
        CommonModule,
        RouterModule,
        LucideAngularModule,
        InputTextModule,
        ButtonModule,
        ToastModule
    ],
    templateUrl:'./login.html',
    providers:[MessageService]
})
export class Login {
    // Icons
    readonly EyeIcon=Eye;
    readonly EyeOffIcon=EyeOff;
    readonly LockIcon=Lock;
    readonly MailIcon=Mail;
    readonly LogInIcon=LogIn;

    // Dependency injections
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private authService = inject(AuthService);
    private platformId = inject(PLATFORM_ID);
    private isBrowser = isPlatformBrowser(this.platformId);
    
    // Component properties
    loginForm: FormGroup;
    showPassword = false;
    isLoading = false;
    private messageService = inject(MessageService);
    
    // Constructor
    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    
    // Form submission handler
    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            const { email, password } = this.loginForm.value;
            
            const payload = {
                email: email,
                password: password
            };
            
            this.authService.login(payload).subscribe({
                next: (response) => {
                    console.log('Login response:', response);
                    // Store token
                    if (response.data.token && this.isBrowser) {
                        localStorage.setItem('auth_token', response.data.token);
                    }
                    // Navigate to dashboard
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
                    this.messageService.add({
                        severity:'error', 
                        summary: 'Login Failed',
                        detail: error.error.message || 'An error occurred during login.'
                    });
                    console.error('Login error:', error);
                    this.isLoading = false;
                    console.log("loading state:", this.isLoading);
                    // Handle error (show message to user)
                }
            });
        } else {
            Object.keys(this.loginForm.controls).forEach(key => {
                this.loginForm.controls[key].markAsTouched();
            });
        }
    }

    // Lifecycle hook
    ngOnInit(){
        console.log("Component initialized. Current loading state:", this.isLoading);
        if(this.isBrowser && localStorage.getItem('auth_token')){
            this.router.navigate(['/dashboard']);
        }
    }
}
