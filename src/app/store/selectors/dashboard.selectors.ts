import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState } from '../dashboard.state';

export const selectDashboardState =
  createFeatureSelector<DashboardState>('dashboard');

export const selectSelectedDashboard = createSelector(
  selectDashboardState,
  (state) => state.selectedDashboard
);

export const selectIsEditMode = createSelector(
  selectDashboardState,
  (state) => state.isEditMode
);

export const selectDashboardLoading = createSelector(
  selectDashboardState,
  (state) => state.loading
);

export const selectDashboardError = createSelector(
  selectDashboardState,
  (state) => state.error
);

export const selectDashboardTabs = createSelector(
  selectSelectedDashboard,
  (dashboard) => dashboard?.tabs || []
);

export const selectDashboardSnapshot = createSelector(
  selectDashboardState,
  (state) => state.dashboardSnapshot
);

export const selectHasUnsavedChanges = createSelector(
  selectSelectedDashboard,
  selectDashboardSnapshot,
  (current, snapshot) => {
    if (!current || !snapshot) return false;
    return JSON.stringify(current) !== JSON.stringify(snapshot);
  }
);
