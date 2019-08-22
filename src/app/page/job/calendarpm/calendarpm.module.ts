import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CalendarpmPage } from './calendarpm.page';
import { FullCalendarModule } from '@fullcalendar/angular';

const routes: Routes = [
  {
    path: '',
    component: CalendarpmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CalendarpmPage]
})
export class CalendarpmPageModule {}
