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

  //#region data

  calendarPlugins = [dayGridPlugin, interactionPlugin]

  //#endregion

  //#region constructor

  constructor() {
  }

  //#endregion

  //#region start

  ngOnInit() {
  }
  //#endregion

  //#region click

  //#endregion
}

