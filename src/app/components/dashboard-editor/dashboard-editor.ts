import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from '../../store/dashboard.store';
import { ModalService } from '../../services/modal.service';
import { EditModeControllerComponent } from '../edit-mode-controller/edit-mode-controller';
import { TabManagerComponent } from '../tab-manager/tab-manager';
import { CardManagerComponent } from '../card-manager/card-manager';
import { CreateDashboardModalComponent } from '../modals/create-dashboard-modal/create-dashboard-modal';
import { CardLayoutModalComponent } from '../modals/card-layout-modal/card-layout-modal';
import { CardContentModalComponent } from '../modals/card-content-modal/card-content-modal';
import { DashboardData, Tab, Card } from '../../models/dashboard.models';

@Component({
  selector: 'app-dashboard-editor',
  standalone: true,
  imports: [
    CommonModule,
    EditModeControllerComponent,
    TabManagerComponent,
    CardManagerComponent,
    CreateDashboardModalComponent,
    CardLayoutModalComponent,
    CardContentModalComponent,
  ],
  templateUrl: './dashboard-editor.html',
  styleUrls: ['./dashboard-editor.css'],
})
export class DashboardEditorComponent {
  private dashboardStore = inject(DashboardStore);
  private modalService = inject(ModalService);

  isEditMode = this.dashboardStore.isEditMode;
  selectedDashboard$ = this.dashboardStore.selectedDashboard$;
  dashboardLoading$ = this.dashboardStore.dashboardLoading$;
  dashboardError$ = this.dashboardStore.dashboardError$;

  showEditComponents = computed(() => this.isEditMode());
  showViewMode = computed(() => !this.isEditMode());
  hasDashboard = computed(() => false);

  getDashboardTitle(): string {
    return 'Мой дашборд';
  }

  getDashboardIcon(): string {
    return 'dashboard';
  }

  getTabsCount(): number {
    let count = 0;
    this.selectedDashboard$
      .subscribe((dashboard) => {
        count = dashboard?.tabs?.length || 0;
      })
      .unsubscribe();
    return count;
  }

  getTotalCardsCount(): number {
    let total = 0;
    this.selectedDashboard$
      .subscribe((dashboard: DashboardData | null) => {
        if (!dashboard?.tabs) return;
        total = dashboard.tabs.reduce(
          (sum: number, tab: Tab) => sum + (tab.cards?.length || 0),
          0
        );
      })
      .unsubscribe();
    return total;
  }

  getTotalItemsCount(): number {
    let total = 0;
    this.selectedDashboard$
      .subscribe((dashboard: DashboardData | null) => {
        if (!dashboard?.tabs) return;
        total = dashboard.tabs.reduce((sum: number, tab: Tab) => {
          const tabItems =
            tab.cards?.reduce(
              (tabTotal: number, card: Card) =>
                tabTotal + (card.items?.length || 0),
              0
            ) || 0;
          return sum + tabItems;
        }, 0);
      })
      .unsubscribe();
    return total;
  }

  getDashboardStats() {
    return {
      tabs: this.getTabsCount(),
      cards: this.getTotalCardsCount(),
      items: this.getTotalItemsCount(),
    };
  }

  createNewDashboard(): void {
    this.modalService.showCreateDashboardModal();
  }

  confirmDeleteDashboard(): void {
    const confirmed = confirm(
      'Вы уверены, что хотите удалить этот дашборд? Это действие нельзя отменить.'
    );
    if (confirmed) {
      console.log('Dashboard deletion confirmed');
    }
  }
}
