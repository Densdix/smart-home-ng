import { Injectable, inject, signal } from '@angular/core';
import { DashboardInfo } from '../models/dashboard.models';
import { DashboardStore } from '../store/dashboard.store';
import { DashboardListService } from './dashboard-list.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private dashboardStore = inject(DashboardStore);
  private dashboardListService = inject(DashboardListService);

  private _createDashboardModalVisible = signal(false);
  private _cardLayoutModalVisible = signal(false);
  private _cardContentModalVisible = signal(false);
  private _tabManagerModalVisible = signal(false);
  private _cardManagerModalVisible = signal(false);

  createDashboardModalVisible = this._createDashboardModalVisible.asReadonly();
  cardLayoutModalVisible = this._cardLayoutModalVisible.asReadonly();
  cardContentModalVisible = this._cardContentModalVisible.asReadonly();
  tabManagerModalVisible = this._tabManagerModalVisible.asReadonly();
  cardManagerModalVisible = this._cardManagerModalVisible.asReadonly();

  private _currentTabIdForCard = signal<string>('');
  currentTabIdForCard = this._currentTabIdForCard.asReadonly();

  private _currentCardForContent = signal<{
    card: import('../models/dashboard.models').Card;
    tabId: string;
  } | null>(null);
  currentCardForContent = this._currentCardForContent.asReadonly();

  showCreateDashboardModal(): void {
    this._createDashboardModalVisible.set(true);
  }

  closeCreateDashboardModal(): void {
    this._createDashboardModalVisible.set(false);
  }

  showCardLayoutModal(tabId: string): void {
    this._currentTabIdForCard.set(tabId);
    this._cardLayoutModalVisible.set(true);
  }

  closeCardLayoutModal(): void {
    this._cardLayoutModalVisible.set(false);
    this._currentTabIdForCard.set('');
  }

  showCardContentModal(
    card: import('../models/dashboard.models').Card,
    tabId: string
  ): void {
    this._currentCardForContent.set({ card, tabId });
    this._cardContentModalVisible.set(true);
  }

  closeCardContentModal(): void {
    this._cardContentModalVisible.set(false);
    this._currentCardForContent.set(null);
  }

  showTabManagerModal(): void {
    this._tabManagerModalVisible.set(true);
  }

  closeTabManagerModal(): void {
    this._tabManagerModalVisible.set(false);
  }

  showCardManagerModal(): void {
    this._cardManagerModalVisible.set(true);
  }

  closeCardManagerModal(): void {
    this._cardManagerModalVisible.set(false);
  }

  async createDashboard(dashboardInfo: DashboardInfo): Promise<void> {
    try {
      this.dashboardStore.createDashboard(dashboardInfo);

      this.closeCreateDashboardModal();
    } catch (error) {
      console.error('Error creating dashboard:', error);
      throw error;
    }
  }

  addTab(title: string): void {
    this.dashboardStore.addTab(title);
    this.closeTabManagerModal();
  }

  removeTab(tabId: string): void {
    this.dashboardStore.removeTab(tabId);
  }

  updateTabTitle(tabId: string, title: string): void {
    this.dashboardStore.updateTabTitle(tabId, title);
  }

  reorderTab(tabId: string, direction: 'left' | 'right'): void {
    this.dashboardStore.reorderTab(tabId, direction);
  }

  addCard(tabId: string, layout: string): void {
    this.dashboardStore.addCard(
      tabId,
      layout as 'singleDevice' | 'horizontalLayout' | 'verticalLayout'
    );
    this.closeCardLayoutModal();
  }

  removeCard(tabId: string, cardId: string): void {
    this.dashboardStore.removeCard(tabId, cardId);
  }

  updateCardTitle(tabId: string, cardId: string, title: string): void {
    this.dashboardStore.updateCardTitle(tabId, cardId, title);
  }

  reorderCard(tabId: string, cardId: string, newIndex: number): void {
    this.dashboardStore.reorderCard(tabId, cardId, newIndex);
  }

  addItemToCard(
    tabId: string,
    cardId: string,
    item: import('../models/dashboard.models').CardItem
  ): void {
    this.dashboardStore.addItemToCard(tabId, cardId, item);
    this.closeCardContentModal();
  }

  removeItemFromCard(tabId: string, cardId: string, itemId: string): void {
    this.dashboardStore.removeItemFromCard(tabId, cardId, itemId);
  }

  enterEditMode(): void {
    this.dashboardStore.enterEditMode();
  }

  exitEditMode(): void {
    this.dashboardStore.exitEditMode();
  }

  saveDashboard(dashboardId: string): void {
    this.dashboardStore.saveDashboard(dashboardId);
  }

  discardChanges(): void {
    this.dashboardStore.discardChanges();
  }

  toggleDeviceState(deviceId: string, newState: boolean): void {
    this.dashboardStore.toggleDeviceState(deviceId, newState);
  }
}
