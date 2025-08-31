import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Device, Sensor } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  private http = inject(HttpClient);

  getAvailableDevices(): Observable<(Device | Sensor)[]> {
    return this.http.get<(Device | Sensor)[]>('/api/devices');
  }

  updateDeviceState(deviceId: string, newState: boolean): Observable<Device> {
    return this.http.patch<Device>(`/api/devices/${deviceId}`, {
      state: newState,
    });
  }
}
