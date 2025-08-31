export interface SensorValue {
  amount: number;
  unit: string;
}

export interface Device {
  id: string;
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface Sensor {
  id: string;
  type: 'sensor';
  icon: string;
  label: string;
  value: SensorValue;
}

export type CardItem = Device | Sensor;

export interface Card {
  id: string;
  title: string;
  layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout';
  items: CardItem[];
}

export interface Tab {
  id: string;
  title: string;
  cards: Card[];
}

export interface DashboardData {
  tabs: Tab[];
}

// API Models
export interface LoginRequest {
  userName: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserProfile {
  fullName: string;
  initials: string;
}

export interface DashboardInfo {
  id: string;
  title: string;
  icon: string;
}

// CRUD Operation Models
export interface CreateDashboardRequest {
  id: string;
  title: string;
  icon: string;
}

export interface UpdateDashboardRequest {
  tabs: Tab[];
}

export interface TabFormData {
  title: string;
}

export interface CardFormData {
  layout: 'singleDevice' | 'horizontalLayout' | 'verticalLayout';
  title?: string;
}

export interface CardItemFormData {
  itemId: string;
}

// Validation Models
export interface ValidationError {
  field: string;
  message: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// UI State Models
export interface EditModeState {
  isActive: boolean;
  originalData: DashboardData | null;
  hasUnsavedChanges: boolean;
}

export interface TabEditState {
  [tabId: string]: {
    isEditing: boolean;
    originalTitle: string;
  };
}

export interface CardEditState {
  [cardId: string]: {
    isEditing: boolean;
    originalTitle: string;
  };
}

// Layout Types
export const CARD_LAYOUTS = {
  SINGLE_DEVICE: 'singleDevice',
  HORIZONTAL: 'horizontalLayout',
  VERTICAL: 'verticalLayout',
} as const;

export type CardLayout = (typeof CARD_LAYOUTS)[keyof typeof CARD_LAYOUTS];

// Icon Options for Dashboards
export const DASHBOARD_ICONS = [
  'home',
  'dashboard',
  'settings',
  'monitor',
  'chart',
  'analytics',
  'control',
  'smart_home',
  'lightbulb',
  'thermostat',
  'security',
  'energy',
] as const;

export type DashboardIcon = (typeof DASHBOARD_ICONS)[number];
