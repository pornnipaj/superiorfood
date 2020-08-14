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
  SpareID;
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
  ItemsName;
  itemname = [];
  cusID;
  SpareJob;
  JobID;
  MainSKUID;
  Type;
  ListJob;
  DetailJobList;
  No;

  constructor(public modalController: ModalController,
    private postDataService: PostDataService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    public navCtrl: NavController,) {

  }

  ngOnInit() {
    this.buttonColor = 'medium';
    this.route.queryParams.subscribe(params => {
      this.data = JSON.parse(params["data"]);
      this.insID = this.data.insID;
      this.empID = this.data.empID;
      this.planID = this.data.planID;
      this.item = this.data.item;
      this.type = this.data.type;
      this.date = this.data.date;
      this.ItemsName = this.data.ItemsName;
      this.cusID = this.item.cusID;
      this.Type = this.data.Type;
    });
    console.log(this.insID);
    console.log(this.empID);
    console.log(this.planID);
    console.log("item", this.item);
    console.log("type", this.type);
    console.log("Type", this.Type);
    if (this.Type == 'history') {
      this.GetListJob()
    }else{}
    this.getSpare();
  }

  getSpare() {
    let params = {
      insID: this.insID,
      Type: "GetSpare",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareList => {
      this.SpareList = SpareList;
      console.log(this.SpareList);
      for (let a = 0; a < this.SpareList.length; a++) {
        this.itemname.push(
          {
            SparepartGroupID: this.SpareList[a].SparepartGroupID,
            SparepartGroupName: this.SpareList[a].SparepartGroupName,
            MainSKUID: this.SpareList[a].MainSKUID,
            color: 'medium'
          });
          this.MainSKUID = this.SpareList[a].MainSKUID;
      }       
      //this.Test();
      console.log(this.itemname);
      console.log(this.MainSKUID);
      
    });
  }

  GetListJob() {
    let params = {
      planID: this.planID,
      insID: this.insID,
      Type: "GetListJob",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(ListJob => {
      this.ListJob = ListJob;
    });
  }

  GetJob(item,Docno) {
    this.No = Docno;
    let params = {
      planID: this.planID,
      insID: this.insID,
      Type: "GetJob",
      JobID:item
    }
    console.log(params);
    this.postDataService.PostCus(params).then(DetailJobList => {
      this.DetailJobList = DetailJobList;
      console.log(this.DetailJobList);
            
    });
  }

  delete(value) {
    let params = {
      JobDeviceID: value.JobDeviceID,
      Type: "DeleteJobDevice",
      EmpID: this.empID
    }
    console.log(params);
    this.postDataService.PostCus(params).then(ListJob => {
      console.log(ListJob);  
      this.GetJob(ListJob,this.No);   
      this.GetListJob();
    });
  }
  DeleteJob(JobID){
    let params = {
      JobID: JobID,
      Type: "DeleteJob",
      EmpID: this.empID
    }
    console.log(params);
    this.postDataService.PostCus(params).then(ListJob => {
      console.log(ListJob);  
      this.GetListJob(); 
      this.GetJob("","");   
    });
  }
  getImage(i,SparepartGroupID, MainSKUID) {
    this.itemname.splice(0);
    for (let a = 0; a < this.SpareList.length; a++) {
      this.itemname.push(
        {
          SparepartGroupID: this.SpareList[a].SparepartGroupID,
          SparepartGroupName: this.SpareList[a].SparepartGroupName,
          MainSKUID: this.SpareList[a].MainSKUID,
          color: 'medium'
        });
        this.MainSKUID = this.SpareList[a].MainSKUID;
    }     
    this.itemname[i].color = 'primary';
    console.log(SparepartGroupID, MainSKUID);
    let params = {
      SparepartGroupID: SparepartGroupID,
      empID: this.empID,
      Type: "GetSpareImage",
      MainSKUID: MainSKUID
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareImage => {
      this.SpareImage = this.postDataService.apiStock + SpareImage;
      if (this.SpareImage != null) {
        this.DataSpare.splice(0);
        this.GetListSpare(SparepartGroupID, MainSKUID);
      }
    });
    console.log(this.SpareImage);

  }

  GetListSpare(SparepartGroupID, MainSKUID) {
    let params = {
      SparepartGroupID: SparepartGroupID,
      empID: this.empID,
      Type: "GetListSpare",
      MainSKUID: MainSKUID
    }
    console.log(params);
    this.postDataService.PostCus(params).then(SpareData => {
      this.SpareData = SpareData;
      if (this.SpareImage != null) {
        this.AddDataToList();
      }
    });
  }

  AddDataToList() {
    for (let i = 0; i < this.SpareData.length; i++) {
      this.DataSpare.push(
        {
          ID: this.SpareData[i].ID,
          PositionNo: this.SpareData[i].PositionNo,
          Skuname: this.SpareData[i].Skuname,
          Amount: this.SpareData[i].Amount,
          SubSKUID: this.SpareData[i].SubSKUID,
          Balance: this.SpareData[i].Balance
        });
    }
  }

  AddToList(i, item) {
    this.check = false;
    console.log(this.check);
    console.log(item);
    if (this.ListSpare != []) {
      for (let j = 0; j < this.ListSpare.length; j++) {
        const a = this.ListSpare[j].ID;
        if (item.ID == a) {
          console.log(a);
          this.check = true;
          break;
        }
      }
      if (this.check == false) {
        this.ListSpare.push(
          {
            ID: item.ID,
            PositionNo: item.PositionNo,
            Skuname: item.Skuname,            
            SubSKUID: item.SubSKUID,
            Amount: item.Amount,
            Balance: item.Balance
          });
      } else {
        this.alertMeanSpart();
      }
    } else {
      this.ListSpare.push(
        {
          ID: item.ID,
          PositionNo: item.PositionNo,
          Skuname: item.Skuname,
          SubSKUID: item.SubSKUID,
          Amount: item.Amount,
          Balance: item.Balance
        });
    }
  }


  DeleteFromList(i, item) {
    this.ListSpare.splice(i, 1);
  }

  SaveSpare() {
    this.check = false;
    for (let k = 0; k < this.ListSpare.length; k++) {
      const amount = 0;
      if (this.ListSpare[k].Amount == 0) {
        this.check = true;
        break;
      }
    }

    if (this.check == true) {
      this.alertZero();
    } else {
      let params = {
        insID: this.insID,
        SkuData: this.ListSpare,
        EmpID: this.empID,
        Type: "SaveSpare",
        CusID: this.cusID,
        planID: this.planID,
        JobID: this.JobID,
      }
      console.log(params);
      this.postDataService.PostCus(params).then(SpareData => {
        this.SpareData = SpareData;
        let params = {
          item: this.item,
          type: this.type,
          date: this.data,
        }
        console.log(params);

        let navigationExtras: NavigationExtras = {
          queryParams: {
            data: JSON.stringify(params)
          }
        };
        console.log(navigationExtras);
        this.navCtrl.navigateForward(['/joball/listpm/detaillistpm'], navigationExtras);
      });
    }
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

  getItems(ev: any) {
    const val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() !== '') {
      this.itemname = this.itemname.filter((item) => {
        return (item.SparepartGroupName.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.itemname.splice(0);
      for (let i = 0; i < this.SpareList.length; i++) {
        this.itemname.push(
          {
            SparepartGroupID: this.SpareList[i].SparepartGroupID,
            SparepartGroupName: this.SpareList[i].SparepartGroupName,
            MainSKUID: this.SpareList[i].MainSKUID,
          });
      }
    }
    console.log(this.itemname);

  }

}
