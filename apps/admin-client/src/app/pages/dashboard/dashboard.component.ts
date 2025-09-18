import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard-container">
      <h1>Welcome to the Admin Dashboard 🎉</h1>
      <p>You are logged in.</p>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class DashboardComponent {}
