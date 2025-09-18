import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import axios from 'axios';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private router: Router) {}

  // Called by (ngSubmit)
  async onSubmit(form?: NgForm) {
    // Guard in case someone triggers without a form reference
    if (form && !form.form.valid) {
      this.errorMessage = 'Please fill the form correctly.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    try {
      const url = `${environment.apiUrl.replace(/\/$/, '')}/api/auth/login`;
      const res = await axios.post(url, { email: this.email, password: this.password });

      // Backend returns { user, accessToken, refreshToken } (or sometimes token)
      const data = res.data || {};
      const accessToken = data.accessToken || data.token || data.access_token;
      const refreshToken = data.refreshToken || data.refresh_token;

      if (!accessToken) {
        throw new Error('Login succeeded but no token returned from server.');
      }

      // Persist tokens (you may choose cookie/secure storage in prod)
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);

      // Navigate to dashboard (adjust route if you used a different path)
      await this.router.navigate(['/dashboard']);
    } catch (err: any) {
      this.errorMessage = err?.response?.data?.error || err?.response?.data?.message || err.message || 'Login failed';
    } finally {
      this.loading = false;
    }
  }
}
