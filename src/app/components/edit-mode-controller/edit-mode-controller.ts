import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
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

  // Signals
  isEditMode$ = this.dashboardStore.isEditMode;
  hasUnsavedChanges$ = this.dashboardStore.hasUnsavedChanges$;
  dashboardLoading$ = this.dashboardStore.dashboardLoading$;
  dashboardError$ = this.dashboardStore.dashboardError$;

  // Computed values
  showSaveButton = computed(
    () => this.isEditMode$() && this.hasUnsavedChanges$()
  );

  showDiscardButton = computed(
    () => this.isEditMode$() && this.hasUnsavedChanges$()
  );

  // Methods
  enterEditMode(): void {
    this.dashboardStore.enterEditMode();
  }

  exitEditMode(): void {
    this.dashboardStore.exitEditMode();
  }

  saveDashboard(): void {
    // Получаем ID текущего дашборда из URL или store
    const currentDashboardId = this.getCurrentDashboardId();
    if (currentDashboardId) {
      this.dashboardStore.saveDashboard(currentDashboardId);
    }
  }

  discardChanges(): void {
    this.dashboardStore.discardChanges();
  }

  createNewDashboard(): void {
    this.modalService.openCreateDashboard();
  }

  private getCurrentDashboardId(): string | null {
    // Здесь должна быть логика получения ID текущего дашборда
    // Пока возвращаем null, так как это будет реализовано позже
    return null;
  }

  getStatusIcon(): string {
    if (this.dashboardLoading$()) return 'hourglass_empty';
    if (this.dashboardError$()) return 'error';
    if (this.isEditMode$()) return 'edit';
    return 'visibility';
  }

  getStatusText(): string {
    if (this.dashboardLoading$()) return 'Загрузка...';
    if (this.dashboardError$()) return 'Ошибка загрузки';
    if (this.isEditMode$()) return 'Режим редактирования';
    return 'Просмотр';
  }

  getStatusColor(): string {
    if (this.dashboardLoading$()) return 'loading';
    if (this.dashboardError$()) return 'error';
    if (this.isEditMode$()) return 'editing';
    return 'viewing';
  }
}
