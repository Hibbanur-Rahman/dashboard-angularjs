import { Component, inject, PLATFORM_ID } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule, isPlatformBrowser } from "@angular/common";
import { AuthService } from "../../../core/services/auth/auth.service";
import { Eye, EyeClosed, EyeOff, FileIcon, LucideAngularModule } from 'lucide-angular'

@Component({
    standalone: true,
    selector:'app-login',
    imports: [ReactiveFormsModule, CommonModule,RouterLink, LucideAngularModule],
    templateUrl:'./login.html',
})
export class Login {
    // Icons
    readonly FileIcon=FileIcon;
    readonly EyeIcon=Eye;
    readonly EyeOffIcon=EyeOff;

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
                    if (response.data.access_token && this.isBrowser) {
                        localStorage.setItem('auth_token', response.data.access_token);
                    }
                    // Navigate to dashboard
                    this.router.navigate(['/dashboard']);
                },
                error: (error) => {
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
