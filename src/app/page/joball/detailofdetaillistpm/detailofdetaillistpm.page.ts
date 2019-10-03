import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ModalController } from '@ionic/angular';
import { SignaturePage } from '../detailofdetaillistpm/signature/signature.page';
import { ActivatedRoute } from '@angular/router';
import { StorageService, Sig } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';
import { CustomerpasswordPage } from '../detailofdetaillistpm/customerpassword/customerpassword.page';
import { AlertController } from '@ionic/angular';
import { from } from 'rxjs';

@Component({
  selector: 'app-detailofdetaillistpm',
  templateUrl: './detailofdetaillistpm.page.html',
  styleUrls: ['./detailofdetaillistpm.page.scss'],
})
export class DetailofdetaillistpmPage implements OnInit {

  //#region data
  isenabledcheck = false;
  isenabledTakeback = false;
  isenabledeva = false;
  isenabledsig = false;
  isenabledcuspass = false;
  DateStart;
  DateEnd;
  photo1: any;
  photo2: any;
  photo3: any;
  photo4: any;
  photo5: any;
  photo6: any;
  photo7: any;
  photo8: any;
  photo9: any;
  photo10: any;
  myId;
  planID;
  isTake1 = true;
  isShow1 = false;
  isTake2 = true;
  isShow2 = false;
  isTake3 = true;
  isShow3 = false;
  isTake4 = true;
  isShow4 = false;
  isTake5 = true;
  isShow5 = false;
  isTake6 = true;
  isShow6 = false;
  isTake7 = true;
  isShow7 = false;
  isTake8 = true;
  isShow8 = false;
  isTake9 = true;
  isShow9 = false;
  isTake10 = true;
  isShow10 = false;
  isenabledsave = false;
  showSig = false;
  InstallPlanName;
  SerialNo;
  ItemsName;
  ItemCode;
  ProductCode;
  sign;
  install;
  installID;
  password;
  capturedSnapURL;
  items;
  empID;
  tran;
  code;
  minute: number = 0;
  second: number = 0;
  time: number = 0;
  interval;
  test;
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }

  //#endregion

  //#region constructor

  constructor(private camera: Camera,
    public modalController: ModalController,
    private route: ActivatedRoute,
    private storageService: StorageService,
    public alertController: AlertController,
    private postDataService: PostDataService, ) {
    this.DateStart = new Date().toString();
    this.tran = [];
    this.photo1 = "";
    this.photo2 = "";
    this.photo3 = "";
    this.photo4 = "";
    this.photo5 = "";
    this.photo6 = "";
    this.photo7 = "";
    this.photo8 = "";
    this.photo9 = "";
    this.photo10 = "";
  }

  //#endregion

  //#region start

  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.myId = JSON.parse(params["data"]);
      this.planID = this.myId.planID
      this.install = this.myId.install

      console.log("receive", this.myId);

      for (let i = 0; i < this.install.length; i++) {
        this.install = (this.install[i])
      }
      this.InstallPlanName = this.install.InstallPlanName;
      this.SerialNo = this.install.SerialNo;
      this.ItemsName = this.install.ItemsName;
      this.ItemCode = this.install.ItemCode;
      this.ProductCode = this.install.ProductCode;
      this.password = this.install.Password
      this.installID = this.install.installId
    });
    console.log(this.installID);


    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.empID = this.items[i].empID;
        // console.log(this.empID);
      }
    });

    // this.forresize();
  }

  loadItems() {
    this.storageService.getSig().then(items => {
      this.sign = items;
      // console.log(this.sign);

    });
  }

  //#endregion

  //#region click

  Take(id) {

    if (id == 1) {
      this.camera.getPicture(this.cameraOptions).then((imageData1) => {
        // alert('imagedata1=' + imageData1)
        let base64Image1 = 'data:image/jpeg;base64,' + imageData1;
        this.photo1 = base64Image1;
        alert(this.photo1)
        this.DateStart = new Date().toLocaleString();

      this.tran.empID = this.empID;
      this.tran.planID = this.planID;
      this.tran.installID = this.installID;
      this.tran.startDate = this.DateStart;
      console.log(this.tran);

      this.postDataService.postTran(this.tran).then(tran => {
        this.tran = tran;
        console.log(this.tran);
      });

      }, (err) => {

        console.log(err);
        // Handle error
        this.photo1 = "1"
        this.checktakeback();
      });
      this.isTake1 = false;
      this.isShow1 = true;
      this.checktakeback();
      this.startTimer();
    }
    if (id == 2) {
      this.camera.getPicture(this.cameraOptions).then((imageData2) => {

        let base64Image2 = 'data:image/jpeg;base64,' + imageData2;
        this.photo2 = base64Image2;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        // Handle error
        this.photo2 = "1"
        this.checktakeback();
      });
      this.isTake2 = false;
      this.isShow2 = true;
      this.checktakeback();

    }
    if (id == 3) {
      this.camera.getPicture(this.cameraOptions).then((imageData3) => {

        let base64Image3 = 'data:image/jpeg;base64,' + imageData3;
        this.photo3 = base64Image3;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo3 = "1"
        this.checktakeback();
        // Handle error
      });
      this.isTake3 = false;
      this.isShow3 = true;
      this.checktakeback();
    }
    if (id == 4) {
      this.camera.getPicture(this.cameraOptions).then((imageData4) => {

        let base64Image4 = 'data:image/jpeg;base64,' + imageData4;
        this.photo4 = base64Image4;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        // Handle error
        this.photo4 = "1"
        this.checktakeback();
      });
      this.isTake4 = false;
      this.isShow4 = true;
      this.checktakeback();
    }
    if (id == 5) {
      this.camera.getPicture(this.cameraOptions).then((imageData5) => {

        let base64Image5 = 'data:image/jpeg;base64,' + imageData5;
        this.photo5 = base64Image5;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo5 = "1"
        this.checktakeback();
        // Handle error
      });
      this.isTake5 = false;
      this.isShow5 = true;
      this.checktakeback();
    }
    if (id == 6) {
      this.camera.getPicture(this.cameraOptions).then((imageData6) => {

        let base64Image6 = 'data:image/jpeg;base64,' + imageData6;
        this.photo6 = base64Image6;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo6 = "1"
        this.checklist();
        // Handle error
      });
      this.isTake6 = false;
      this.isShow6 = true;
      this.checklist();
    }
    if (id == 7) {
      this.camera.getPicture(this.cameraOptions).then((imageData7) => {

        let base64Image7 = 'data:image/jpeg;base64,' + imageData7;
        this.photo7 = base64Image7;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo7 = "1"
        this.checklist();
        // Handle error
      });
      this.isTake7 = false;
      this.isShow7 = true;
      this.checklist();
    }
    if (id == 8) {
      this.camera.getPicture(this.cameraOptions).then((imageData8) => {

        let base64Image8 = 'data:image/jpeg;base64,' + imageData8;
        this.photo8 = base64Image8;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo8 = "1"
        this.checklist();
        // Handle error
      });
      this.isTake8 = false;
      this.isShow8 = true;
      this.checklist();
    }
    if (id == 9) {
      this.camera.getPicture(this.cameraOptions).then((imageData9) => {

        let base64Image9 = 'data:image/jpeg;base64,' + imageData9;
        this.photo9 = base64Image9;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        // Handle error
        this.photo9 = "1"
        this.checklist();
      });
      this.isTake9 = false;
      this.isShow9 = true;
      this.checklist();
    }
    if (id == 10) {
      this.camera.getPicture(this.cameraOptions).then((imageData10) => {

        let base64Image10 = 'data:image/jpeg;base64,' + imageData10;
        this.photo10 = base64Image10;
        this.checktakeback();
      }, (err) => {

        console.log(err);
        this.photo10 = "1"
        this.checklist();
        // Handle error
      });
      this.isTake10 = false;
      this.isShow10 = true;
      this.checklist();
    }
  }

  checktakeback() {
    if (this.photo1 && this.photo2 && this.photo3 && this.photo4 && this.photo5 != "") {
      this.isenabledTakeback = true;
    }
  }

  checklist() {
    if (this.photo6 && this.photo7 && this.photo8 && this.photo9 && this.photo10 != "") {
      this.isenabledcheck = true;
      this.DateStart = new Date().toLocaleString();

      this.tran.empID = this.empID;
      this.tran.planID = this.planID;
      this.tran.installID = this.installID;
      this.tran.startDate = this.DateStart;
      console.log(this.tran);

      this.postDataService.postTran(this.tran).then(tran => {
        this.tran = tran;
        console.log(this.tran);
      });
    }
  }

  check() {
    this.isenabledsig = true;
  }

  saveData() {
    this.pauseTimer();
    this.resizePhoto();
    this.DateEnd = new Date().toLocaleString();
    let params = {
      tranId: this.tran,
      photo1: this.photo1,
      photo2: this.photo2,
      photo3: this.photo3,
      photo4: this.photo4,
      photo5: this.photo5,
      photo6: this.photo6,
      photo7: this.photo7,
      photo8: this.photo8,
      photo9: this.photo9,
      photo10: this.photo10,
      signature: this.sign,
      endDate: this.DateEnd,
    }

    console.log(params);

    this.postDataService.postphoto(params).then(servicephoto => {
      console.log(servicephoto);
      alert(servicephoto);
    });
  }

  clickeva() {
    this.isenabledcuspass = true;
  }

  //#endregion

  //#region Modal
  async openModalcustomerpw() {
    const modal = await this.modalController.create({
      component: CustomerpasswordPage,
      componentProps: {
        password: this.password
      }
    });

    modal.onDidDismiss().then(data => {
      this.code = data
      console.log(data);

      for (let i = 0; i < this.code.length; i++) {
        this.code = this.code[i]
      }

      this.code = this.code.data
      console.log(this.code)

      if (this.code == "") {
        this.alertCusCode();
      }
      if (this.code == this.password) {
        this.isenabledsave = true;
      }

    })

    return await modal.present();

  }

  async Modal() {
    const modal = await this.modalController.create({
      component: SignaturePage,
      componentProps: { sign: this.sign }
    });

    modal.onDidDismiss().then(data => {
      this.showSig = true;
      this.sign = data
      for (let i = 0; i < this.sign.length; i++) {
        this.sign = this.sign[i]
      }
      this.sign = this.sign.data
      // console.log(this.sign)
    })
    this.isenabledeva = true;
    return await modal.present();
  }

  async alertCusCode() {
    const alert = await this.alertController.create({
      header: 'แจ้งเตือน',
      message: 'กรุณากรอกรหัสยืนยันตัวตนลูกค้า',
      buttons: ['OK']
    });

    await alert.present();
  }

  //#endregion

  //#region time

  startTimer() {
    this.interval = setInterval(() => {
      if (this.time > 0) {
        this.time++;
      } else {
        this.time = 1;
      }
    }, 1000)

  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  //#endregion

  //#region resize base64

  compressImage(src, newX, newY) {
    return new Promise((res, rej) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const elem = document.createElement('canvas');
        elem.width = newX;
        elem.height = newY;
        const ctx = elem.getContext('2d');
        ctx.drawImage(img, 0, 0, newX, newY);
        const data = ctx.canvas.toDataURL();
        res(data);
      }
      img.onerror = error => rej(error);
    })
  }

  resizePhoto(){
    this.compressImage(this.sign, 100, 100).then(compressed => {
      this.sign = compressed;
      console.log(this.sign);
    });

    // this.compressImage(this.photo1, 100, 100).then(compressed => {
    //   this.photo1 = compressed;
    // });
    
    // this.compressImage(this.photo2, 100, 100).then(compressed => {
    //   this.photo2 = compressed;
    // });

    // this.compressImage(this.photo3, 100, 100).then(compressed => {
    //   this.photo3 = compressed;
    // });

    // this.compressImage(this.photo4, 100, 100).then(compressed => {
    //   this.photo4 = compressed;
    // });

    // this.compressImage(this.photo5, 100, 100).then(compressed => {
    //   this.photo5 = compressed;
    // });

    // this.compressImage(this.photo6, 100, 100).then(compressed => {
    //   this.photo6 = compressed;
    // });

    // this.compressImage(this.photo7, 100, 100).then(compressed => {
    //   this.photo7 = compressed;
    // });

    // this.compressImage(this.photo8, 100, 100).then(compressed => {
    //   this.photo8 = compressed;
    // });

    // this.compressImage(this.photo9, 100, 100).then(compressed => {
    //   this.photo9 = compressed;
    // });

    // this.compressImage(this.photo10, 100, 100).then(compressed => {
    //   this.photo11 = compressed;
    // });
  }
  //#endregion

}
