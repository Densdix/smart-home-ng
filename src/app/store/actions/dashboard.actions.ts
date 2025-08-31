import { createAction, props } from '@ngrx/store';
import {
  DashboardData,
  Card,
  Tab,
  CardItem,
} from '../../models/dashboard.models';

// Edit Mode Actions
export const enterEditMode = createAction('[Dashboard] Enter Edit Mode');
export const exitEditMode = createAction('[Dashboard] Exit Edit Mode');

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
  props<{ tabId: string; layout: string }>()
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

// Card Content Management Actions
export const addItemToCard = createAction(
  '[Dashboard] Add Item To Card',
  props<{ tabId: string; cardId: string; item: CardItem }>()
);

export const removeItemFromCard = createAction(
  '[Dashboard] Remove Item From Card',
  props<{ tabId: string; cardId: string; itemId: string }>()
);

// Save/Discard Actions
export const saveDashboard = createAction(
  '[Dashboard] Save Dashboard',
  props<{ dashboardId: string }>()
);

export const saveDashboardSuccess = createAction(
  '[Dashboard] Save Dashboard Success'
);

export const saveDashboardFailure = createAction(
  '[Dashboard] Save Dashboard Failure',
  props<{ error: string }>()
);

export const discardChanges = createAction('[Dashboard] Discard Changes');
