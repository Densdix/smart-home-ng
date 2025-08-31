import { DashboardData } from '../models/dashboard.models';

export interface DashboardState {
  selectedDashboard: DashboardData | null;
  isEditMode: boolean;
  dashboardSnapshot: DashboardData | null; // для отмены изменений
  loading: boolean;
  error: string | null;
}

export const initialState: DashboardState = {
  selectedDashboard: null,
  isEditMode: false,
  dashboardSnapshot: null,
  loading: false,
  error: null,
};
