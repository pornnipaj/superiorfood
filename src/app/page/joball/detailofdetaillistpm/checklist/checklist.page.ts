import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';;

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  link;
  empID;
  planID;
  installID;
  tran;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public postDataService: PostDataService) {

    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install
    console.log(this.empID,this.planID,this.installID);
    this.tran = [];  
    // this.link = 'http://localhost:41604/Web/CK_Check.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID     
// console.log(this.link);

    
  }

  ngOnInit() {
    // console.log(this.empID);
    // this.tran.empID = this.empID;
    // this.tran.serviceplanid = this.planID;
    // this.tran.installplanid = this.installID;
    // console.log(this.tran);

    // this.postDataService.postTran(this.tran).then(tran => {
    //   console.log(this.tran);
    // });
  }


  close() {
    this.modalController.dismiss(0);
  }

}
