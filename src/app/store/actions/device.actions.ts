import { createAction, props } from '@ngrx/store';
import { Device, Sensor } from '../../models/dashboard.models';

// Device Loading Actions
export const loadDevices = createAction('[Device] Load Devices');

export const loadDevicesSuccess = createAction(
  '[Device] Load Devices Success',
  props<{ devices: (Device | Sensor)[] }>()
);

export const loadDevicesFailure = createAction(
  '[Device] Load Devices Failure',
  props<{ error: string }>()
);

// Device State Management Actions
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
  props<{ error: string }>()
);

// Device Creation Actions
export const createDevice = createAction(
  '[Device] Create Device',
  props<{ device: Omit<Device, 'id'> }>()
);

export const createDeviceSuccess = createAction(
  '[Device] Create Device Success',
  props<{ device: Device }>()
);

export const createDeviceFailure = createAction(
  '[Device] Create Device Failure',
  props<{ error: string }>()
);

// Device Update Actions
export const updateDevice = createAction(
  '[Device] Update Device',
  props<{ deviceId: string; updates: Partial<Device> }>()
);

export const updateDeviceSuccess = createAction(
  '[Device] Update Device Success',
  props<{ device: Device }>()
);

export const updateDeviceFailure = createAction(
  '[Device] Update Device Failure',
  props<{ error: string }>()
);

// Device Deletion Actions
export const deleteDevice = createAction(
  '[Device] Delete Device',
  props<{ deviceId: string }>()
);

export const deleteDeviceSuccess = createAction(
  '[Device] Delete Device Success',
  props<{ deviceId: string }>()
);

export const deleteDeviceFailure = createAction(
  '[Device] Delete Device Failure',
  props<{ error: string }>()
);

// Sensor Management Actions
export const updateSensorValue = createAction(
  '[Device] Update Sensor Value',
  props<{ sensorId: string; value: { amount: number; unit: string } }>()
);

export const updateSensorValueSuccess = createAction(
  '[Device] Update Sensor Value Success',
  props<{ sensor: Sensor }>()
);

export const updateSensorValueFailure = createAction(
  '[Device] Update Sensor Value Failure',
  props<{ error: string }>()
);
