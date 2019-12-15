import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  item;
  constructor(public modalController:ModalController,
    private navParams: NavParams,) {
      this.item = (navParams.get('test'))
      console.log(this.item);
      
     }

  ngOnInit() {
  }

  close() {
    this.modalController.dismiss();
  }
}
