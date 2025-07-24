import { Pipe, PipeTransform } from '@angular/core';
import { SensorValue } from '../models/dashboard.models';

@Pipe({
  name: 'sensorValue',
  standalone: true,
})
export class SensorValuePipe implements PipeTransform {
  transform(value: SensorValue): string {
    if (!value || value.amount === undefined || value.amount === null) {
      return '';
    }

    let formattedAmount: string;
    if (Number.isInteger(value.amount)) {
      formattedAmount = value.amount.toString();
    } else {
      formattedAmount = value.amount.toFixed(2).replace(/\.?0+$/, '');
    }

    return `${formattedAmount} ${value.unit}`;
  }
}
