import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData, DashboardInfo } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboardData(dashboardId: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`/api/dashboards/${dashboardId}`);
  }

  createDashboard(dashboard: DashboardInfo): Observable<DashboardInfo> {
    return this.http.post<DashboardInfo>('/api/dashboards', dashboard);
  }

  updateDashboard(
    dashboardId: string,
    dashboard: DashboardData
  ): Observable<void> {
    return this.http.put<void>(`/api/dashboards/${dashboardId}`, dashboard);
  }

  deleteDashboard(dashboardId: string): Observable<void> {
    return this.http.delete<void>(`/api/dashboards/${dashboardId}`);
  }

  getDashboardList(): Observable<DashboardInfo[]> {
    return this.http.get<DashboardInfo[]>('/api/dashboards');
  }
}
