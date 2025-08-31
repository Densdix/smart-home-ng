import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import * as DashboardListActions from '../actions/dashboard-list.actions';
import { DashboardListService } from '../../services/dashboard-list.service';
import { DashboardInfo } from '../../models/dashboard.models';

@Injectable()
export class DashboardListEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);
  private dashboardListService = inject(DashboardListService);

  loadDashboardList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardListActions.loadDashboardList),
      mergeMap(() =>
        this.dashboardListService.loadDashboards().pipe(
          map((dashboards) =>
            DashboardListActions.loadDashboardListSuccess({ dashboards })
          ),
          catchError((error) =>
            of(
              DashboardListActions.loadDashboardListFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  createDashboardInList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardListActions.createDashboardInList),
      mergeMap(({ dashboardInfo }) =>
        this.dashboardListService.createDashboard(dashboardInfo).pipe(
          map((dashboard: DashboardInfo) =>
            DashboardListActions.createDashboardInListSuccess({ dashboard })
          ),
          catchError((error) =>
            of(
              DashboardListActions.createDashboardInListFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  deleteDashboardFromList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardListActions.deleteDashboardFromList),
      mergeMap(({ dashboardId }) =>
        this.dashboardListService.deleteDashboard(dashboardId).pipe(
          map(() =>
            DashboardListActions.deleteDashboardFromListSuccess({ dashboardId })
          ),
          catchError((error) =>
            of(
              DashboardListActions.deleteDashboardFromListFailure({
                error: error.message,
              })
            )
          )
        )
      )
    )
  );

  navigateAfterCreation$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardListActions.createDashboardInListSuccess),
        tap(() => {
          // This will be handled by the component or router
        })
      ),
    { dispatch: false }
  );

  navigateAfterDeletion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardListActions.deleteDashboardFromListSuccess),
        tap(() => {
          // Navigate to another dashboard or home
          // This will be handled by the component or router
        })
      ),
    { dispatch: false }
  );
}
