import { createAction, props } from '@ngrx/store';
import { DashboardInfo } from '../../models/dashboard.models';

// Dashboard List Loading Actions
export const loadDashboardList = createAction(
  '[Dashboard List] Load Dashboard List'
);

export const loadDashboardListSuccess = createAction(
  '[Dashboard List] Load Dashboard List Success',
  props<{ dashboards: DashboardInfo[] }>()
);

export const loadDashboardListFailure = createAction(
  '[Dashboard List] Load Dashboard List Failure',
  props<{ error: string }>()
);

// Dashboard Creation Actions
export const createDashboardInList = createAction(
  '[Dashboard List] Create Dashboard',
  props<{ dashboardInfo: DashboardInfo }>()
);

export const createDashboardInListSuccess = createAction(
  '[Dashboard List] Create Dashboard Success',
  props<{ dashboard: DashboardInfo }>()
);

export const createDashboardInListFailure = createAction(
  '[Dashboard List] Create Dashboard Failure',
  props<{ error: string }>()
);

// Dashboard Update Actions
export const updateDashboardInList = createAction(
  '[Dashboard List] Update Dashboard',
  props<{ dashboardId: string; updates: Partial<DashboardInfo> }>()
);

export const updateDashboardInListSuccess = createAction(
  '[Dashboard List] Update Dashboard Success',
  props<{ dashboard: DashboardInfo }>()
);

export const updateDashboardInListFailure = createAction(
  '[Dashboard List] Update Dashboard Failure',
  props<{ error: string }>()
);

// Dashboard Deletion Actions
export const deleteDashboardFromList = createAction(
  '[Dashboard List] Delete Dashboard',
  props<{ dashboardId: string }>()
);

export const deleteDashboardFromListSuccess = createAction(
  '[Dashboard List] Delete Dashboard Success',
  props<{ dashboardId: string }>()
);

export const deleteDashboardFromListFailure = createAction(
  '[Dashboard List] Delete Dashboard Failure',
  props<{ error: string }>()
);

// Dashboard Selection Actions
export const selectDashboard = createAction(
  '[Dashboard List] Select Dashboard',
  props<{ dashboardId: string }>()
);

export const clearDashboardSelection = createAction(
  '[Dashboard List] Clear Dashboard Selection'
);
