import { Component } from '@angular/core';
import { Lights } from './lights/lights';
import { Overview } from './overview/overview';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Overview, Lights],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent {}
