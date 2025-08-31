import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import * as DashboardActions from '../actions/dashboard.actions';
import { AppState } from '../index';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private dashboardService = inject(DashboardService);
  private store = inject(Store<AppState>);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      switchMap(({ dashboardId }) =>
        this.dashboardService.getDashboardData(dashboardId).pipe(
          map((dashboard) =>
            DashboardActions.loadDashboardSuccess({ dashboard })
          ),
          catchError((error) =>
            of(DashboardActions.loadDashboardFailure({ error: error.message }))
          )
        )
      )
    )
  );

  saveDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.saveDashboard),
      withLatestFrom(
        this.store.select(
          (state: AppState) => state.dashboard.selectedDashboard
        )
      ),
      switchMap(([{ dashboardId }, dashboard]) => {
        if (!dashboard) {
          return of(
            DashboardActions.saveDashboardFailure({
              error: 'No dashboard to save',
            })
          );
        }

        return this.dashboardService
          .updateDashboard(dashboardId, dashboard)
          .pipe(
            map(() => DashboardActions.saveDashboardSuccess()),
            catchError((error) =>
              of(
                DashboardActions.saveDashboardFailure({ error: error.message })
              )
            )
          );
      })
    )
  );
}
