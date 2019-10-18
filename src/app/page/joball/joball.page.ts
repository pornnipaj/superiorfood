import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ListpmPage } from '../joball/listpm/listpm.page';
import { from } from 'rxjs';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PostDataService } from '../../post-data.service';
import { StorageService } from '../../storage.service'
@Component({
  selector: 'app-joball',
  templateUrl: './joball.page.html',
  styleUrls: ['./joball.page.scss'],
})
export class JoballPage implements OnInit {

  //#region data

  data: any;
  
  empid: any;
  emp;
  items
  empID;
  //#endregion
  
  //#region constructor

  @ViewChild(NavController, { static: false }) myNav;

  constructor(public DataService: AuthServiceService, 
    public navCtrl: NavController,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.emp = [];

      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          console.log(this.empID);
        }
        this.emp.empid = this.empID;
      console.log(this.emp);
  
      this.postDataService.postEmployee(this.emp).then(work => {
        this.data = work;
        console.log(this.data);
      });
      });

      
  }

  //#endregion

  //#region click

  click(data) {
    console.log(data);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data)
      }
    };
    this.navCtrl.navigateForward(['/joball/listpm'], navigationExtras);
    console.log("sent", navigationExtras);
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion
  
}