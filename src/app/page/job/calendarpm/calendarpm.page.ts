import { Component, OnInit } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendarpm',
  templateUrl: './calendarpm.page.html',
  styleUrls: ['./calendarpm.page.scss'],
})
export class CalendarpmPage implements OnInit {
  calendarPlugins = [dayGridPlugin ,interactionPlugin]

  constructor() {  
  }


  ngOnInit() {
  }

}

