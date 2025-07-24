import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card, Device, CardItem } from '../../models/dashboard.models';
import { DeviceComponent } from '../device/device';
import { SensorComponent } from '../sensor/sensor';
import { HighlightActiveDirective } from '../../directives/highlight-active.directive';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    CommonModule,
    DeviceComponent,
    SensorComponent,
    HighlightActiveDirective,
  ],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class CardComponent {
  @Input() card!: Card;

  get devices(): Device[] {
    return this.card.items.filter((item) => item.type === 'device') as Device[];
  }

  get hasGroupToggle(): boolean {
    return this.devices.length >= 2;
  }

  get isGroupOn(): boolean {
    return this.devices.some((device) => device.state);
  }

  get hasActiveDevice(): boolean {
    return this.devices.some((device) => device.state);
  }

  onDeviceStateChange(index: number, newState: boolean) {
    const item = this.card.items[index];
    if (item.type === 'device') {
      item.state = newState;
    }
  }

  onGroupToggle() {
    const targetState = !this.isGroupOn;
    this.devices.forEach((device) => {
      device.state = targetState;
    });
  }

  isDevice(item: CardItem): item is Device {
    return item.type === 'device';
  }
}
