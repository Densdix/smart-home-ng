import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CARD_LAYOUTS, CardLayout } from '../../../models/dashboard.models';

@Component({
  selector: 'app-card-layout-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-layout-modal.html',
  styleUrls: ['./card-layout-modal.css'],
})
export class CardLayoutModalComponent {
  isVisible = signal(false);
  selectedLayout = signal<CardLayout | null>(null);

  availableLayouts = [
    {
      id: CARD_LAYOUTS.SINGLE_DEVICE,
      title: 'Одно устройство',
      description: 'Карточка для отображения одного устройства или сенсора',
      icon: 'smart_toy',
    },
    {
      id: CARD_LAYOUTS.HORIZONTAL,
      title: 'Горизонтальный макет',
      description: 'Устройства и сенсоры располагаются в ряд',
      icon: 'view_agenda',
    },
    {
      id: CARD_LAYOUTS.VERTICAL,
      title: 'Вертикальный макет',
      description: 'Устройства и сенсоры располагаются в столбец',
      icon: 'view_list',
    },
  ];

  show(): void {
    this.isVisible.set(true);
    this.selectedLayout.set(null);
  }

  hide(): void {
    this.isVisible.set(false);
    this.selectedLayout.set(null);
  }

  selectLayout(layout: CardLayout): void {
    this.selectedLayout.set(layout);
  }

  confirmSelection(): CardLayout | null {
    const layout = this.selectedLayout();
    this.hide();
    return layout;
  }

  getLayoutIcon(layoutId: string): string {
    return (
      this.availableLayouts.find((l) => l.id === layoutId)?.icon || 'dashboard'
    );
  }
}
