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
