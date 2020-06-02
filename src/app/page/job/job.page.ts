import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { DatetimeOptions } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { StorageService, User } from '../../storage.service';
import { PostDataService } from '../../post-data.service'
import { Router } from '@angular/router';

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
  type;
  isShow = false;
  //#endregion

  //#region constructor
  constructor(public DataService: AuthServiceService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    public postDataService: PostDataService
  ) {
    this.job = [];
    this.jobdetail = [];
  }
  //#endregion

  //#region click
  click(item) {
    console.log(item.WorkCloseID);
    if (item.JobType == "CM") {
      if (item.WorkCloseID == "WorkClose001") {
        
        
      }else{
      console.log(item);
      let params = {
        data: item,
        newinstallID: item.installnew,
        installID: item.installID,
        tranID:item.tranID,
        planID:item.planID,
        type:item.JobType
      }
      console.log(params);

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(params)
        }
      };
      this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
      console.log("sent", navigationExtras);
    } 
  }
  else {
      console.log(item);
      let params = {
        data: item,
        installID: item.installID,
        tranID:item.tranID,
        planID:item.planID,
        type:item.JobType
      }
      console.log(params);

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(params)
        }
      };
      this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
      console.log("sent", navigationExtras);
    }
  }
  //#endregion

  //#region loaditem
  loadItems() {
    this.month = new Date().getMonth() + 1;
    this.year = new Date().getFullYear();

    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
        // console.log(this.empID, this.month, this.year);

        this.job.empID = this.empID;
        this.job.month = this.month;
        this.job.year = this.year;
        // console.log(this.job);

        this.postDataService.postjob(this.job).then(work => {
          this.jobresolve = work;
          console.log(this.jobresolve)
          if (this.jobresolve == false) {
            this.isShow = true;
          }
          for (let i = 0; i < this.jobresolve.length; i++) {
            this.type = this.jobresolve[i].JobType
          }
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

  //#region next
  next(type) {
    console.log(type);

    if (type == 'pm') {
      this.router.navigate(['/job/reportcheckpm']);
    }

    if (type == 'cm') {
      this.router.navigate(['/job/cm']);
    }

    if (type == 'install') {
      this.router.navigate(['/job/install']);
    }

    if (type == 'uninstall') {

      this.router.navigate(['/job/uninstall']);


    }
  }
  //#endregion
}


