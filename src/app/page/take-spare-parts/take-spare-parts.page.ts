import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TakePage } from './take/take.page';
import { StorageService, User } from '../../storage.service';
import { PostDataService } from '../../post-data.service';
import { ActivatedRoute } from '@angular/router';
import { TakeNewPage } from '../take-spare-parts/take-new/take-new.page';
import { NavigationExtras } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-take-spare-parts',
  templateUrl: './take-spare-parts.page.html',
  styleUrls: ['./take-spare-parts.page.scss'],
})

export class TakeSparePartsPage implements OnInit {

  myDate: String = new Date().toISOString();
  isShowSpare = false;
  cus;
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
  Status;
  ServiceReportNo;
  JobDeviceID;

  constructor(
    private storageService: StorageService,
    public modalController: ModalController,
    private postDataService: PostDataService,
    private navCtrl: NavController,
    public alertController: AlertController,
    private route: ActivatedRoute) {
    this.loadItems()

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);      
      this.type = this.myId.type
      if (this.type == "new") {
        this.type = this.myId.type
        console.log(this.type);
        
      }else{
        this.item = this.myId.item
      this.CustomerCode = this.item.CustomerCode
      this.CustomerName = this.item.CustomerName
      this.AddressSite = this.item.AddressSite
      this.ServiceReportNo = this.item.ServiceReportNo
      this.Status = this.item.Status
      this.TelCompany = this.item.TelCompany
      this.EngineerTel = this.item.EngineerTel
      this.Reference = this.item.Reference
      this.JobID = this.myId.JobID
      this.CusID = this.myId.CusID
      console.log(this.JobID, this.type, this.CusID);
      console.log(this.item);
      }  
    });
  }

  ngOnInit() {
    if (this.type == "edit") {
      let params = {
        JobID: this.JobID,
        Type: "ListDetail",
      }
      this.postDataService.PostCus(params).then(list => {
        this.list = list
        console.log(list);
        if (this.list != null) {
          this.isShow = true;
          this.JobID = this.JobID
        }
      });
    }
    else if (this.type == "new") {     
      let params = {
        JobID: this.JobID,
        Type: "ListDetail",
      }
      this.postDataService.PostCus(params).then(list => {
        this.list = list
        console.log(list);
        if (this.list != null) {
          this.list = list
          this.isShow = true;
          this.JobID = this.JobID
        }
      });
    }
      this.loadItems();
  }

  async spare() {
    const modal = await this.modalController.create({
      component: TakeNewPage,
      componentProps: {
        EmpID: this.empID,
        CusID: this.CusID,
        JobID: this.JobID,
        Reference: this.Reference,
        EngineerTel: this.EngineerTel
      }
    });

    modal.onDidDismiss().then(data => {
      this.JobID = data
      this.JobID = this.JobID.data
      console.log(this.JobID)
      if (this.JobID != null) {
        if (this.type == "new") {
          let params = {
            JobID: this.JobID,
            Type: "ListNew",
          }
          this.postDataService.PostCus(params).then(list => {
            this.cus = list
            console.log(list);
            if (this.cus != null) {
              this.isShow = true;
              for (let i = 0; i < this.cus.length; i++) {
                this.ServiceReportNo = this.cus[i].ServiceReportNo
              this.CustomerName = this.cus[i].CustomerName
              this.EngineerTel = this.cus[i].EngineerTel
              this.Reference = this.cus[i].Reference
              this.JobID = this.cus[i].JobID
              }                  
            }
          });
        }
        this.ngOnInit();
      }
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
      console.log(this.Cus);

      for (let i = 0; i < this.Cus.length; i++) {
        this.CustomerCode = this.Cus[i].CustomerCode
        this.CustomerName = this.Cus[i].CustomerName
        this.AddressSite = this.Cus[i].Address
        this.ServiceReportNo = this.Cus[i].ServiceReportNo
        this.Status = this.Cus[i].Status
        this.TelCompany = this.Cus[i].TelCompany
        this.EngineerTel = this.Cus[i].EngineerTel
        this.Reference = this.Cus[i].Reference
        this.JobID = this.Cus[i].JobID
        this.loadItems();
      }
      console.log(this.CusID);

    });
  }

  async Delete(item) {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน!',
      message: 'ต้องการลบข้อมูล',
      buttons: [
        {
          text: 'ตกลง',
          handler: () => {
            let params = {
              JobDeviceID: item.JobDeviceID,
              EmpID: this.empID,
              Type: "Delete",
            }
            this.postDataService.PostCus(params).then(list => {
              console.log(list);
              this.isShow = true;
              this.ngOnInit();
            });
          }
        }, {
          text: 'ยกเลิก',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });
    await alert.present();
  }

  async Edit(item) {
    console.log(item);
    const modal = await this.modalController.create({
      component: TakePage,
      componentProps: {
        item: item,
      }
    });
    modal.onDidDismiss().then(data => {
      this.JobID = data
      this.JobID = this.JobID.data
      console.log(this.JobID)
      if (this.JobID != null) {
        this.ngOnInit();
      }
    });
    return await modal.present();

  }

  Save() {
    let params =
    {
      EmpID: this.empID,
      JobID: this.JobID,
      Reference: this.Reference,
      EngineerTel: this.EngineerTel,
      Type: "UpdateJob",
    }
    this.postDataService.PostCus(params).then(list => {
      this.cus = list
      console.log(list);
      if (this.cus != null) {
        for (let i = 0; i < this.cus.length; i++) {
          this.CustomerCode = this.cus[i].CustomerCode
      this.CustomerName = this.cus[i].CustomerName
      this.AddressSite = this.cus[i].AddressSite
      this.ServiceReportNo = this.cus[i].ServiceReportNo
      this.Status = this.cus[i].Status
      this.TelCompany = this.cus[i].TelCompany
      this.EngineerTel = this.cus[i].EngineerTel
      this.Reference = this.cus[i].Reference
      this.JobID = this.cus[i].JobID
      this.type = this.cus[i].type
      console.log(this.CustomerName);
        }      
      this.alertSuccess();
      }
    });
  }

  Requested() {
    let params = {
      JobID: this.JobID,
      Type: "Approve",
    }
    this.postDataService.PostCus(params).then(list => {
      this.list = list
      console.log(list);
      this.alertSuccess();
      this.navCtrl.navigateForward(['sparelist']);
    });
  }

  //#region alert Success
  async alertSuccess() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'บันทึกสำเร็จ',
      buttons: ['OK']
    });

    await alert.present();
  }
  //#endregion
}
