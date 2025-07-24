export interface SensorValue {
  amount: number;
  unit: string;
}

export interface Device {
  type: 'device';
  icon: string;
  label: string;
  state: boolean;
}

export interface Sensor {
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
