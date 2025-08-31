import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DeviceService } from '../../../services/device.service';
import { ValidationService } from '../../../services/validation.service';
import { ModalService } from '../../../services/modal.service';
import {
  Card,
  CardItem,
  Device,
  Sensor,
} from '../../../models/dashboard.models';

@Component({
  selector: 'app-card-content-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './card-content-modal.html',
  styleUrls: ['./card-content-modal.css'],
})
export class CardContentModalComponent {
  private fb = inject(FormBuilder);
  private deviceService = inject(DeviceService);
  private validationService = inject(ValidationService);
  private modalService = inject(ModalService);

  isVisible = signal(false);
  isLoading = signal(false);
  availableDevices = signal<(Device | Sensor)[]>([]);
  validationErrors = signal<Record<string, string>>({});

  editForm: FormGroup;
  currentCard: Card | null = null;

  hasItems = computed(() => (this.currentCard?.items?.length ?? 0) > 0);

  constructor() {
    this.editForm = this.fb.group({
      title: ['', [Validators.maxLength(50)]],
      selectedItemId: [''],
    });
  }

  show(card: Card): void {
    this.currentCard = card;
    this.isVisible.set(true);
    this.loadAvailableDevices();
    this.editForm.patchValue({
      title: card.title || '',
      selectedItemId: '',
    });
  }

  hide(): void {
    this.modalService.closeCardContent();
    this.isVisible.set(false);
    this.currentCard = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.editForm.reset({
      title: '',
      selectedItemId: '',
    });
    this.validationErrors.set({});
  }

  private loadAvailableDevices(): void {
    this.isLoading.set(true);
    this.deviceService.getAvailableDevices().subscribe({
      next: (devices) => {
        this.availableDevices.set(devices);
      },
      error: (error) => {
        console.error('Error loading devices:', error);
        this.validationErrors.set({ general: 'Ошибка при загрузке устройств' });
      },
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  updateCardTitle(): void {
    if (!this.currentCard) return;

    const title = this.editForm.get('title')?.value;
    const validation = this.validationService.validateCardTitle(title);

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errors[error.field] = error.message;
      });
      this.validationErrors.set(errors);
      return;
    }

    const tabId = this.modalService.getCurrentTabId();
    const cardId = this.modalService.getCurrentCardId();

    if (tabId && cardId) {
      // Здесь будет вызов action для обновления заголовка карточки
      // this.dashboardStore.updateCardTitle(tabId, cardId, title);
      this.validationErrors.set({});
    }
  }

  addItemToCard(): void {
    if (!this.currentCard) return;

    const selectedItemId = this.editForm.get('selectedItemId')?.value;
    if (!selectedItemId) {
      this.validationErrors.set({
        selectedItemId: 'Выберите устройство или сенсор',
      });
      return;
    }

    const selectedItem = this.availableDevices().find(
      (item) => item.id === selectedItemId
    );
    if (!selectedItem) {
      this.validationErrors.set({
        selectedItemId: 'Выбранный элемент не найден',
      });
      return;
    }

    const tabId = this.modalService.getCurrentTabId();
    const cardId = this.modalService.getCurrentCardId();

    if (tabId && cardId) {
      // Здесь будет вызов action для добавления элемента в карточку
      // this.dashboardStore.addItemToCard(tabId, cardId, selectedItem);
      this.editForm.patchValue({ selectedItemId: '' });
      this.validationErrors.set({});
    }
  }

  removeItemFromCard(itemId: string): void {
    if (!this.currentCard) return;

    const tabId = this.modalService.getCurrentTabId();
    const cardId = this.modalService.getCurrentCardId();

    if (tabId && cardId) {
      // Здесь будет вызов action для удаления элемента из карточки
      // this.dashboardStore.removeItemFromCard(tabId, cardId, itemId);
    }
  }

  getFieldError(field: string): string | null {
    return this.validationErrors()[field] || null;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.editForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getItemIcon(item: CardItem): string {
    return item.icon;
  }

  getItemLabel(item: CardItem): string {
    return item.label;
  }

  getItemValue(item: CardItem): string {
    if (item.type === 'sensor') {
      return `${item.value.amount} ${item.value.unit}`;
    }
    return item.type === 'device'
      ? item.state
        ? 'Включено'
        : 'Выключено'
      : '';
  }

  getItemTypeLabel(item: CardItem): string {
    return item.type === 'device' ? 'Устройство' : 'Сенсор';
  }
}
