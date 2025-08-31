import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { ModalService } from '../../../services/modal.service';
import { DashboardStore } from '../../../store/dashboard.store';
import { Tab } from '../../../models/dashboard.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tab-manager-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tab-manager-modal.html',
  styleUrls: ['./tab-manager-modal.css'],
})
export class TabManagerModalComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private validationService = inject(ValidationService);
  private modalService = inject(ModalService);
  private dashboardStore = inject(DashboardStore);

  isVisible = this.modalService.tabManagerModalVisible;
  isLoading = signal(false);
  editingTabId = signal<string | null>(null);
  validationErrors = signal<Record<string, string>>({});

  addTabForm: FormGroup;
  editTabForm: FormGroup;

  tabs = signal<Tab[]>([]);
  private subscription: Subscription | null = null;

  constructor() {
    this.addTabForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
    });

    this.editTabForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.subscription = this.dashboardStore.dashboardTabs$.subscribe((tabs) => {
      this.tabs.set(tabs);
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onAddTab(): void {
    if (this.addTabForm.invalid) {
      this.markFormGroupTouched(this.addTabForm);
      return;
    }

    const title = this.addTabForm.get('title')?.value;
    const existingTitles = this.tabs().map((tab) => tab.title);

    const validation = this.validationService.validateTabCreation(
      title,
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

    this.modalService.addTab(title);
    this.addTabForm.reset();
    this.validationErrors.set({});
  }

  startEditTab(tab: Tab): void {
    this.editingTabId.set(tab.id);
    this.editTabForm.patchValue({ title: tab.title });
    this.validationErrors.set({});
  }

  onUpdateTab(tabId: string): void {
    if (this.editTabForm.invalid) {
      this.markFormGroupTouched(this.editTabForm);
      return;
    }

    const title = this.editTabForm.get('title')?.value;
    const existingTitles = this.tabs()
      .filter((tab) => tab.id !== tabId)
      .map((tab) => tab.title);

    const validation = this.validationService.validateTabCreation(
      title,
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

    this.modalService.updateTabTitle(tabId, title);
    this.cancelEdit();
  }

  cancelEdit(): void {
    this.editingTabId.set(null);
    this.editTabForm.reset();
    this.validationErrors.set({});
  }

  removeTab(tabId: string): void {
    if (confirm('Вы уверены, что хотите удалить эту вкладку?')) {
      this.modalService.removeTab(tabId);
    }
  }

  hide(): void {
    this.modalService.closeTabManagerModal();
    this.addTabForm.reset();
    this.cancelEdit();
  }

  private markFormGroupTouched(form: FormGroup): void {
    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);
      if (control) {
        control.markAsTouched();
      }
    });
  }

  getFieldError(field: string): string | null {
    return this.validationErrors()[field] || null;
  }

  isFieldInvalid(field: string): boolean {
    const form = this.editingTabId() ? this.editTabForm : this.addTabForm;
    const control = form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  trackByTabId(index: number, tab: Tab): string {
    return tab.id;
  }
}
