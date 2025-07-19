import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: {
      name: string;
    };
  };
}

@Component({
  selector: 'app-log-in',
  imports: [CommonModule,FormsModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  username = ''; //  For Sign Up
  isSignup = false;
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  toggleSignup() {
    this.isSignup = !this.isSignup;
    this.errorMessage = '';
  }

  // handleLogin() {
  //   this.auth.login(this.email, this.password).subscribe({
  //     next: (res) => {
  //       this.auth.saveUser(res.jwt, res.user);
  //       this.router.navigate(['/']); // or redirect to /tasks
  //     },
  //     error: (err) => {
  //       this.errorMessage = err.error?.error?.message || 'Login failed.';
  //     }
  //   });
  // }LoginResponse
// handleLogin() {
//   this.auth.login(this.email, this.password).subscribe({
//     next: (res: AuthResponse) => {
//       this.auth.saveUser(res.jwt, res.user);
//       this.router.navigate(['/']);
//     },
//     error: (err) => {
//       this.errorMessage = err.error?.error?.message || 'Login failed.';
//     }
//   });
// }
handleLogin() {
  this.auth.login(this.email, this.password).subscribe({
    next: (res) => {
      const token = res.jwt;
      localStorage.setItem('token', token); //  SAVE the token first

      this.auth.getFullUser(res.user.id).subscribe(fullUser => {
        this.auth.saveUser(token, fullUser); //  Save the full user + token
        this.router.navigate(['/']);
      });
    },
    error: (err) => {
      this.errorMessage = err.error?.error?.message || 'Login failed.';
    }
  });
}


handleSignup() {
  this.auth.signup(this.username, this.email, this.password).subscribe({
    next: (res: AuthResponse) => {
      this.auth.saveUser(res.jwt, res.user);
      this.router.navigate(['/']);
    },
    error: (err) => {
      this.errorMessage = err.error?.error?.message || 'Sign up failed.';
    }
  });
}
}


