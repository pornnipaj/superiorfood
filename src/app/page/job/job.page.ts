import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { DatetimeOptions } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService, User } from '../../storage.service';
import { PostDataService } from '../../post-data.service'

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

  //#region data

  data: any;
  empID;
  items
  month;
  year;
  job;
  jobresolve;
  jobdetail;
  //#endregion

  //#region constructor

  constructor(public DataService: AuthServiceService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private storageService: StorageService,
    public postDataService: PostDataService
  ) {
    this.job = [];
this.jobdetail = [];
    // this.getJob();

    //   this.DataService.getJobDetail().subscribe(data => {
    //     this.data = data;
    //   for (let i = 0; i < this.data.length; i++) {
    //     const json = this.data[i].Name;
    //     console.log(json);
    //   }
    // });

  }

  //#endregion

  //#region click

  getJob() {
    this.DataService.getJob().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }

  click(item) {
    console.log(item);
    
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(item)
      }
    };
    this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
    console.log("sent", navigationExtras);
  }

  loadItems() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
        console.log(this.empID, this.month, this.year);

        this.job.empID = "b99f4959-d1e7-44ec-98e2-07a6d0247a6b";
        this.job.month = "1";
        this.job.year = "2016";

        console.log(this.job);

        this.postDataService.postjob(this.job).then(work => {
          this.jobresolve = work;
          console.log(this.jobresolve)
          // for (let i = 0; i < this.jobOverview.length; i++) {
          //   this.workall = this.jobOverview[i].WorkAll;
          //   this.workfinish = this.jobOverview[i].WorkFinish;
          // }
        });

      }
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
    this.loadItems();
    
  }

  //#endregion

}
