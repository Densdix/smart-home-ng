import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { DashboardStore } from '../../store/dashboard.store';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-edit-mode-controller',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-mode-controller.html',
  styleUrls: ['./edit-mode-controller.css'],
})
export class EditModeControllerComponent {
  private dashboardStore = inject(DashboardStore);
  private modalService = inject(ModalService);
  private route = inject(ActivatedRoute);

  isEditMode$ = this.dashboardStore.isEditMode$;
  hasUnsavedChanges$ = this.dashboardStore.hasUnsavedChanges$;
  dashboardLoading$ = this.dashboardStore.dashboardLoading$;
  dashboardError$ = this.dashboardStore.dashboardError$;

  isEditMode = computed(() => {
    let editMode = false;
    this.isEditMode$.subscribe((mode) => (editMode = mode)).unsubscribe();
    return editMode;
  });

  showSaveButton = computed(() => {
    let hasChanges = false;
    this.hasUnsavedChanges$
      .subscribe((changes) => (hasChanges = changes))
      .unsubscribe();
    return this.isEditMode() && hasChanges;
  });

  showDiscardButton = computed(() => {
    let hasChanges = false;
    this.hasUnsavedChanges$
      .subscribe((changes) => (hasChanges = changes))
      .unsubscribe();
    return this.isEditMode() && hasChanges;
  });

  enterEditMode(): void {
    this.dashboardStore.enterEditMode();
  }

  exitEditMode(): void {
    this.dashboardStore.exitEditMode();
  }

  saveDashboard(): void {
    const currentDashboardId = this.getCurrentDashboardId();
    if (currentDashboardId) {
      this.dashboardStore.saveDashboard(currentDashboardId);
    }
  }

  discardChanges(): void {
    this.dashboardStore.discardChanges();
  }

  createNewDashboard(): void {
    this.modalService.showCreateDashboardModal();
  }

  private getCurrentDashboardId(): string | null {
    const params = this.route.snapshot.params;
    return params['dashboardId'] || null;
  }

  getStatusIcon(): string {
    if (this.isEditMode()) return 'edit';
    return 'visibility';
  }

  getStatusText(): string {
    if (this.isEditMode()) return 'Режим редактирования';
    return 'Просмотр';
  }

  getStatusColor(): string {
    if (this.isEditMode()) return 'editing';
    return 'viewing';
  }
}
