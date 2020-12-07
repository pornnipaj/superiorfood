import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';
import { ModalController, AlertController, IonTextarea } from '@ionic/angular';
import { PartsWaitingListPage } from '../../sparepart/parts-waiting-list/parts-waiting-list.page';
@Component({
  selector: 'app-waitspare',
  templateUrl: './waitspare.page.html',
  styleUrls: ['./waitspare.page.scss'],
})
export class WaitsparePage implements OnInit {
  ListJob;
  DetailJobList;
  No;
  empID;
  load = false;
  constructor(private postDataService:PostDataService,private storageService: StorageService,public modalController: ModalController,) { 
    this.loadItems();
  }

  ngOnInit() {
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      for (let i = 0; i < items.length; i++) {
        this.empID = items[i].empID;
      }      
    this.GetListJob();
    });
  }

  GetListJob() {
    let params = {
      EmpID: this.empID,
      Type: "GetListJobWait",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(ListJob => {
      this.ListJob = ListJob;
      console.log(this.ListJob);
      if (this.ListJob == []) {
        this.load = false;
      }else{
        this.load = true;
      }
    });
  }

  async GetJob(item,Docno) {
    const modal = await this.modalController.create({
      component: PartsWaitingListPage,
      cssClass: 'my-custom-modal-css-pm',
      componentProps: {
        empID: this.empID,
        JobID: item,
      }
    });
    modal.onDidDismiss().then(data => {
      console.log(data);
    })
    return await modal.present();
  
  //   this.No = Docno;
  //   let params = {
  //     Type: "GetJobWait",
  //     JobID:item
  //   }
  //   console.log(params);
  //   this.postDataService.PostCus(params).then(DetailJobList => {
  //     this.DetailJobList = DetailJobList;
  //     console.log(this.DetailJobList);
            
  //   });
  }
}
