import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-customerevaluation',
  templateUrl: './customerevaluation.page.html',
  styleUrls: ['./customerevaluation.page.scss'],
})
export class CustomerevaluationPage implements OnInit {
  description;
  items;
  constructor(public modalController: ModalController,
    navParams: NavParams,) { }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss(this.description);
  }
  onChange(value){
    this.items = value.detail.value
    console.log(value);
    console.log(this.items);
    
    
  }
}
