import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap, of } from 'rxjs';

import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { DashboardStore } from '../store/dashboard.store';
import { DashboardListService } from '../services/dashboard-list.service';
import { DashboardData, Tab } from '../models/dashboard.models';
import { CardListComponent } from '../components/card-list/card-list';
import { DashboardEditorComponent } from '../components/dashboard-editor/dashboard-editor';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardListComponent, DashboardEditorComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dashboardService = inject(DashboardService);
  private authService = inject(AuthService);
  private dashboardStore = inject(DashboardStore);
  private dashboardListService = inject(DashboardListService);

  dashboardData = signal<DashboardData | null>(null);
  activeTab = signal<Tab | null>(null);
  currentDashboardId = signal<string>('');
  currentTabId = signal<string>('');
  isLoading = signal<boolean>(true);
  error = signal<string | null>(null);

  selectedDashboard$ = this.dashboardStore.selectedDashboard$;
  isEditMode$ = this.dashboardStore.isEditMode$;

  private subscriptions = new Subscription();

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.params
        .pipe(
          switchMap((params) => {
            const dashboardId = params['dashboardId'];
            const tabId = params['tabId'];

            if (!dashboardId || !tabId) {
              return this.redirectToFirstAvailable();
            }

            this.currentDashboardId.set(dashboardId);
            this.currentTabId.set(tabId);
            this.isLoading.set(true);
            this.error.set(null);

            this.dashboardStore.loadDashboard(dashboardId);

            return this.dashboardService.getDashboardData(dashboardId);
          })
        )
        .subscribe({
          next: (data) => {
            if (data) {
              this.dashboardData.set(data);
              this.updateActiveTab();
              this.isLoading.set(false);
            }
          },
          error: (error) => {
            console.error('Failed to load dashboard data:', error);
            this.error.set('Failed to load dashboard data.');
            this.isLoading.set(false);
          },
        })
    );

    this.subscriptions.add(
      this.selectedDashboard$.subscribe((dashboard) => {
        if (dashboard) {
          this.dashboardData.set(dashboard);
          this.updateActiveTab();
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private redirectToFirstAvailable() {
    return this.authService.getDashboards().pipe(
      switchMap((dashboards) => {
        if (dashboards.length === 0) {
          this.error.set('No dashboards available.');
          this.isLoading.set(false);
          return of(null);
        }

        const firstDashboard = dashboards[0];
        return this.dashboardService.getDashboardData(firstDashboard.id).pipe(
          switchMap((data) => {
            if (data.tabs.length === 0) {
              this.error.set('No tabs available in dashboard.');
              this.isLoading.set(false);
              return of(null);
            }

            const firstTab = data.tabs[0];
            this.router.navigate(
              ['/dashboard', firstDashboard.id, firstTab.id],
              { replaceUrl: true }
            );
            return of(data);
          })
        );
      })
    );
  }

  private updateActiveTab(): void {
    const data = this.dashboardData();
    const currentTabId = this.currentTabId();

    if (!data || !currentTabId) {
      this.activeTab.set(null);
      return;
    }

    const tab = data.tabs.find((t) => t.id === currentTabId);
    if (!tab && data.tabs.length > 0) {
      const firstTab = data.tabs[0];
      this.router.navigate(
        ['/dashboard', this.currentDashboardId(), firstTab.id],
        { replaceUrl: true }
      );
      return;
    }

    this.activeTab.set(tab || null);
  }

  setActiveTab(tabId: string): void {
    this.router.navigate(['/dashboard', this.currentDashboardId(), tabId]);
  }

  getCurrentDashboardTitle(): string {
    const dashboardId = this.currentDashboardId();
    const dashboard = this.dashboardListService.getDashboardById(dashboardId);
    return dashboard?.title || 'Dashboard';
  }

  enterEditMode(): void {
    this.dashboardStore.enterEditMode();
  }

  confirmDeleteDashboard(): void {
    const dashboardTitle = this.getCurrentDashboardTitle();
    const confirmed = confirm(
      `Вы уверены, что хотите удалить дашборд "${dashboardTitle}"?`
    );

    if (confirmed) {
      this.deleteDashboard();
    }
  }

  private deleteDashboard(): void {
    const dashboardId = this.currentDashboardId();

    this.dashboardStore.deleteDashboard(dashboardId);
  }
}
