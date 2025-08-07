import { Pipe, PipeTransform } from '@angular/core';
import { CardItem, Device } from '../models/dashboard.models';

@Pipe({
  name: 'filterDevices',
  standalone: true,
  pure: true,
})
export class FilterDevicesPipe implements PipeTransform {
  transform(items: CardItem[]): Device[] {
    return items.filter((item): item is Device => item.type === 'device');
  }
}
