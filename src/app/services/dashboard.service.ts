import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardData } from '../models/dashboard.models';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);

  getDashboardData(dashboardId: string): Observable<DashboardData> {
    return this.http.get<DashboardData>(`/api/dashboards/${dashboardId}`);
  }
}
