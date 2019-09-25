import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PostDataService } from '../../../post-data.service';

@Component({
  selector: 'app-calendarpm',
  templateUrl: './calendarpm.page.html',
  styleUrls: ['./calendarpm.page.scss'],
})

export class CalendarpmPage implements OnInit {

  //#region data

  data;
  calendarPlugins = [dayGridPlugin, interactionPlugin]
  calendar;
  empID;
  month;
  year;
  customername;
  options: any;
  eventsModel: any;
  date;
  @ViewChild("fullcalendar", { static: true }) fullcalendar: FullCalendarComponent;
  @ViewChild("external", { static: true }) external: ElementRef;

  //#endregion

  //#region constructor

  constructor(private postDataService: PostDataService) {

    this.eventsModel = [];
    this.calendar = [];
    this.calendar.empID = '15eb4290-7426-446b-9ab9-acf68b467e72';
    this.calendar.month = 8;
    this.calendar.year = 2019;

    // console.log(this.calendar);

    this.postDataService.postPlan(this.calendar).then(plan => {
      this.data = plan;
      console.log('data',this.data)
      // for (let i = 0; i < this.data.length; i++) {
      //   this.customername =  this.data[i];
      //   this.date = this.data[i].service_date_plan
      // }

      for (let a = 0; a < this.data.length; a++) {
        this.eventsModel.title += this.data[a].customername;
        this.eventsModel.date += this.data[a].service_date_plan;
      }
  
      console.log('eventsModel',this.eventsModel);
      });

    
  }

  //#endregion

  //#region start

  ngOnInit() {
    // Don't use FullcalendarOption interface
    this.options = {
      editable: true,      
      theme: 'standart', // default view, may be bootstrap
      
      // add other plugins
      plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    }

    
    
    // this.eventsModel = [{
    //   title: 'ยาโยอิ บิ๊กซี บางพลี',
    //   date: '2019-09-02'
    // }];
    
  }
  //#endregion

  //#region click

  //#endregion
}

