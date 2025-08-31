import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardListState } from '../state/app.state';

// Feature Selector
export const selectDashboardListState =
  createFeatureSelector<DashboardListState>('dashboardList');

// Basic Selectors
export const selectDashboardList = createSelector(
  selectDashboardListState,
  (state) => state.dashboards
);

export const selectDashboardListLoading = createSelector(
  selectDashboardListState,
  (state) => state.isLoading
);

export const selectDashboardListError = createSelector(
  selectDashboardListState,
  (state) => state.error
);

export const selectSelectedDashboardId = createSelector(
  selectDashboardListState,
  (state) => state.selectedDashboardId
);

// Computed Selectors
export const selectDashboardListCount = createSelector(
  selectDashboardList,
  (dashboards) => dashboards.length
);

export const selectSelectedDashboardInfo = createSelector(
  selectDashboardList,
  selectSelectedDashboardId,
  (dashboards, selectedId) => dashboards.find((d) => d.id === selectedId)
);

export const selectDashboardById = (dashboardId: string) =>
  createSelector(selectDashboardList, (dashboards) =>
    dashboards.find((d) => d.id === dashboardId)
  );

export const selectDashboardExists = (dashboardId: string) =>
  createSelector(selectDashboardList, (dashboards) =>
    dashboards.some((d) => d.id === dashboardId)
  );

export const selectDashboardTitles = createSelector(
  selectDashboardList,
  (dashboards) => dashboards.map((d) => d.title)
);

export const selectDashboardIds = createSelector(
  selectDashboardList,
  (dashboards) => dashboards.map((d) => d.id)
);

// Loading State Selectors
export const selectIsDashboardListBusy = createSelector(
  selectDashboardListLoading,
  (isLoading) => isLoading
);

// Error State Selectors
export const selectDashboardListErrorMessage = createSelector(
  selectDashboardListError,
  (error) => error
);

// Selection State Selectors
export const selectHasSelectedDashboard = createSelector(
  selectSelectedDashboardId,
  (selectedId) => !!selectedId
);

export const selectCanCreateDashboard = createSelector(
  selectDashboardListLoading,
  (isLoading) => !isLoading
);

export const selectCanDeleteDashboard = () =>
  createSelector(
    selectDashboardListLoading,
    selectDashboardListCount,
    (isLoading, count) => !isLoading && count > 1
  );
