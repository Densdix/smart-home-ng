import { ActionReducerMap } from '@ngrx/store';
import { AppState } from '../state/app.state';
import { dashboardReducer } from './dashboard.reducer';
import { dashboardListReducer } from './dashboard-list.reducer';
import { deviceReducer } from './device.reducer';

export const reducers: ActionReducerMap<AppState> = {
  dashboard: dashboardReducer,
  dashboardList: dashboardListReducer,
  device: deviceReducer,
};
