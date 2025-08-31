import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardListService } from '../../../services/dashboard-list.service';
import { ValidationService } from '../../../services/validation.service';
import {
  DashboardInfo,
  DASHBOARD_ICONS,
} from '../../../models/dashboard.models';

@Component({
  selector: 'app-create-dashboard-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-dashboard-modal.html',
  styleUrls: ['./create-dashboard-modal.css'],
})
export class CreateDashboardModalComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private dashboardListService = inject(DashboardListService);
  private validationService = inject(ValidationService);

  isVisible = signal(false);
  isLoading = signal(false);
  validationErrors = signal<Record<string, string>>({});

  createForm: FormGroup;
  availableIcons = DASHBOARD_ICONS;

  constructor() {
    this.createForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.maxLength(30),
          Validators.pattern(/^[\w-]+$/),
        ],
      ],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['home', [Validators.required]],
    });
  }

  show(): void {
    this.isVisible.set(true);
    this.resetForm();
  }

  hide(): void {
    this.isVisible.set(false);
    this.resetForm();
  }

  private resetForm(): void {
    this.createForm.reset({
      id: '',
      title: '',
      icon: 'home',
    });
    this.validationErrors.set({});
  }

  onSubmit(): void {
    if (this.createForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.createForm.value;
    const validation = this.validationService.validateDashboardCreation(
      formValue.id,
      formValue.title,
      formValue.icon
    );

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errors[error.field] = error.message;
      });
      this.validationErrors.set(errors);
      return;
    }

    this.isLoading.set(true);
    const dashboard: DashboardInfo = {
      id: formValue.id,
      title: formValue.title,
      icon: formValue.icon,
    };

    this.dashboardListService.createDashboard(dashboard).subscribe({
      next: () => {
        this.hide();
        this.router.navigate(['/dashboard', dashboard.id, 'main']);
      },
      error: (error) => {
        console.error('Error creating dashboard:', error);
        this.validationErrors.set({ general: 'Ошибка при создании дашборда' });
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  private markFormGroupTouched(): void {
    Object.keys(this.createForm.controls).forEach((key) => {
      const control = this.createForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(field: string): string | null {
    return this.validationErrors()[field] || null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.createForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
