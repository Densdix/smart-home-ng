import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom, tap } from 'rxjs/operators';
import { AppState } from '../state/app.state';
import * as DashboardActions from '../actions/dashboard.actions';
import * as DashboardListActions from '../actions/dashboard-list.actions';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardListService } from '../../services/dashboard-list.service';
import { DashboardData, DashboardInfo } from '../../models/dashboard.models';

@Injectable()
export class DashboardEffects {
  private actions$ = inject(Actions);
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private dashboardListService = inject(DashboardListService);

  loadDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.loadDashboard),
      mergeMap(({ dashboardId }) =>
        this.dashboardService.getDashboardData(dashboardId).pipe(
          map((dashboard: DashboardData) =>
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
        this.store.select((state) => state.dashboard.selectedDashboard)
      ),
      mergeMap(([{ dashboardId }, dashboard]) => {
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
            map(() => DashboardActions.saveDashboardSuccess({ dashboard }))
          );
      }),
      catchError((error) =>
        of(DashboardActions.saveDashboardFailure({ error: error.message }))
      )
    )
  );

  createDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.createDashboard),
      mergeMap(({ dashboardInfo }) =>
        this.dashboardService.createDashboard(dashboardInfo).pipe(
          map((dashboardInfo: DashboardInfo) => {
            const emptyDashboard: DashboardData = {
              tabs: [],
            };

            this.store.dispatch(
              DashboardListActions.createDashboardInListSuccess({
                dashboard: dashboardInfo,
              })
            );

            return DashboardActions.createDashboardSuccess({
              dashboard: emptyDashboard,
              dashboardId: dashboardInfo.id,
            });
          }),
          catchError((error) =>
            of(
              DashboardActions.createDashboardFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  navigateToCreatedDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.createDashboardSuccess),
        tap(({ dashboardId }) => {
          this.router.navigate(['/dashboard', dashboardId, 'overview']);
        })
      ),
    { dispatch: false }
  );

  deleteDashboard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DashboardActions.deleteDashboard),
      mergeMap(({ dashboardId }) =>
        this.dashboardService.deleteDashboard(dashboardId).pipe(
          map(() => {
            this.store.dispatch(
              DashboardListActions.deleteDashboardFromListSuccess({
                dashboardId,
              })
            );

            return DashboardActions.deleteDashboardSuccess({ dashboardId });
          }),
          catchError((error) =>
            of(
              DashboardActions.deleteDashboardFailure({ error: error.message })
            )
          )
        )
      )
    )
  );

  navigateAfterDeletion$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(DashboardActions.deleteDashboardSuccess),
        withLatestFrom(
          this.store.select((state) => state.dashboardList.dashboards)
        ),
        tap(([, dashboards]) => {
          if (dashboards.length > 0) {
            const firstDashboard = dashboards[0];
            this.router.navigate(['/dashboard', firstDashboard.id, 'overview']);
          } else {
            this.router.navigate(['/dashboard']);
          }
        })
      ),
    { dispatch: false }
  );

  syncDashboardList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        DashboardActions.saveDashboardSuccess,
        DashboardActions.createDashboardSuccess,
        DashboardActions.deleteDashboardSuccess
      ),
      map(() => DashboardListActions.loadDashboardList())
    )
  );
}
