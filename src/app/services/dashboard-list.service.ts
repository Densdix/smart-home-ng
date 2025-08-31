import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { DashboardInfo } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardListService {
  private http = inject(HttpClient);

  private _dashboards = signal<DashboardInfo[]>([]);
  dashboards = this._dashboards.asReadonly();

  private dashboardsSubject = new BehaviorSubject<DashboardInfo[]>([]);
  dashboards$ = this.dashboardsSubject.asObservable();

  constructor() {
    this.loadDashboards();
  }

  loadDashboards(): Observable<DashboardInfo[]> {
    return this.http.get<DashboardInfo[]>('/api/dashboards').pipe(
      tap((dashboards) => {
        this._dashboards.set(dashboards);
        this.dashboardsSubject.next(dashboards);
      })
    );
  }

  createDashboard(dashboard: DashboardInfo): Observable<DashboardInfo> {
    return this.http.post<DashboardInfo>('/api/dashboards', dashboard).pipe(
      tap((newDashboard) => {
        const currentDashboards = this._dashboards();
        this._dashboards.set([...currentDashboards, newDashboard]);
        this.dashboardsSubject.next([...currentDashboards, newDashboard]);
      })
    );
  }

  deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>(`/api/dashboards/${dashboardId}`).pipe(
      tap(() => {
        const currentDashboards = this._dashboards();
        const filteredDashboards = currentDashboards.filter(
          (d) => d.id !== dashboardId
        );
        this._dashboards.set(filteredDashboards);
        this.dashboardsSubject.next(filteredDashboards);
      })
    );
  }

  getDashboardById(id: string): DashboardInfo | undefined {
    return this._dashboards().find((d) => d.id === id);
  }

  getFirstDashboard(): DashboardInfo | undefined {
    const dashboards = this._dashboards();
    return dashboards.length > 0 ? dashboards[0] : undefined;
  }

  refreshDashboards(): void {
    this.loadDashboards().subscribe();
  }
}
