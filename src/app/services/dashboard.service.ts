import { Injectable } from '@angular/core';
import { DashboardData } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private mockData: DashboardData = {
    tabs: [
      {
        id: 'overview',
        title: 'Overview',
        cards: [
          {
            id: 'balcony-weather',
            title: 'Balcony',
            layout: 'horizontalLayout',
            items: [
              {
                type: 'sensor',
                icon: 'thermostat',
                label: 'Temperature',
                value: {
                  amount: 18.7,
                  unit: '°C',
                },
              },
              {
                type: 'sensor',
                icon: 'water_drop',
                label: 'Humidity',
                value: {
                  amount: 80.78,
                  unit: '%',
                },
              },
              {
                type: 'sensor',
                icon: 'wb_cloudy',
                label: 'Forecast',
                value: {
                  amount: 1,
                  unit: 'Cloudy',
                },
              },
            ],
          },
          {
            id: 'bathroom-motion',
            title: 'Bathroom',
            layout: 'verticalLayout',
            items: [
              {
                type: 'sensor',
                icon: 'home',
                label: 'Occupancy',
                value: {
                  amount: 1,
                  unit: 'Clear',
                },
              },
              {
                type: 'sensor',
                icon: 'visibility',
                label: 'Presence keep time',
                value: {
                  amount: 0,
                  unit: 'min',
                },
              },
            ],
          },
          {
            id: 'desktop-pc',
            title: 'Desktop PC',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'computer',
                label: 'On',
                state: true,
              },
            ],
          },
          {
            id: 'vacuum-cleaner',
            title: 'Vacuum Cleaner Charger',
            layout: 'verticalLayout',
            items: [
              {
                type: 'device',
                icon: 'bolt',
                label: 'Switch',
                state: false,
              },
              {
                type: 'sensor',
                icon: 'flash_on',
                label: 'Power',
                value: {
                  amount: 0,
                  unit: 'W',
                },
              },
              {
                type: 'sensor',
                icon: 'electrical_services',
                label: 'Current',
                value: {
                  amount: 0.0,
                  unit: 'A',
                },
              },
              {
                type: 'sensor',
                icon: 'bolt',
                label: 'Voltage',
                value: {
                  amount: 240,
                  unit: 'V',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'lights',
        title: 'Lights',
        cards: [
          {
            id: 'hallway',
            title: 'Hallway',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Light',
                state: false,
              },
            ],
          },
          {
            id: 'living-room',
            title: 'Living Room',
            layout: 'verticalLayout',
            items: [
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Light',
                state: false,
              },
              {
                type: 'device',
                icon: 'lightbulb',
                label: 'Lamp',
                state: true,
              },
            ],
          },
          {
            id: 'bedroom',
            title: 'Bedroom',
            layout: 'verticalLayout',
            items: [
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Light',
                state: false,
              },
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Left Lamp',
                state: false,
              },
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Right Lamp',
                state: false,
              },
            ],
          },
          {
            id: 'kitchen',
            title: 'Kitchen',
            layout: 'verticalLayout',
            items: [
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Light',
                state: false,
              },
              {
                type: 'device',
                icon: 'lightbulb_outline',
                label: 'LED',
                state: true,
              },
            ],
          },
          {
            id: 'bathroom',
            title: 'Bathroom',
            layout: 'singleDevice',
            items: [
              {
                type: 'device',
                icon: 'tungsten',
                label: 'Light',
                state: false,
              },
            ],
          },
        ],
      },
    ],
  };

  getDashboardData(): DashboardData {
    return this.mockData;
  }

  getTabData(tabId: string) {
    return this.mockData.tabs.find((tab) => tab.id === tabId);
  }
}
