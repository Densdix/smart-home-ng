import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import * as DeviceActions from '../actions/device.actions';
import * as DashboardActions from '../actions/dashboard.actions';
import { DeviceService } from '../../services/device.service';
import { Device, Sensor } from '../../models/dashboard.models';

@Injectable()
export class DeviceEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);
  private deviceService = inject(DeviceService);

  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.loadDevices),
      mergeMap(() =>
        this.deviceService.getAvailableDevices().pipe(
          map((devices) => DeviceActions.loadDevicesSuccess({ devices })),
          catchError((error) =>
            of(DeviceActions.loadDevicesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  toggleDeviceState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.toggleDeviceState),
      withLatestFrom(this.store.select((state) => state.device.devices)),
      mergeMap(([{ deviceId, newState }, devices]) => {
        const device = devices.find(
          (d: Device | Sensor) => d.id === deviceId && d.type === 'device'
        ) as Device;
        if (!device) {
          return of(
            DeviceActions.toggleDeviceStateFailure({
              error: 'Device not found',
            })
          );
        }

        return this.deviceService.updateDeviceState(deviceId, newState).pipe(
          map((updatedDevice: Device) =>
            DeviceActions.toggleDeviceStateSuccess({ device: updatedDevice })
          ),
          catchError((error) =>
            of(DeviceActions.toggleDeviceStateFailure({ error: error.message }))
          )
        );
      })
    )
  );

  syncDeviceWithDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.toggleDeviceStateSuccess),
      map(({ device }) =>
        DashboardActions.syncDeviceStateInDashboard({
          deviceId: device.id,
          newState: device.state,
        })
      )
    )
  );
}
