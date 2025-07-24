import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/dashboard.models';
import { DashboardService } from '../../services/dashboard.service';
import { CardListComponent } from '../../components/card-list/card-list';

@Component({
  selector: 'app-lights',
  standalone: true,
  imports: [CommonModule, CardListComponent],
  templateUrl: './lights.html',
  styleUrl: './lights.css',
})
export class Lights implements OnInit {
  cards: Card[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const tabData = this.dashboardService.getTabData('lights');
    if (tabData) {
      this.cards = tabData.cards;
    }
  }
}
