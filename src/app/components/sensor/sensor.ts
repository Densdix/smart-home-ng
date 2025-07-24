import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Sensor } from '../../models/dashboard.models';
import { SensorValuePipe } from '../../pipes/sensor-value.pipe';

@Component({
  selector: 'app-sensor',
  standalone: true,
  imports: [CommonModule, SensorValuePipe],
  templateUrl: './sensor.html',
  styleUrl: './sensor.css',
})
export class SensorComponent {
  @Input() sensor!: Sensor;
}
