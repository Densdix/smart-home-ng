import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ValidationService } from '../../../services/validation.service';
import { ModalService } from '../../../services/modal.service';
import { DashboardListService } from '../../../services/dashboard-list.service';
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
  private validationService = inject(ValidationService);
  private modalService = inject(ModalService);
  private dashboardListService = inject(DashboardListService);

  isVisible = signal(false);
  isLoading = signal(false);
  validationErrors = signal<Record<string, string>>({});

  createForm: FormGroup;
  availableIcons = DASHBOARD_ICONS.map((icon) => ({
    value: icon,
    label: this.getIconLabel(icon),
  }));

  constructor() {
    this.createForm = this.fb.group({
      id: ['', [Validators.required, Validators.maxLength(30)]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      icon: ['home', [Validators.required]],
    });
  }

  show(): void {
    this.isVisible.set(true);
    this.resetForm();
  }

  hide(): void {
    this.modalService.closeCreateDashboardModal();
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

  async onSubmit(): Promise<void> {
    if (this.createForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    const formValue = this.createForm.value;

    const existingDashboards = this.dashboardListService.dashboards();
    const existingIds = existingDashboards.map((d) => d.id);

    if (existingIds.includes(formValue.id)) {
      this.validationErrors.set({ id: 'Дашборд с таким ID уже существует' });
      return;
    }

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

    try {
      await this.modalService.createDashboard(dashboard);
      this.hide();
    } catch (error) {
      console.error('Error creating dashboard:', error);
      this.validationErrors.set({ general: 'Ошибка при создании дашборда' });
    } finally {
      this.isLoading.set(false);
    }
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

  private getIconLabel(icon: string): string {
    const iconLabels: Record<string, string> = {
      home: 'Дом',
      dashboard: 'Дашборд',
      settings: 'Настройки',
      lightbulb: 'Освещение',
      thermostat: 'Температура',
      security: 'Безопасность',
      camera: 'Камера',
      wifi: 'Wi-Fi',
      power: 'Питание',
      water: 'Вода',
      fire: 'Пожарная безопасность',
      medical: 'Медицина',
      car: 'Автомобиль',
      garden: 'Сад',
      kitchen: 'Кухня',
      bedroom: 'Спальня',
      living: 'Гостиная',
      bathroom: 'Ванная',
      garage: 'Гараж',
      office: 'Офис',
    };
    return iconLabels[icon] || icon;
  }
}
