import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';
import { from } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ShowimginstallPage } from '../../job/showimginstall/showimginstall.page';
import { CustomerevaluationPage } from '../detailofdetaillistpm/customerevaluation/customerevaluation.page';

@Component({
  selector: 'app-detaillistpm',
  templateUrl: './detaillistpm.page.html',
  styleUrls: ['./detaillistpm.page.scss'],
})
export class DetaillistpmPage implements OnInit {

  //#region data
  detail;
  resolution;
  resolutiondetail;
  getworkclose
  getworkclose1;
  getworkclose2;
  getworkclose3;
  text;
  getworkclosevalue1;
  getworkclosevalue2;
  getworkclosevalue3;
  myId;
  workfinish;
  cusID;
  planID;
  detaillistpm;
  data;
  Customername;
  Name;
  month;
  year;
  insID;
  item;
  type;
  date;
  items;
  empID;
  new = false;
  imgbf = false;
  sparetype;
  //#endregion

  //#region constructor
  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private postDataService: PostDataService,
    private storageService: StorageService,
    public alertController: AlertController,
    public modalController: ModalController, ) {
    this.detaillistpm = [];

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.item = this.myId.item
      this.type = this.myId.type
      this.date = this.myId.date

      this.cusID = this.item.cusID
      this.planID = this.item.planID
      this.workfinish = this.item.WorkFinish
      this.month = this.item.month
      this.year = this.item.year
      console.log("receive", this.type);
    });
  }

  //#endregion

  //#region start
  ngOnInit() {
    if (this.type == "CM") {
      this.imgbf = true
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          console.log(this.empID);
        }
        this.detaillistpm.cusID = this.cusID;
        this.detaillistpm.planID = this.planID;
        this.detaillistpm.month = this.month;
        this.detaillistpm.year = this.year;
        this.detaillistpm.type = this.type;
        this.detaillistpm.date = this.date;
        this.detaillistpm.empid = this.empID;

        console.log(this.detaillistpm);

        this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
          this.data = work;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.Customername = this.data[i].CustomerName;
            this.data[i].productInstall = JSON.parse(this.data[i].productInstall);
          }
        });
      });
      let workclose = {
        jobtype: "getworkclose"
      }
      console.log(workclose);
      this.postDataService.SaveCaseAll(workclose).then(data => {
        this.getworkclose = data
        console.log(data);
        for (let i = 0; i < this.getworkclose.length; i++) {  
          console.log(this.getworkclose);
          if (i==0) {
            this.getworkclose1 = this.getworkclose[0].SystemDataName;
            this.getworkclosevalue1 = this.getworkclose[0].SystemID;
            this.text = 'ปิดงาน'
          }else if (i == 1) {
            this.getworkclose2 = this.getworkclose[1].SystemDataName;
            this.getworkclosevalue2 = this.getworkclose[1].SystemID;
            this.text = 'เริ่มงาน'
          }else if (i == 2) {
            this.getworkclose3 = this.getworkclose[2].SystemDataName;
            this.getworkclosevalue3 = this.getworkclose[2].SystemID;
            this.text = 'บันทึก'
          }         
        }        
      });  
    }
    if (this.type == "INSTALL") {
      this.imgbf = true
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          // console.log(this.empID);
        }
        this.detaillistpm.cusID = this.cusID;
        this.detaillistpm.planID = this.planID;
        this.detaillistpm.month = this.month;
        this.detaillistpm.year = this.year;
        this.detaillistpm.type = this.type;
        this.detaillistpm.date = this.date;
        this.detaillistpm.empid = this.empID;

        console.log(this.detaillistpm);

        this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
          this.data = work;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.Customername = this.data[i].CustomerName;
            this.data[i].productInstall = JSON.parse(this.data[i].productInstall);
            for (let j = 0; j < this.data[i].productInstall.length; j++) {
              console.log(this.data[i].productInstall[j]);
            }
          }
        });
      });
    } else {
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          // console.log(this.empID);
        }
        this.detaillistpm.cusID = this.cusID;
        this.detaillistpm.planID = this.planID;
        this.detaillistpm.month = this.month;
        this.detaillistpm.year = this.year;
        this.detaillistpm.type = this.type;
        this.detaillistpm.date = this.date;
        this.detaillistpm.empid = this.empID;

        console.log(this.detaillistpm);

        this.postDataService.postDetailListpm(this.detaillistpm).then(work => {
          this.data = work;
          console.log(this.data);
          for (let i = 0; i < this.data.length; i++) {
            this.Customername = this.data[i].CustomerName;
            this.data[i].productInstall = JSON.parse(this.data[i].productInstall);
            for (let j = 0; j < this.data[i].productInstall.length; j++) {
              console.log(this.data[i].productInstall[j]);
            }
          }
        });
      });
    }

  }

  //#endregion

  async popupclose(item,header,workclose){
    console.log(item);
    
    const modal = await this.modalController.create({
      component: CustomerevaluationPage,
      cssClass: 'my-custom-modal-css',
      componentProps: {
        installID: item.installId,
        planID: item.planID,
        jobtype: this.type,
        header:header,
        empID:this.empID,
        workclose:workclose
      }
    });
    modal.onDidDismiss().then(data => {
  })
  return await modal.present();
  }
  //#region click
  async click(data, item) {
    console.log('Data', data);
    console.log('item', item);
    if (item.Workfinish == 0) {
      if (item.status == "Pending") {
        const alert = await this.alertController.create({
          message: 'กรุณาติดต่อผู้ดูลระบบ',
          buttons: ['OK']
        });
        await alert.present();
      } else if (this.type == "CM") {
       
        let alert = await this.alertController.create({
          cssClass: 'custom-alert',
          message: 'กรุณาเลือกการปิดงาน',
          inputs: [
            {
              type: 'radio',
              label:this.getworkclose1,
              value: this.getworkclosevalue1              
            },
            {
              type: 'radio',
              label:this.getworkclose2,
              value: this.getworkclosevalue2
            },
            {
              type: 'radio',
              label:this.getworkclose3,
              value: this.getworkclosevalue3
            }
          ],
          buttons: 
          [{text: this.text,
          handler: data => {
    console.log(data);
    if (data == this.getworkclosevalue1) {
      let params = {
        planID: item.planID,
        installID: item.installId,
        empID:this.empID,
        jobtype: "saveclose",
        workclose:data
      }
      console.log(params);
      this.postDataService.SaveCaseAll(params).then(data => {
        console.log(data);
        if (data == true) {
          this.alertSuccess();
          this.navCtrl.navigateForward(['/menu/overview']);
        }
        if (data == false) {
          this.alertFail();
        }
      });
    }
    else if (data == this.getworkclosevalue2) {
      let tran = {
        AssetID: item.AssetID,
        Serial: item.Serial,
        planID: item.planID,
        empID: this.empID,
        insID: item.installId,
        type: this.type,        
        workclose:data
      }
      console.log(tran);

      this.postDataService.postTranService(tran).then(TranService => {
        // console.log(TranService);  
      });
      let params = {
        planID: item.planID,
        install: item,
        data:data,
        insID: item.installId,
        sparetype: item.sparepart
      }
      console.log(params);

      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(params)
        }
      };
      this.navCtrl.navigateForward(['joball/listpm/detailofdetaillistpm'], navigationExtras);
      console.log("sent", navigationExtras);
    }
    else if (data == this.getworkclosevalue3) {
      this.popupclose(item,this.getworkclose3,data)
  }
        }}]});
        await alert.present();
      
      }else{
        const alert = await this.alertController.create({
          header: 'แจ้งเตือน!',
          message: 'ต้องการเริ่มทำงาน',
          buttons: [
            {
              text: 'ตกลง',
              handler: () => {
                let tran = {
                  AssetID: item.AssetID,
                  Serial: item.Serial,
                  planID: item.planID,
                  empID: this.empID,
                  insID: item.installId,
                  type: this.type
                }
                console.log(tran);
  
                this.postDataService.postTranService(tran).then(TranService => {
                  // console.log(TranService);  
                });
                let params = {
                  planID: item.planID,
                  install: item,
                  data:data,
                  insID: item.installId,
                  sparetype: item.sparepart
                }
                console.log(params);
  
                const navigationExtras: NavigationExtras = {
                  queryParams: {
                    data: JSON.stringify(params)
                  }
                };
                this.navCtrl.navigateForward(['joball/listpm/detailofdetaillistpm'], navigationExtras);
                console.log("sent", navigationExtras);
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
    }

    if (item.Workfinish == 1) {
      if (this.type == "CM") {
        let params = {
          data: data,
          installID: item.newinstallID,
          tranID: item.tranID,
          planID: item.planID,
          type: this.type
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
      else if (this.type != "CM") {
        let params = {
          data: data,
          installID: item.installId,
          tranID: item.tranID,
          planID: item.planID,
          type: this.type
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
  }

  //#endregion

  //#region Imgbf
  async Imgbf(item) {
    console.log(item);

    if (this.type == "INSTALL" || this.type == "CM") {
      const modal = await this.modalController.create({
        component: ShowimginstallPage,
        cssClass: 'my-custom-modal-css',
        componentProps: {
          installId: item.installId,
          empID: this.empID,
          planID: item.planID,
        }
      });
      return await modal.present();
    }
  }
  //#endregion

    //#region alert success
    async alertSuccess() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'บันทึกสำเร็จ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
  
    //#region alert success
    async alertFail() {
      const alert = await this.alertController.create({
        header: 'แจ้งเตือน',
        message: 'บันทึกไม่สำเร็จ',
        buttons: ['OK']
      });
  
      await alert.present();
    }
    //#endregion
  
}
