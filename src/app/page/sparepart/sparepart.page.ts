import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { PostDataService } from '../../post-data.service';
import { ActivatedRoute, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-sparepart',
  templateUrl: './sparepart.page.html',
  styleUrls: ['./sparepart.page.scss'],
})
export class SparepartPage implements OnInit {
  insID;
  empID;
  planID;
  SkuID;
  SpareList;
  SpareImage;
  SpareData;
  DataSpare = [];
  ListSpare = [];
  Amount;
  data;
  buttonColor;
  check = false;
  type;
  item;
  date;
  installPlanName;

  constructor(public modalController: ModalController,
    private postDataService: PostDataService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public navCtrl: NavController,) {

  }

  ngOnInit() {
    this.buttonColor = '#345465';
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params["data"]);
      this.insID = this.data.insID;
      this.empID = this.data.empID;
      this.planID = this.data.planID;
      this.item = this.data.item
      this.type = this.data.type
      this.date = this.data.date
      this.installPlanName = this.data.installPlanName
    });
    console.log(this.insID);
    console.log(this.empID);
    console.log(this.planID);
    console.log("item", this.item);
    console.log("type", this.type);
    console.log("date", this.date);
    this.getSpare();
  }

  getSpare() {
    let params = {
      insID: this.insID,
      empID: this.empID,
      Type: "GetSpare",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareList => {
      this.SpareList = SpareList;
      this.Test();
      console.log(this.SpareList);
    });
  }

  getImage(value) {
    this.buttonColor = '#ffffff';
    this.SkuID = value.ProductID;
    console.log(this.SkuID);
    let params = {
      SkuID: this.SkuID,
      empID: this.empID,
      Type: "GetSpareImage",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareImage => {
      this.SpareImage = this.postDataService.apiServer_url + SpareImage;
      if (this.SpareImage != null) {
        this.GetListSpare();
      }
    });
    console.log(this.SpareImage);

  }

  Test() {
    for (let i = 0; i < this.SpareList.length; i++) {
      this.DataSpare.push(
        {
          SpareID: this.SpareList[i].ProductID,
          SpareNo: 123,
          SpareName: this.SpareList[i].ProductName,
          Amount: 0
        });
    }
    console.log(this.ListSpare);
    console.log(this.DataSpare);

  }

  GetListSpare() {
    let params = {
      SkuID: this.SkuID,
      empID: this.empID,
      Type: "GetListSpare",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareData => {
      this.SpareData = SpareData;
    });
  }

  AddDataToList() {
    for (let i = 0; i < this.SpareData.length; i++) {
      this.DataSpare.push(
        {
          SpareID: this.SpareData[i].SpareID,
          SpareNo: this.SpareData[i].SpareNo,
          SpareName: this.SpareData[i].SpareName,
          Amount: this.SpareData[i].Amount
        });
    }
  }

  AddToList(i, item) {
    this.check = false;
    console.log(this.check);
    console.log(item.SpareID);
    if (this.ListSpare != []) {
      for (let j = 0; j < this.ListSpare.length; j++) {
        const a = this.ListSpare[j].SpareID;
        if (item.SpareID == a) {
          console.log(a);
          this.check = true;
          break;
        }
      }
      if (this.check == false) {
        this.ListSpare.push(
          {
            SpareID: item.SpareID,
            SpareNo: item.SpareNo,
            SpareName: item.SpareName,
            Amount: item.Amount
          });
      } else {
        this.alertMeanSpart();
      }
    } else {
      this.ListSpare.push(
        {
          SpareID: item.SpareID,
          SpareNo: item.SpareNo,
          SpareName: item.SpareName,
          Amount: item.Amount
        });
    }
  }


  DeleteFromList(i, item) {
    this.ListSpare.splice(i, 1);
  }

  SaveSpare() {    
    // this.check = false;
    // for (let k = 0; k < this.ListSpare.length; k++) {
    //   const amount = 0;
    //   if (this.ListSpare[k].Amount == 0) {
    //     this.check = true;
    //     break;
    //   }      
    // }

    // if (this.check == true) {
    //   this.alertZero();
    // }else{
    //   let params = {
    //     SkuData: this.ListSpare,
    //     empID: this.empID,
    //     Type: "SaveSpare",
    //   }
    //   console.log(params);
    //   this.postDataService.PostCus(params).then(SpareData => {
    //     this.SpareData = SpareData;
    // let params = {
    //   item: this.item,
    //   type: this.type,
    //   date: this.data,
    // }
    // console.log(params);

    // let navigationExtras: NavigationExtras = {
    //   queryParams: {
    //     data: JSON.stringify(params)
    //   }
    // };
    // console.log(navigationExtras);
    // this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
    //   });
    // }    
  }

  async alertMeanSpart() {
    const alert = await this.alertController.create({
      message: 'รายการอะไหล่ซ้ำ',
      buttons: ['OK']
    });
    await alert.present();
  }

  async alertZero() {
    const alert = await this.alertController.create({
      message: 'กรุณากรอกจำนวนที่ต้องการเบิกให้ถูกต้อง',
      buttons: ['OK']
    });
    await alert.present();
  }

}
