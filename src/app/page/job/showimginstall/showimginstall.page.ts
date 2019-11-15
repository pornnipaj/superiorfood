import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { PostDataService } from '../../../post-data.service';

@Component({
  selector: 'app-showimginstall',
  templateUrl: './showimginstall.page.html',
  styleUrls: ['./showimginstall.page.scss'],
})
export class ShowimginstallPage implements OnInit {

  empID;
  planID;
  installID;
  resultimg;
  img;
  booimg1 = false;
  booimg2 = false;
  booimg3 = false;
  booimg4 = false;
  booimg5 = false;
  booimg6 = false;
  booimg7 = false;
  booimg8 = false;
  isShowImage1 = false;
  isShowImage2 = false;
  isShowImage3 = false;
  isShowImage4 = false;
  isShowImage5 = false;
  isShowImage6 = false;
  isShowImage7 = false;
  isShowImage8 = false;
  notimg = "";
  hide = true;
  constructor(public modalController: ModalController,
    private navParams: NavParams,
    private postDataService: PostDataService) {
    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.installId
    console.log("emp" + this.empID, "plan" + this.planID, "ins" + this.installID);
    
    this.img = []
  }

  ngOnInit() {
    let params = {
      installID: this.installID,
      empID: this.empID,
      planID: this.planID,
    }
    console.log(params);

    this.postDataService.getImage(params).then(resultimg => {
      this.resultimg = resultimg;
      console.log(this.resultimg)
      if (this.resultimg == null) {
        this.hide = false;
        console.log(123);
      }
      for (let v = 0; v < this.resultimg.length; v++) {
        if (this.resultimg[v].type == "step1_pic1") {
          this.img.src1 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg1 = true;
          console.log("bf1", this.img.src1);
        } else if (this.resultimg[v].type == "step1_pic2") {
          this.img.src2 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg2 = true;
          console.log("bf1", this.img.src2);
        } else if (this.resultimg[v].type == "step1_pic3") {
          this.img.src3 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg3 = true;
          console.log("bf1", this.img.src3);
        } else if (this.resultimg[v].type == "step1_pic4") {
          this.img.src4 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg4 = true;
          console.log("bf1", this.img.src4);
        } else if (this.resultimg[v].type == "step1_pic5") {
          this.img.src5 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg5 = true;
          console.log("bf1", this.img.src5);
        } else if (this.resultimg[v].type == "step1_pic6") {
          this.img.src6 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg6 = true;
          console.log("bf1", this.img.src6);
        } else if (this.resultimg[v].type == "step1_pic7") {
          this.img.src7 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg7 = true;
          console.log("bf1", this.img.src7);
        } else if (this.resultimg[v].type == "step1_pic8") {
          this.img.src8 = 'http://superior.wingplusweb.com' + this.resultimg[v].file_path
          this.booimg8 = true;
          console.log("bf1", this.img.src8);
        }
      }

      this.isShowImage1 = this.booimg1;
      this.isShowImage2 = this.booimg2;
      this.isShowImage3 = this.booimg3;
      this.isShowImage4 = this.booimg4;
      this.isShowImage5 = this.booimg5;
      this.isShowImage6 = this.booimg6;
      this.isShowImage7 = this.booimg7;
      this.isShowImage8 = this.booimg8;
      
    });
  }

  close() {
    this.modalController.dismiss(0);
  }
}
