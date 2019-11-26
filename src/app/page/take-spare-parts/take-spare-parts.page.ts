import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakePage } from './take/take.page';
import { StorageService, User } from '../../storage.service';
import { PostDataService } from '../../post-data.service';
@Component({
  selector: 'app-take-spare-parts',
  templateUrl: './take-spare-parts.page.html',
  styleUrls: ['./take-spare-parts.page.scss'],
})

export class TakeSparePartsPage implements OnInit {
  myDate: String = new Date().toISOString();
  isShowSpare = false;
  CustomerCode;
  CustomerName;
  empID;
  Cus;
  CusID;
  name;
  Phone;
  Address;
  Remark;
  job;
  Machine;
  ProID;
  JobID;
  list;

  constructor(
    private storageService: StorageService,
    public modalController: ModalController,
    private postDataService: PostDataService) {
    this.loadItems()
  }

  ngOnInit() {
    this.loadItems();
  }


  async ShowSpare() {
    let params = {
      EmpID: this.empID,
      CusID: this.CusID,
      Type: "Job",
      ProID: this.ProID,
      JobID: this.JobID
    }
    this.postDataService.PostCus(params).then(list => {
      this.JobID = list;
      console.log(list);
      this.spare();
    });
    
  }

  async spare(){
    const modal = await this.modalController.create({
      component: TakePage,
      componentProps: {
        EmpID: this.empID,
        CusID: this.CusID,
        ProID: this.ProID,
        JobID: this.JobID
      }
    });

    modal.onDidDismiss().then(data => {
    });
    return await modal.present();
  }


  getProId(value) {
    this.ProID = value.detail.value;
    console.log(this.ProID);    

  }

  loadItems() {
    this.storageService.getUser().then(items => {
      for (let i = 0; i < items.length; i++) {
        this.empID = items[i].empID;
        this.name = items[i].name;
      }
      let params = {
        EmpID: this.empID,
        Type: "Customer"
      }
      this.postDataService.PostCus(params).then(Cus => {
        this.Cus = Cus;
      });
    });

    let params = {
      Type: "Machine",
    }
    this.postDataService.PostCus(params).then(Machine => {
      this.Machine = Machine;
    });    
  }

  onChange(value) {
    this.CusID = value.detail.value
    let params = {
      CusID: this.CusID,
      Type: "Detail"
    }
    this.postDataService.PostCus(params).then(Cus => {
      this.Cus = Cus;
      for (let i = 0; i < this.Cus.length; i++) {
        this.CustomerCode = this.Cus[i].CustomerCode;
        this.Address = this.Cus[i].Address;
        this.Phone = this.Cus[i].Phone;
        this.loadItems();
      }
    });    
  }
}
