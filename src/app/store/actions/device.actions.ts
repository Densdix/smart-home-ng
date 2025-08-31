import { createAction, props } from '@ngrx/store';
import { Device, Sensor } from '../../models/dashboard.models';

export const toggleDeviceState = createAction(
  '[Device] Toggle Device State',
  props<{ deviceId: string; newState: boolean }>()
);

export const toggleDeviceStateSuccess = createAction(
  '[Device] Toggle Device State Success',
  props<{ device: Device }>()
);

export const toggleDeviceStateFailure = createAction(
  '[Device] Toggle Device State Failure',
  props<{ deviceId: string; error: string }>()
);

export const loadAvailableDevices = createAction(
  '[Device] Load Available Devices'
);

export const loadAvailableDevicesSuccess = createAction(
  '[Device] Load Available Devices Success',
  props<{ devices: (Device | Sensor)[] }>()
);

export const loadAvailableDevicesFailure = createAction(
  '[Device] Load Available Devices Failure',
  props<{ error: string }>()
);
