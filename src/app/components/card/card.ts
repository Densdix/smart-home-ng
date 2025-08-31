import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, Device, CardItem } from '../../models/dashboard.models';
import { DeviceComponent } from '../device/device';
import { SensorComponent } from '../sensor/sensor';
import { HighlightActiveDirective } from '../../directives/highlight-active.directive';
import { FilterDevicesPipe } from '../../pipes/filter-devices.pipe';
import { HasActiveDevicePipe } from '../../pipes/has-active-device.pipe';
import { DashboardStore } from '../../store/dashboard.store';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    DeviceComponent,
    SensorComponent,
    HighlightActiveDirective,
    FilterDevicesPipe,
    HasActiveDevicePipe,
  ],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input() card!: Card;

  private dashboardStore = inject(DashboardStore);

  hasGroupToggle(devices: Device[]): boolean {
    return devices.length >= 2;
  }

  isGroupOn(devices: Device[]): boolean {
    return devices.some((device) => device.state);
  }

  onDeviceStateChange(index: number, newState: boolean): void {
    const item = this.card.items[index];
    if (item.type === 'device') {
      this.dashboardStore.toggleDeviceState(item.id, newState);
    }
  }

  onGroupToggle(devices: Device[]): void {
    const targetState = !this.isGroupOn(devices);
    devices.forEach((device) => {
      this.dashboardStore.toggleDeviceState(device.id, targetState);
    });
  }

  isDevice(item: CardItem): item is Device {
    return item.type === 'device';
  }
}
