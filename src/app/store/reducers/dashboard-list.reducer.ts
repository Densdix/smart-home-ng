import { createReducer, on } from '@ngrx/store';
import { initialDashboardListState } from '../state/app.state';
import * as DashboardListActions from '../actions/dashboard-list.actions';

export const dashboardListReducer = createReducer(
  initialDashboardListState,

  on(DashboardListActions.loadDashboardList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    DashboardListActions.loadDashboardListSuccess,
    (state, { dashboards }) => ({
      ...state,
      dashboards,
      isLoading: false,
      error: null,
    })
  ),

  on(DashboardListActions.loadDashboardListFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardListActions.createDashboardInList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    DashboardListActions.createDashboardInListSuccess,
    (state, { dashboard }) => ({
      ...state,
      dashboards: [...state.dashboards, dashboard],
      isLoading: false,
      error: null,
    })
  ),

  on(DashboardListActions.createDashboardInListFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardListActions.updateDashboardInList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    DashboardListActions.updateDashboardInListSuccess,
    (state, { dashboard }) => ({
      ...state,
      dashboards: state.dashboards.map((d) =>
        d.id === dashboard.id ? dashboard : d
      ),
      isLoading: false,
      error: null,
    })
  ),

  on(DashboardListActions.updateDashboardInListFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DashboardListActions.deleteDashboardFromList, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(
    DashboardListActions.deleteDashboardFromListSuccess,
    (state, { dashboardId }) => ({
      ...state,
      dashboards: state.dashboards.filter((d) => d.id !== dashboardId),
      selectedDashboardId:
        state.selectedDashboardId === dashboardId
          ? null
          : state.selectedDashboardId,
      isLoading: false,
      error: null,
    })
  ),

  on(
    DashboardListActions.deleteDashboardFromListFailure,
    (state, { error }) => ({
      ...state,
      isLoading: false,
      error,
    })
  ),

  on(DashboardListActions.selectDashboard, (state, { dashboardId }) => ({
    ...state,
    selectedDashboardId: dashboardId,
  })),

  on(DashboardListActions.clearDashboardSelection, (state) => ({
    ...state,
    selectedDashboardId: null,
  }))
);
