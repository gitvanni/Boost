import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
    signupEmail: string = '';
    signupPassword: string = '';
    loginEmail: string = '';
    loginPassword: string = '';
    errorMessage: string | null = null;
  
    constructor(private authService: AuthService, private router: Router) {}
  
    onSignUp() {
      this.authService.signUp(this.signupEmail, this.signupPassword).subscribe(
        response => {
          this.router.navigate(['/home']); 
        },
        error => {
          this.errorMessage = error.error.message;
        }
      );
    }
  
    onLogin() {
      this.authService.signIn(this.loginEmail, this.loginPassword).subscribe(
        response => {
          localStorage.setItem('token', response.token); 
          this.router.navigate(['/userhome']); 
        },
        error => {
          this.errorMessage = error.error.message; 
        }
      );
    }

}
