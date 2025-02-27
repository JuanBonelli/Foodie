import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-calendar-card',
  standalone: true,
  imports: [],
  templateUrl: './calendar-card.component.html',
  styleUrl: './calendar-card.component.scss'
})
export class CalendarCardComponent {
  @Input() state : string = '';
}
