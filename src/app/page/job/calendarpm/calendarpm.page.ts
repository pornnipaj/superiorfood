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
      this.url = sanitizer.bypassSecurityTrustResourceUrl('https://cors-anywhere.herokuapp.com/http://superior2.wingplusweb.com//Web/WebFormCalendar.aspx' + '?empid=' + this.myempID + '&year=' + this.year + '&month=' + this.month);
    });
  }

  //#endregion

  //#region start
  ngOnInit() {
  }
  //#endregion

}

