import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../../post-data.service';
import { StorageService, User } from '../../../storage.service';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sparelist',
  templateUrl: './sparelist.page.html',
  styleUrls: ['./sparelist.page.scss'],
})
export class SparelistPage implements OnInit {
  empID;
  list;
  constructor(private postDataService: PostDataService,
    private storageService: StorageService, 
    public navCtrl: NavController) { }

  ngOnInit() {
    this.load();
  }

  load() {
    this.storageService.getUser().then(items => {
      for (let i = 0; i < items.length; i++) {
        this.empID = items[i].empID;
      }

      let params =
      {
        EmpID: this.empID,
        Type: "List",
      }
      this.postDataService.PostCus(params).then(list => {
        this.list = list
        console.log(list);
      });
    });
  }
  Detail(item){
    console.log(item);
    
    let params = {
      JobID: item.JobID,
      type: "edit",
      CusID: item.CustomerID,
      item: item
    }
    console.log(params);

    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(params)
      }
    };
    console.log(navigationExtras);
    this.navCtrl.navigateForward(['take-spare-parts'], navigationExtras);
  }
  NewSpare(){
    this.navCtrl.navigateForward(['take-spare-parts']);
  }
}

