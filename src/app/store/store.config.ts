import { ApplicationConfig } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';

import { reducers } from './reducers';
import { DashboardEffects } from './effects/dashboard.effects';
import { DashboardListEffects } from './effects/dashboard-list.effects';
import { DeviceEffects } from './effects/device.effects';

export const storeConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore(reducers),
    provideEffects([DashboardEffects, DashboardListEffects, DeviceEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
