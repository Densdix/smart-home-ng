import { Component, OnInit, inject } from '@angular/core';
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
  private dashboardService = inject(DashboardService);

  ngOnInit() {
    const tabData = this.dashboardService.getTabData('lights');
    if (tabData) {
      this.cards = tabData.cards;
    }
  }
}
