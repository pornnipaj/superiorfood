import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
@Component({
  selector: 'app-modalpop',
  templateUrl: './modalpop.page.html',
  styleUrls: ['./modalpop.page.scss'],
})
export class ModalpopPage implements OnInit {
  id;
  constructor(private router: Router, private popoverController: PopoverController) { }

  ngOnInit() {
  }

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
}
