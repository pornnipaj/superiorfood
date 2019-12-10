import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { AuthServiceService } from '../../../../auth-service.service';

@Component({
  selector: 'app-customerevaluation',
  templateUrl: './customerevaluation.page.html',
  styleUrls: ['./customerevaluation.page.scss'],
})
export class CustomerevaluationPage implements OnInit {
  resolution;
resolutiondetail;
data;

  constructor(private DataService: AuthServiceService,
    public modalController: ModalController,
    private navParams: NavParams,) {

      console.table(this.navParams);
      this.resolution = this.navParams.data.resolution;
      this.resolutiondetail = this.navParams.data.resolutiondetail;

      this.DataService.getresolution().subscribe(data => {
        this.data = data;         
          console.log(this.data); 
      });    
     }

  ngOnInit() {
  }
  close() {
    this.modalController.dismiss();
  }
  onChange(value){
    console.log(value);
    
    this.resolution = value.detail.value
    console.log(value);
    console.log(this.resolution);   
  }
  submit(){
    console.log(this.resolution);    
    console.log(this.resolutiondetail);
    
    let params = {
      resolution: this.resolution,
      resolutiondetail: this.resolutiondetail
    }
    this.modalController.dismiss(params);
  }
 
}
