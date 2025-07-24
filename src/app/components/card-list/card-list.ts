import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from '../../models/dashboard.models';
import { CardComponent } from '../card/card';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './card-list.html',
  styleUrl: './card-list.css',
})
export class CardListComponent {
  @Input() cards: Card[] = [];

  trackByCardId(index: number, card: Card): string {
    return card.id;
  }
}
