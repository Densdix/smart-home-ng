import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../state/app.state';

// Feature Selector
export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard');

// Basic Selectors
export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (state) => state.selectedDashboard
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.isLoading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectIsEditMode = createSelector(
  selectDashboardState,
  (state) => state.isEditMode
);

export const selectHasUnsavedChanges = createSelector(
  selectDashboardState,
  (state) => state.hasUnsavedChanges
);

export const selectOriginalData = createSelector(
  selectDashboardState,
  (state) => state.originalData
);

// Computed Selectors
export const selectDashboardTabs = createSelector(
  selectSelectedDashboard,
  (dashboard) => dashboard?.tabs || []
);

export const selectDashboardCards = createSelector(
  selectDashboardTabs,
  (tabs) => tabs.flatMap((tab) => tab.cards)
);

export const selectDashboardItems = createSelector(
  selectDashboardCards,
  (cards) => cards.flatMap((card) => card.items)
);

export const selectDashboardStats = createSelector(
  selectDashboardTabs,
  (tabs) => ({
    tabs: tabs.length,
    cards: tabs.reduce((sum, tab) => sum + tab.cards.length, 0),
    items: tabs.reduce(
      (sum, tab) =>
        sum +
        tab.cards.reduce((cardSum, card) => cardSum + card.items.length, 0),
      0
    ),
  })
);

// Tab-specific Selectors
export const selectTabById = (tabId: string) =>
  createSelector(selectDashboardTabs, (tabs) =>
    tabs.find((tab) => tab.id === tabId)
  );

export const selectCardsByTabId = (tabId: string) =>
  createSelector(selectTabById(tabId), (tab) => tab?.cards || []);

// Card-specific Selectors
export const selectCardById = (tabId: string, cardId: string) =>
  createSelector(selectCardsByTabId(tabId), (cards) =>
    cards.find((card) => card.id === cardId)
  );

export const selectItemsByCardId = (tabId: string, cardId: string) =>
  createSelector(selectCardById(tabId, cardId), (card) => card?.items || []);

// Edit Mode Selectors
export const selectCanSave = createSelector(
  selectIsEditMode,
  selectHasUnsavedChanges,
  (isEditMode, hasUnsavedChanges) => isEditMode && hasUnsavedChanges
);

export const selectCanDiscard = createSelector(
  selectIsEditMode,
  selectHasUnsavedChanges,
  (isEditMode, hasUnsavedChanges) => isEditMode && hasUnsavedChanges
);

// Loading State Selectors
export const selectIsDashboardBusy = createSelector(
  selectDashboardLoading,
  (isLoading) => isLoading
);

// Error State Selectors
export const selectDashboardErrorMessage = createSelector(
  selectDashboardError,
  (error) => error
);
