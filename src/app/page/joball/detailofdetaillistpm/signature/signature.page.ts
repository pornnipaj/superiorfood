import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { NavParams } from '@ionic/angular';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
import { Storage } from '@ionic/storage';
import { NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../../post-data.service';
import { StorageService, Sig } from '../../../../storage.service';

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
  isSave = true;
  isSign = true;
  newSig: Sig = <Sig>{};
  sig;
  test;
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
    public navCtrl: NavController,
    private postDataService:PostDataService,
    private storageService: StorageService,
    public modalController: ModalController) {
    // console.log(navParams.get('firstName'));
    // console.log(navParams.get('lastName'));
    // console.log(navParams.get('middleInitial'));
    this.firstName = navParams.get('firstName')
    // console.log(this.firstName);

  }

  //#endregion

  //#region click

  drawStart() {
    this.isShow = true;
    this.isSave = false;
    this.isSign = false;
  }

  savePad() {
    const base64 = this.signaturePad.toDataURL('image/png', 0.5);    
    // console.log(base64);
    const blob = this.signature(base64)
    // console.log(blob);
    this.image = base64;
    this.drawStart();

    let params={ 
      signature: this.image
    }
      this.postDataService.post(params).then((data:any) => {
        this.sig = data
        console.log(this.sig);
        for (let i = 0; i < this.sig.length; i++) {
          this.sig = this.sig[i];         
          
        }
        this.sig = this.sig.signature
        console.log(this.sig);
        
      });   
        console.log(this.image);
        
        // const navigationExtras: NavigationExtras = {
        //   queryParams: {
        //     sig: JSON.stringify(this.image)
        //   }
        // };
        // this.navCtrl.navigateForward(['test'], navigationExtras);
        // console.log("sent", navigationExtras);
      // this.newSig.base64 = this.image;
      // this.storageService.addSig(this.newSig).then(item => {
      //   this.newSig = <Sig>{};
      //   console.log("success",item);
        
      // });      
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
    this.isShow = false;
    this.isSave = true;
    this.isSign = true;
  }

  close() {
    this.modalCtrl.dismiss(this.sig);
  }

  //#endregion

  //#region start

  ngOnInit() {
  }

  //#endregion
}
