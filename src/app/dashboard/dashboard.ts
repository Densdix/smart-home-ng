import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Lights } from './lights/lights';
import { Overview } from './overview/overview';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, Overview, Lights],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {
  activeTab: 'overview' | 'lights' = 'overview';

  setActiveTab(tab: 'overview' | 'lights') {
    this.activeTab = tab;
  }
}
