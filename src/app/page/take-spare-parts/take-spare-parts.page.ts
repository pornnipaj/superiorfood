import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakePage } from './take/take.page';
import { StorageService, User } from '../../storage.service';
import { PostDataService } from '../../post-data.service';
import { ActivatedRoute } from '@angular/router';

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
  TelCompany;
  EngineerTel;
  AddressSite;
  Reference;
  job;
  Machine;
  ProID;
  JobID;
  list;
  isShow = false;
  myId;
  type;
  item;
  ServiceReportNo;
  JobDeviceID;
  constructor(
    private storageService: StorageService,
    public modalController: ModalController,
    private postDataService: PostDataService,
    private route: ActivatedRoute) {
    this.loadItems()

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.item = this.myId.item
      this.CustomerCode = this.item.CustomerCode
      this.AddressSite = this.item.AddressSite
      this.ServiceReportNo = this.item.ServiceReportNo
      this.TelCompany = this.item.TelCompany
      this.EngineerTel = this.item.EngineerTel
      this.Reference = this.item.Reference
      this.JobID = this.myId.JobID
      this.type = this.myId.type
      this.CusID = this.myId.CusID
      console.log(this.JobID, this.type, this.CusID);
      console.log(this.item, this.ServiceReportNo);

      if (this.type == "edit") {
        let params = {
          JobID: this.JobID,
          Type: "ListDetail",
        }
        this.postDataService.PostCus(params).then(list => {
          this.list = list
          console.log(list);
          this.isShow = true;
        });
      }
    });
  }

  ngOnInit() {
    this.loadItems();
  }


  async ShowSpare() {
    this.spare();
  }

  async spare() {
    const modal = await this.modalController.create({
      component: TakePage,
      componentProps: {
        EmpID: this.empID,
        CusID: this.CusID,
        JobID: this.JobID
      }
    });

    modal.onDidDismiss().then(data => {
      this.JobID = this.JobID.data
      console.log(this.JobID)
    });
    return await modal.present();
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
        this.AddressSite = this.Cus[i].Address;
        this.TelCompany = this.Cus[i].Phone;
        this.loadItems();
      }
    });
  }

  async Edit(item) {
    console.log(item);
    const modal = await this.modalController.create({
      component: TakePage,
      componentProps: {
        JobID: item.JobID,
        JobDeviceID: item.JobDeviceID
      }  
      
    });

    modal.onDidDismiss().then(data => {
      this.JobID = this.JobID.data
      console.log(this.JobID)
    });
    return await modal.present();
  }
}
