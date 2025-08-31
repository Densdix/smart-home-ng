import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../store/dashboard.store';
import { ModalService } from '../../services/modal.service';
import { ValidationService } from '../../services/validation.service';
import { Tab } from '../../models/dashboard.models';

@Component({
  selector: 'app-tab-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tab-manager.html',
  styleUrls: ['./tab-manager.css'],
})
export class TabManagerComponent {
  private dashboardStore = inject(DashboardStore);
  private modalService = inject(ModalService);
  private validationService = inject(ValidationService);

  isEditingTab = signal<string | null>(null);
  editingTabTitle = signal('');
  validationErrors = signal<Record<string, string>>({});

  tabs$ = this.dashboardStore.dashboardTabs$;
  isEditMode = this.dashboardStore.isEditMode;

  startEditTab(tab: Tab): void {
    this.isEditingTab.set(tab.id);
    this.editingTabTitle.set(tab.title);
    this.validationErrors.set({});
  }

  cancelEditTab(): void {
    this.isEditingTab.set(null);
    this.editingTabTitle.set('');
    this.validationErrors.set({});
  }

  saveTabTitle(tab: Tab): void {
    const newTitle = this.editingTabTitle().trim();

    if (newTitle === tab.title) {
      this.cancelEditTab();
      return;
    }

    this.tabs$
      .subscribe((tabs) => {
        const existingTitles = tabs
          .filter((t) => t.id !== tab.id)
          .map((t) => t.title);

        const validation = this.validationService.validateTabCreation(
          newTitle,
          existingTitles
        );

        if (!validation.isValid) {
          const errors: Record<string, string> = {};
          validation.errors.forEach((error) => {
            errors[error.field] = error.message;
          });
          this.validationErrors.set(errors);
          return;
        }

        this.dashboardStore.updateTabTitle(tab.id, newTitle);
        this.cancelEditTab();
      })
      .unsubscribe();
  }

  addTab(): void {
    const newTitle = 'Новая вкладка';

    this.tabs$
      .subscribe((tabs) => {
        const existingTitles = tabs.map((t) => t.title);

        let uniqueTitle = newTitle;
        let counter = 1;
        while (existingTitles.includes(uniqueTitle)) {
          uniqueTitle = `${newTitle} ${counter}`;
          counter++;
        }

        this.dashboardStore.addTab(uniqueTitle);
      })
      .unsubscribe();
  }

  removeTab(tabId: string): void {
    this.dashboardStore.removeTab(tabId);
  }

  reorderTab(tabId: string, direction: 'left' | 'right'): void {
    this.dashboardStore.reorderTab(tabId, direction);
  }

  openCardLayout(tabId: string): void {
    this.modalService.showCardLayoutModal(tabId);
  }

  getFieldError(field: string): string | null {
    return this.validationErrors()[field] || null;
  }

  isTabEditing(tabId: string): boolean {
    return this.isEditingTab() === tabId;
  }

  getTabIndex(tab: Tab): number {
    let index = 0;
    this.tabs$
      .subscribe((tabs) => {
        index = tabs.findIndex((t) => t.id === tab.id) + 1;
      })
      .unsubscribe();
    return index;
  }

  trackByTabId(index: number, tab: Tab): string {
    return tab.id;
  }
}
