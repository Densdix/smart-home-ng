import { ActionReducerMap } from '@ngrx/store';
import { DashboardState, dashboardReducer } from './reducers/dashboard.reducer';

export interface AppState {
  dashboard: DashboardState;
}

export const reducers: ActionReducerMap<AppState> = {
  dashboard: dashboardReducer,
};
