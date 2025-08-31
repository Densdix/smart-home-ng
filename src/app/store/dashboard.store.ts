import { Injectable, computed, inject, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './index';
import * as DashboardSelectors from './selectors/dashboard.selectors';
import * as DashboardActions from './actions/dashboard.actions';
import * as DeviceActions from './actions/device.actions';
import { CardItem, CardLayout } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardStore {
  private store = inject(Store<AppState>);

  private _isEditMode = signal(false);
  isEditMode = this._isEditMode.asReadonly();

  selectedDashboard$ = this.store.select(
    DashboardSelectors.selectSelectedDashboard
  );
  dashboardTabs$ = this.store.select(DashboardSelectors.selectDashboardTabs);
  dashboardLoading$ = this.store.select(
    DashboardSelectors.selectDashboardLoading
  );
  dashboardError$ = this.store.select(DashboardSelectors.selectDashboardError);
  hasUnsavedChanges$ = this.store.select(
    DashboardSelectors.selectHasUnsavedChanges
  );

  isEditModeComputed = computed(() => this._isEditMode());

  enterEditMode() {
    this._isEditMode.set(true);
    this.store.dispatch(DashboardActions.enterEditMode());
  }

  exitEditMode() {
    this._isEditMode.set(false);
    this.store.dispatch(DashboardActions.exitEditMode());
  }

  loadDashboard(dashboardId: string) {
    this.store.dispatch(DashboardActions.loadDashboard({ dashboardId }));
  }

  addTab(title: string) {
    this.store.dispatch(DashboardActions.addTab({ title }));
  }

  removeTab(tabId: string) {
    this.store.dispatch(DashboardActions.removeTab({ tabId }));
  }

  reorderTab(tabId: string, direction: 'left' | 'right') {
    this.store.dispatch(DashboardActions.reorderTab({ tabId, direction }));
  }

  updateTabTitle(tabId: string, title: string) {
    this.store.dispatch(DashboardActions.updateTabTitle({ tabId, title }));
  }

  addCard(tabId: string, layout: CardLayout) {
    this.store.dispatch(DashboardActions.addCard({ tabId, layout }));
  }

  removeCard(tabId: string, cardId: string) {
    this.store.dispatch(DashboardActions.removeCard({ tabId, cardId }));
  }

  reorderCard(tabId: string, cardId: string, newIndex: number) {
    this.store.dispatch(
      DashboardActions.reorderCard({ tabId, cardId, newIndex })
    );
  }

  updateCardTitle(tabId: string, cardId: string, title: string) {
    this.store.dispatch(
      DashboardActions.updateCardTitle({ tabId, cardId, title })
    );
  }

  addItemToCard(tabId: string, cardId: string, item: CardItem) {
    this.store.dispatch(
      DashboardActions.addItemToCard({ tabId, cardId, item })
    );
  }

  removeItemFromCard(tabId: string, cardId: string, itemId: string) {
    this.store.dispatch(
      DashboardActions.removeItemFromCard({ tabId, cardId, itemId })
    );
  }

  saveDashboard(dashboardId: string) {
    this.store.dispatch(DashboardActions.saveDashboard({ dashboardId }));
  }

  discardChanges() {
    this.store.dispatch(DashboardActions.discardChanges());
  }

  toggleDeviceState(deviceId: string, newState: boolean) {
    this.store.dispatch(
      DeviceActions.toggleDeviceState({ deviceId, newState })
    );
  }
}
