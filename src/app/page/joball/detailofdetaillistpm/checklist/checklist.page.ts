import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { PostDataService } from '../../../../post-data.service';;

@Component({
  selector: 'app-checklist',
  templateUrl: './checklist.page.html',
  styleUrls: ['./checklist.page.scss'],
})
export class ChecklistPage implements OnInit {

  url;
  empID;
planID;
installID;
tran;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    public postDataService:PostDataService) {

      this.empID =  this.navParams.data.empID;
      this.planID = this.navParams.data.planID;
      this.installID = this.navParams.data.installID
      console.log(this.empID);
      this.tran = [];
    this.url = "http://superior.wingplusweb.com/Web/CK_Check.aspx";

   }

  ngOnInit() {
    console.log(this.empID);
    this.tran.empID = this.empID;
    this.tran.planID = this.planID;
    this.tran.installID = this.installID;
    console.log(this.tran);

        this.postDataService.postTran(this.tran).then(tran => {
    });
    
  }

  
  close() {    
    this.modalController.dismiss(0);
  }

}
