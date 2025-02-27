import { Component } from '@angular/core';
import { TopBarComponent } from '../../shared/components/top-bar/top-bar.component';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NgIf } from '@angular/common';
import { DividerComponent } from '../../shared/components/divider/divider.component';
import { CalendarCardComponent } from '../../shared/components/calendar-card/calendar-card.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [TopBarComponent, DividerComponent, CalendarCardComponent, NzCalendarModule, NzBadgeModule, NgIf],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

  appointmentDate: Date = new Date();
}
