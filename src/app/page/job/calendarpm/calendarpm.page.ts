import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

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
  str = "123";
  items;
  myempID;
  url: SafeResourceUrl;
  link;
  @ViewChild("fullcalendar", { static: true }) fullcalendar: FullCalendarComponent;
  @ViewChild("external", { static: true }) external: ElementRef;
  sanitizer: DomSanitizer;
  //#endregion

  //#region constructor

  constructor(private postDataService: PostDataService,
    private storageService: StorageService,
    sanitizer: DomSanitizer) {

    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.myempID = this.items[i].empID;
        console.log(this.myempID);
      }
      const month = new Date().getMonth() + 1;
      const year = new Date().getFullYear();

      this.myempID = this.myempID
      this.month = month
      this.year = year
      this.url = sanitizer.bypassSecurityTrustResourceUrl('http://superior.wingplusweb.com/Web/WebFormCalendar.aspx' + '?empid=' + this.myempID + '&year=' + this.year + '&month=' + this.month);
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
    // Don't use FullcalendarOption interface
    // this.options = {
    //   editable: true,      
    //   theme: 'standart', // default view, may be bootstrap

    //   // add other plugins
    //   plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
    // }


    // this.postDataService.postPlan(this.calendar).then(plan => {
    //   this.data = plan;
    //   console.log('data',this.data)
    //   this.eventsModel += "[";
    //   for (let a = 0; a < this.data.length; a++) {        
    //     this.eventsModel += '{title: "' + this.data[a].customername + '", date: "' + this.data[a].service_date_plan + '"},';
    //   }
    //   this.eventsModel = this.eventsModel.substring(0, this.eventsModel.length - 1);
    //   this.eventsModel += "]";
    //   console.log('test',this.eventsModel);
    // });

    // this.date = [{
    //   title: 'ยาโยอิ บิ๊กซี บางพลี',
    //   date: '2019-09-02'
    // },
    // {
    //   title: 'ยาโยอิ บิ๊กซี บางพลี',
    //   date: '2019-09-05'
    // }];
    // console.log('date', this.date);


  }
  //#endregion

  //#region click

  //#endregion
}

