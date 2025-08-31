import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { DeviceService } from '../../services/device.service';
import * as DeviceActions from '../actions/device.actions';

@Injectable()
export class DeviceEffects {
  private actions$ = inject(Actions);
  private deviceService = inject(DeviceService);

  toggleDeviceState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.toggleDeviceState),
      switchMap(({ deviceId, newState }) =>
        this.deviceService.updateDeviceState(deviceId, newState).pipe(
          map((device) => DeviceActions.toggleDeviceStateSuccess({ device })),
          catchError((error) =>
            of(
              DeviceActions.toggleDeviceStateFailure({
                deviceId,
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  loadAvailableDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeviceActions.loadAvailableDevices),
      switchMap(() =>
        this.deviceService.getAvailableDevices().pipe(
          map((devices) =>
            DeviceActions.loadAvailableDevicesSuccess({ devices })
          ),
          catchError((error) =>
            of(
              DeviceActions.loadAvailableDevicesFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );
}
