import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/dashboard.models';
import { DashboardService } from '../../services/dashboard.service';
import { CardListComponent } from '../../components/card-list/card-list';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, CardListComponent],
  templateUrl: './overview.html',
  styleUrl: './overview.css',
})
export class Overview implements OnInit {
  cards: Card[] = [];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    const tabData = this.dashboardService.getTabData('overview');
    if (tabData) {
      this.cards = tabData.cards;
    }
  }
}
