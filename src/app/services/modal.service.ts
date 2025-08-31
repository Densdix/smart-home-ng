import { Injectable, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardListService } from './dashboard-list.service';
import { DashboardStore } from '../store/dashboard.store';
import { DashboardInfo, CardLayout } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private router = inject(Router);
  private dashboardListService = inject(DashboardListService);
  private dashboardStore = inject(DashboardStore);

  // Signals для управления модальными окнами
  private _showCreateDashboard = signal(false);
  private _showCardLayout = signal(false);
  private _showCardContent = signal(false);

  // Readonly signals для компонентов
  showCreateDashboard = this._showCreateDashboard.asReadonly();
  showCardLayout = this._showCardLayout.asReadonly();
  showCardContent = this._showCardContent.asReadonly();

  // Данные для модальных окон
  private _currentTabId = signal<string | null>(null);
  private _currentCardId = signal<string | null>(null);
  currentTabId = this._currentTabId.asReadonly();
  currentCardId = this._currentCardId.asReadonly();

  // Методы для управления модальными окнами
  openCreateDashboard(): void {
    this._showCreateDashboard.set(true);
  }

  closeCreateDashboard(): void {
    this._showCreateDashboard.set(false);
  }

  openCardLayout(tabId: string): void {
    this._currentTabId.set(tabId);
    this._showCardLayout.set(true);
  }

  closeCardLayout(): void {
    this._showCardLayout.set(false);
    this._currentTabId.set(null);
  }

  openCardContent(tabId: string, cardId: string): void {
    this._currentTabId.set(tabId);
    this._currentCardId.set(cardId);
    this._showCardContent.set(true);
  }

  closeCardContent(): void {
    this._showCardContent.set(false);
    this._currentTabId.set(null);
    this._currentCardId.set(null);
  }

  // Методы для работы с данными
  async createDashboard(dashboard: DashboardInfo): Promise<void> {
    try {
      await this.dashboardListService.createDashboard(dashboard).toPromise();
      this.closeCreateDashboard();
      this.router.navigate(['/dashboard', dashboard.id, 'main']);
    } catch (error) {
      console.error('Error creating dashboard:', error);
      throw error;
    }
  }

  async deleteDashboard(dashboardId: string): Promise<void> {
    try {
      await this.dashboardListService.deleteDashboard(dashboardId).toPromise();
      const firstDashboard = this.dashboardListService.getFirstDashboard();
      if (firstDashboard) {
        this.router.navigate(['/dashboard', firstDashboard.id, 'main']);
      } else {
        this.router.navigate(['/']);
      }
    } catch (error) {
      console.error('Error deleting dashboard:', error);
      throw error;
    }
  }

  addCardWithLayout(layout: CardLayout): void {
    const tabId = this._currentTabId();
    if (tabId) {
      this.dashboardStore.addCard(tabId, layout);
      this.closeCardLayout();
    }
  }

  // Получение текущих данных
  getCurrentTabId(): string | null {
    return this._currentTabId();
  }

  getCurrentCardId(): string | null {
    return this._currentCardId();
  }
}
