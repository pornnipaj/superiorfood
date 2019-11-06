import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-modalpop',
  templateUrl: './modalpop.page.html',
  styleUrls: ['./modalpop.page.scss'],
})
export class ModalpopPage implements OnInit {
  //#region data
  id;
  pm;
  cm;
  install;
  uninstall;
  //#endregion

  //#region constructor
  constructor(private router: Router, private popoverController: PopoverController,
    private navParams: NavParams) {
    this.pm = this.navParams.data.pm;
    this.cm = this.navParams.data.cm;
    this.install = this.navParams.data.install;
    this.uninstall = this.navParams.data.uninstall;
  }
  //#endregion

  //#region start
  ngOnInit() {
    setTimeout(() => {
      this.ngOnInit();
    }, 500);
  }
  //#endregion
  
  //#region next  
  next(type) {
    console.log(type);

    if (type == 'pm') {
      this.router.navigate(['/job/reportcheckpm']);
      this.popoverController.dismiss();
    }

    if (type == 'cm') {
      this.router.navigate(['/job/cm']);
      this.popoverController.dismiss();
    }

    if (type == 'install') {
      this.router.navigate(['/job/install']);
      this.popoverController.dismiss();
    }

    if (type == 'uninstall') {

      this.router.navigate(['/job/uninstall']);
      this.popoverController.dismiss();
    }
  }
  //#endregion
}
