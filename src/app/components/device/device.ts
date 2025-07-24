import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../../models/dashboard.models';
import { HighlightActiveDirective } from '../../directives/highlight-active.directive';

@Component({
  selector: 'app-device',
  standalone: true,
  imports: [CommonModule, HighlightActiveDirective],
  templateUrl: './device.html',
  styleUrl: './device.css',
})
export class DeviceComponent {
  @Input() device!: Device;
  @Input() layout: 'single' | 'multi' = 'multi';
  @Output() stateChange = new EventEmitter<boolean>();

  onToggle() {
    this.stateChange.emit(!this.device.state);
  }
}
