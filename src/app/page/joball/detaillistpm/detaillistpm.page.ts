import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-detaillistpm',
  templateUrl: './detaillistpm.page.html',
  styleUrls: ['./detaillistpm.page.scss'],
})
export class DetaillistpmPage implements OnInit {
  myId;
  isShowWait;
  isShowSuccess;

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      console.log("receive" ,this.myId);
    });
    if (this.myId == 0) {
      this.isShowWait = true;
      this.isShowSuccess = false;
    }
    if (this.myId == 1) {
      this.isShowSuccess = true;
      this.isShowWait = false;
    }
  }
  click(){
    if (this.myId == 0) {
      this.isShowWait = true;
      this.isShowSuccess = false;
      const navigationExtras: NavigationExtras = {
        queryParams: {
          data: JSON.stringify(this.myId)
        }
      };
      this.navCtrl.navigateForward(['/joball/listpm/detailofdetaillistpm'], navigationExtras);
      console.log("sent" ,this.myId);
    }
    if (this.myId == 1) {
      this.isShowSuccess = true;
      this.isShowWait = false;
      console.log("success");
      
    }
  }
}
