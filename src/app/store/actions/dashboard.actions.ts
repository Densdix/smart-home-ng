import { createAction, props } from '@ngrx/store';
import {
  DashboardData,
  CardItem,
  CardLayout,
} from '../../models/dashboard.models';

// Dashboard Loading Actions
export const loadDashboard = createAction(
  '[Dashboard] Load Dashboard',
  props<{ dashboardId: string }>()
);

export const loadDashboardSuccess = createAction(
  '[Dashboard] Load Dashboard Success',
  props<{ dashboard: DashboardData }>()
);

export const loadDashboardFailure = createAction(
  '[Dashboard] Load Dashboard Failure',
  props<{ error: string }>()
);

// Dashboard Saving Actions
export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ dashboardId: string }>()
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save Dashboard Success',
  props<{ dashboard: DashboardData }>()
);

export const saveDashboardFailure = createAction(
  '[Dashboard] Save Dashboard Failure',
  props<{ error: string }>()
);

// Edit Mode Actions
export const enterEditMode = createAction('[Dashboard] Enter Edit Mode');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');
export const discardChanges = createAction('[Dashboard] Discard Changes');

// Tab Management Actions
export const addTab = createAction(
  '[Dashboard] Add Tab',
  props<{ title: string }>()
);

export const removeTab = createAction(
  '[Dashboard] Remove Tab',
  props<{ tabId: string }>()
);

export const reorderTab = createAction(
  '[Dashboard] Reorder Tab',
  props<{ tabId: string; direction: 'left' | 'right' }>()
);

export const updateTabTitle = createAction(
  '[Dashboard] Update Tab Title',
  props<{ tabId: string; title: string }>()
);

// Card Management Actions
export const addCard = createAction(
  '[Dashboard] Add Card',
  props<{ tabId: string; layout: CardLayout }>()
);

export const removeCard = createAction(
  '[Dashboard] Remove Card',
  props<{ tabId: string; cardId: string }>()
);

export const reorderCard = createAction(
  '[Dashboard] Reorder Card',
  props<{ tabId: string; cardId: string; newIndex: number }>()
);

export const updateCardTitle = createAction(
  '[Dashboard] Update Card Title',
  props<{ tabId: string; cardId: string; title: string }>()
);

// Card Content Actions
export const addItemToCard = createAction(
  '[Dashboard] Add Item To Card',
  props<{ tabId: string; cardId: string; item: CardItem }>()
);

export const removeItemFromCard = createAction(
  '[Dashboard] Remove Item From Card',
  props<{ tabId: string; cardId: string; itemId: string }>()
);

// Dashboard Creation Actions
export const createDashboard = createAction(
  '[Dashboard] Create Dashboard',
  props<{ dashboardInfo: { id: string; title: string; icon: string } }>()
);

export const createDashboardSuccess = createAction(
  '[Dashboard] Create Dashboard Success',
  props<{ dashboard: DashboardData; dashboardId: string }>()
);

export const createDashboardFailure = createAction(
  '[Dashboard] Create Dashboard Failure',
  props<{ error: string }>()
);

// Dashboard Deletion Actions
export const deleteDashboard = createAction(
  '[Dashboard] Delete Dashboard',
  props<{ dashboardId: string }>()
);

export const deleteDashboardSuccess = createAction(
  '[Dashboard] Delete Dashboard Success',
  props<{ dashboardId: string }>()
);

export const deleteDashboardFailure = createAction(
  '[Dashboard] Delete Dashboard Failure',
  props<{ error: string }>()
);

// Device State Sync Actions
export const syncDeviceStateInDashboard = createAction(
  '[Dashboard] Sync Device State',
  props<{ deviceId: string; newState: boolean }>()
);
