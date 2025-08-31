import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../store/dashboard.store';
import { ModalService } from '../../services/modal.service';
import { ValidationService } from '../../services/validation.service';
import { Card, Tab } from '../../models/dashboard.models';

@Component({
  selector: 'app-card-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-manager.html',
  styleUrls: ['./card-manager.css'],
})
export class CardManagerComponent {
  private dashboardStore = inject(DashboardStore);
  private modalService = inject(ModalService);
  private validationService = inject(ValidationService);

  isEditingCard = signal<string | null>(null);
  editingCardTitle = signal('');
  validationErrors = signal<Record<string, string>>({});

  tabs$ = this.dashboardStore.dashboardTabs$;
  isEditMode = this.dashboardStore.isEditMode;

  startEditCard(card: Card): void {
    this.isEditingCard.set(card.id);
    this.editingCardTitle.set(card.title || '');
    this.validationErrors.set({});
  }

  cancelEditCard(): void {
    this.isEditingCard.set(null);
    this.editingCardTitle.set('');
    this.validationErrors.set({});
  }

  saveCardTitle(card: Card, tabId: string): void {
    const newTitle = this.editingCardTitle().trim();

    if (newTitle === card.title) {
      this.cancelEditCard();
      return;
    }

    const validation = this.validationService.validateCardTitle(newTitle);

    if (!validation.isValid) {
      const errors: Record<string, string> = {};
      validation.errors.forEach((error) => {
        errors[error.field] = error.message;
      });
      this.validationErrors.set(errors);
      return;
    }

    this.dashboardStore.updateCardTitle(tabId, card.id, newTitle);
    this.cancelEditCard();
  }

  removeCard(tabId: string, cardId: string): void {
    this.dashboardStore.removeCard(tabId, cardId);
  }

  reorderCard(tabId: string, cardId: string, newIndex: number): void {
    this.dashboardStore.reorderCard(tabId, cardId, newIndex);
  }

  openCardContent(tabId: string, cardId: string): void {
    let currentCard: import('../../models/dashboard.models').Card | null = null;
    this.tabs$
      .subscribe((tabs) => {
        const tab = tabs.find((t) => t.id === tabId);
        if (tab) {
          currentCard = tab.cards.find((c) => c.id === cardId) || null;
        }
      })
      .unsubscribe();

    if (currentCard) {
      this.modalService.showCardContentModal(currentCard, tabId);
    }
  }

  getFieldError(field: string): string | null {
    return this.validationErrors()[field] || null;
  }

  isCardEditing(cardId: string): boolean {
    return this.isEditingCard() === cardId;
  }

  getCardIndex(card: Card, tab: Tab): number {
    return tab.cards.findIndex((c) => c.id === card.id) + 1;
  }

  trackByCardId(index: number, card: Card): string {
    return card.id;
  }

  trackByTabId(index: number, tab: Tab): string {
    return tab.id;
  }

  getLayoutIcon(layout: string): string {
    switch (layout) {
      case 'singleDevice':
        return 'smart_toy';
      case 'horizontalLayout':
        return 'view_agenda';
      case 'verticalLayout':
        return 'view_list';
      default:
        return 'dashboard';
    }
  }

  getLayoutLabel(layout: string): string {
    switch (layout) {
      case 'singleDevice':
        return 'Одно устройство';
      case 'horizontalLayout':
        return 'Горизонтальный';
      case 'verticalLayout':
        return 'Вертикальный';
      default:
        return 'Неизвестно';
    }
  }
}
