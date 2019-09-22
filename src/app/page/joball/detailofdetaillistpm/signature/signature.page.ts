import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-signature',
  templateUrl: './signature.page.html',
  styleUrls: ['./signature.page.scss'],
})
export class SignaturePage implements OnInit {

  //#region data

  @Input() firstName: string;
  @Input() lastName: string;
  @Input() middleInitial: string;

  firstname: any;
  isShow = false;
  image: any;

  //#endregion

  //#region constructor

  @ViewChild(SignaturePad, { static: false }) signaturePad;

  public signaturePadOptions: Object = {
    'minWidth': 2,
    canvasWidth: 600,
    canvasHeight: 400,
    backgroundColor: '#f6fbff',
    penColor: 'black'
  };

  constructor(private nav: NavController,
    private modalCtrl: ModalController,
    navParams: NavParams,
    public storage: Storage,
    public modalController: ModalController) {
    // console.log(navParams.get('firstName'));
    // console.log(navParams.get('lastName'));
    // console.log(navParams.get('middleInitial'));
    this.firstName = navParams.get('firstName')
    console.log(this.firstName);

  }

  //#endregion

  //#region click

  drawStart() {
    this.isShow = true;
  }

  savePad() {
    const base64 = this.signaturePad.toDataURL('image/png', 0.5);
    console.log(base64);
    const blob = this.signature(base64)
    console.log(blob);
    this.image = base64;
    this.drawStart();
  }

  signature(base64) {
    const byteString = atob(base64.split(',')[1]);
    const mimeString = base64.split(',')[0].split(':')[1].split(':')[0];
    const byteNumbers = new Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
      byteNumbers[i] = byteString.charAt(i);
    }
    const ia = new Uint8Array(byteNumbers);
    return new Blob([ia], { type: mimeString });
  }

  clearPad() {
    this.signaturePad.clear();
    this.isShow = false;
  }

  close() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion
}
