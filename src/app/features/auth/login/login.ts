import { Component, inject } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../../core/services/auth/auth.service";


@Component({
    selector:'app-login',
    imports: [ReactiveFormsModule, CommonModule,RouterLink],
    templateUrl:'./login.html',
    styleUrl:'./login.css'
})
export class Login {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private authService = inject(AuthService);
    
    
    loginForm: FormGroup;
    showPassword = false;
    isLoading = false;
    
    constructor() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }
    
    togglePasswordVisibility() {
        this.showPassword = !this.showPassword;
    }
    
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
                    if (response.data.access_token) {
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

    ngOnInit(){
        console.log("Component initialized. Current loading state:", this.isLoading);
        if(localStorage.getItem('auth_token')){
            this.router.navigate(['/dashboard']);
        }
    }
}