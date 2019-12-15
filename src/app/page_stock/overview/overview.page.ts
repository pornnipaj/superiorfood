import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../storage.service';
import { AuthServiceService } from '../../auth-service.service';
import { ModalController } from '@ionic/angular';
import { DetailPage } from '../overview/detail/detail.page';
@Component({
  selector: 'app-overview',
  templateUrl: './overview.page.html',
  styleUrls: ['./overview.page.scss'],
})
export class OverviewPage implements OnInit {
  items;
  empID;
  name;
  username;
  position;
  data;
  header;
  type;

  constructor(private storageService: StorageService,
    public DataService: AuthServiceService,
    public modalController: ModalController,) {
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }

  ngOnInit() {
    this.loadItem();
    this.loadStock();
  }

  loadItem(){
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
        this.name = this.items[i].name
        this.position = this.items[i].position
        this.username = this.items[i].username
        console.log(this.empID,this.name,this.position,this.username);        
      }
    });
  }

  loadStock(){
    this.DataService.getnew().subscribe(data => {
      console.log(data);
      this.data = data;
      for (let i = 0; i < this.data.length; i++) {
        this.header = this.data[i].header;
        this.type = this.data[i].type;        
      }
    });
  }

  onChange(item) {
    this.header = item.title
    this.type = item.name
  }

  async View() {
    const modal = await this.modalController.create({
      component: DetailPage,
      cssClass: 'my-custom-modal-css-stock',
      componentProps: {
        item: "this.header",
        test: "test",
      }
    });

    modal.onDidDismiss().then(data => {
      // this.JobID = data
      // this.JobID = this.JobID.data
      // console.log(this.JobID)
     
    });

    return await modal.present();
  }

}
