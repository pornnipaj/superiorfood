import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../post-data.service';
import { StorageService, User } from '../../storage.service';

const TOKEN_KEY = 'auth-token';

@Component({
  selector: 'app-devices-acessory',
  templateUrl: './devices-acessory.page.html',
  styleUrls: ['./devices-acessory.page.scss'],
})
export class DevicesAcessoryPage implements OnInit {
empID;
Data;
DataDetail;
user;
items;
isShowDetail = false;
  constructor(private postDataService:PostDataService,
    private storage:StorageService,
    private storageService: StorageService) {    

      setTimeout(() => {
        this.ngOnInit();
      }, 500);
  }

  ngOnInit() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;               
      }
      console.log(this.empID);  
    });  
    this.loadProduct();
  }

  loadProduct(){
    let params = {
      empID: this.empID,
      type: "Overall",
    }
    console.log(params);
    
    this.postDataService.GetDevice(params).then(list => {
      this.Data = list
      console.log(this.Data);
      
    });
  }
  showDetail(item){
    this.isShowDetail = true;
    let params = {
      empID: this.empID,
      type: "Detail",
      ProductID:item.ProductID
    }
    console.log(params);
    
    this.postDataService.GetDevice(params).then(list => {
      this.DataDetail = list
      console.log(this.DataDetail);      
    });
  }

}
