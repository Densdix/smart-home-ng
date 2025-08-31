import {
  DashboardData,
  DashboardInfo,
  Device,
  Sensor,
} from '../../models/dashboard.models';

// Dashboard State
export interface DashboardState {
  selectedDashboard: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  isEditMode: boolean;
  hasUnsavedChanges: boolean;
  originalData: DashboardData | null;
}

// Dashboard List State
export interface DashboardListState {
  dashboards: DashboardInfo[];
  isLoading: boolean;
  error: string | null;
  selectedDashboardId: string | null;
}

// Device State
export interface DeviceState {
  devices: (Device | Sensor)[];
  isLoading: boolean;
  error: string | null;
}

// Root Application State
export interface AppState {
  dashboard: DashboardState;
  dashboardList: DashboardListState;
  device: DeviceState;
}

// Initial States
export const initialDashboardState: DashboardState = {
  selectedDashboard: null,
  isLoading: false,
  error: null,
  isEditMode: false,
  hasUnsavedChanges: false,
  originalData: null,
};

export const initialDashboardListState: DashboardListState = {
  dashboards: [],
  isLoading: false,
  error: null,
  selectedDashboardId: null,
};

export const initialDeviceState: DeviceState = {
  devices: [],
  isLoading: false,
  error: null,
};

export const initialAppState: AppState = {
  dashboard: initialDashboardState,
  dashboardList: initialDashboardListState,
  device: initialDeviceState,
};
