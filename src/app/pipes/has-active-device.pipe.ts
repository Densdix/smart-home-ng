import { Pipe, PipeTransform } from '@angular/core';
import { Device } from '../models/dashboard.models';

@Pipe({
  name: 'hasActiveDevice',
  standalone: true,
  pure: true,
})
export class HasActiveDevicePipe implements PipeTransform {
  transform(devices: Device[]): boolean {
    return devices.some((device) => device.state);
  }
}
