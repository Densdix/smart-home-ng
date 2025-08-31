import { createReducer, on } from '@ngrx/store';
import { initialDeviceState } from '../state/app.state';
import * as DeviceActions from '../actions/device.actions';

export const deviceReducer = createReducer(
  initialDeviceState,

  on(DeviceActions.loadDevices, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices,
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.loadDevicesFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DeviceActions.toggleDeviceState, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.toggleDeviceStateSuccess, (state, { device }) => ({
    ...state,
    devices: state.devices.map((d) =>
      d.id === device.id && d.type === 'device' ? device : d
    ),
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.toggleDeviceStateFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DeviceActions.createDevice, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.createDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: [...state.devices, device],
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.createDeviceFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DeviceActions.updateDevice, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.updateDeviceSuccess, (state, { device }) => ({
    ...state,
    devices: state.devices.map((d) => (d.id === device.id ? device : d)),
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.updateDeviceFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DeviceActions.deleteDevice, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.deleteDeviceSuccess, (state, { deviceId }) => ({
    ...state,
    devices: state.devices.filter((d) => d.id !== deviceId),
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.deleteDeviceFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  })),

  on(DeviceActions.updateSensorValue, (state) => ({
    ...state,
    isLoading: true,
    error: null,
  })),

  on(DeviceActions.updateSensorValueSuccess, (state, { sensor }) => ({
    ...state,
    devices: state.devices.map((d) =>
      d.id === sensor.id && d.type === 'sensor' ? sensor : d
    ),
    isLoading: false,
    error: null,
  })),

  on(DeviceActions.updateSensorValueFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error,
  }))
);
