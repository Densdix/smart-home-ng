import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeviceState } from '../state/app.state';

// Feature Selector
export const selectDeviceState = createFeatureSelector<DeviceState>('device');

// Basic Selectors
export const selectDevices = createSelector(
  selectDeviceState,
  (state) => state.devices
);

export const selectDeviceLoading = createSelector(
  selectDeviceState,
  (state) => state.isLoading
);

export const selectDeviceError = createSelector(
  selectDeviceState,
  (state) => state.error
);

// Specific Device Selectors
export const selectDeviceById = (deviceId: string) =>
  createSelector(selectDevices, (devices) =>
    devices.find((device) => device.id === deviceId)
  );

export const selectDevicesByType = (type: 'device' | 'sensor') =>
  createSelector(selectDevices, (devices) =>
    devices.filter((device) => device.type === type)
  );

export const selectActiveDevices = createSelector(selectDevices, (devices) =>
  devices.filter((device) => device.type === 'device' && device.state === true)
);

export const selectDeviceCount = createSelector(
  selectDevices,
  (devices) => devices.filter((device) => device.type === 'device').length
);

export const selectSensorCount = createSelector(
  selectDevices,
  (devices) => devices.filter((device) => device.type === 'sensor').length
);

export const selectTotalItems = createSelector(
  selectDevices,
  (devices) => devices.length
);
