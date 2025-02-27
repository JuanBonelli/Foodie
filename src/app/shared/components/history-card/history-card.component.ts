import { Component, Input, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroCalendar } from '@ng-icons/heroicons/outline';
import { Product } from '../../../types/types';

@Component({
  selector: 'app-history-card',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './history-card.component.html',
  styleUrl: './history-card.component.scss',
  providers: [
    provideIcons({
      heroCalendar,
    }),
  ],
})
export class HistoryCardComponent  {

  @Input() name: string = '';
  @Input() imageUrl: string = '';

}
