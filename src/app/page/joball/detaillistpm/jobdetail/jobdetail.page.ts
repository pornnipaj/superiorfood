import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../../auth-service.service';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../../storage.service';
import { PostDataService } from '../../../../post-data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {
//#region data

data: any;
json: any;
items: any;
question: any;
answer: any;
answerText: any;
json_checklist = {
  header: '',
  subheader: '',
  row: ''
}
jobdetail;
cusID;
result;
query;
planID;
tranID;
insID;
image;
img1;
img2;
img3:SafeResourceUrl;
img4;
img5;
img6;
img7;
img8;
img9;
img10;
type;
isShowImage = false;
isShowImageInstall = false;
sanitizer: DomSanitizer;

//#endregion
  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    private DomSanitizer: DomSanitizer,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.jobdetail = [];

      this.route.queryParams.subscribe(params => {
        this.query = JSON.parse(params["data"]);
        this.data = this.query.data
        this.insID = this.query.installID
        this.type = this.query.type
        console.log(this.query);
        
        for (let i = 0; i < this.data.length; i++) {
          this.data = (this.data[i])
        }
        this.planID = this.data.planID
        this.tranID = this.data.tranID
      });
        
    
     }

  ngOnInit() {
    this.jobdetail.planID = this.planID;
    this.jobdetail.tranID = this.tranID;
    this.jobdetail.insID = this.insID;

    console.log(this.jobdetail);

    this.postDataService.postjobDetail(this.jobdetail).then(jobdetail => {
      this.result = jobdetail;
      console.log(this.result)
      for (let i = 0; i < this.result.length; i++) {
        this.image = JSON.parse(this.result[i].image);
      }
      console.log(this.image);
      if (this.type == "INSTALL") {
        this.isShowImageInstall = true;
        for (let v = 0; v < this.image.length; v++) {
          if (this.image[v].type == "step1_pic1" ) {
            this.img1 = this.image[v].file_path
            // this.img1 = this.sanitizer.bypassSecurityTrustResourceUrl('D:\wingplus\Superiors\WingPlus\Data\image\4876c93f-d1db-4879-a3c5-8df3af959ddf_step1_pic2.png');    
            // this.img1 = "../../../../../assets/img/jpeg-20160104-134003223699135.jpg"
            console.log("bf1",this.img1);          
          }  
          if (this.image[v].type == "step1_pic2" ) {
            this.img2 = this.image[v].file_path
            console.log("bf2",this.img2);         
          }           
          if (this.image[v].type == "step3_pic1" ) {
            // this.img6 = this.image[v].file_path
            this.img6 = "../../../../../assets/img/jpeg-20160104-134003223699135.jpg"
            console.log("af1",this.img6);          
          }
          if (this.image[v].type == "step3_pic2" ) {
            this.img7 = this.image[v].file_path
            console.log("af2",this.img7);          
          }
          if (this.image[v].type == "step3_pic3" ) {
            this.img8 = this.image[v].file_path
            console.log("af3",this.img8);          
          }
          if (this.image[v].type == "step3_pic4" ) {
            this.img9 = this.image[v].file_path
            console.log("af4",this.img2);          
          }
          if (this.image[v].type == "step3_pic5" ) {
            this.img10 = this.image[v].file_path
            console.log("af5",this.img10);          
          }   
        }
      }else{
        this.isShowImage = true;
        for (let v = 0; v < this.image.length; v++) {
          if (this.image[v].type == "step1_pic1" ) {
            // this.img1 = this.image[v].file_path
            this.img1 = "../../../../../assets/img/jpeg-20160104-134003223699135.jpg"
            console.log("bf1",this.img1);          
          }  
          if (this.image[v].type == "step1_pic2" ) {
            this.img2 = this.image[v].file_path
            console.log("bf2",this.img2);          
          } 
          if (this.image[v].type == "step1_pic3" ) {
            this.img3 = this.image[v].file_path
            console.log("bf3",this.img3);          
          }
          if (this.image[v].type == "step1_pic4" ) {
            this.img4 = this.image[v].file_path
            console.log("bf4",this.img4);          
          }
          if (this.image[v].type == "step1_pic5" ) {
            this.img5 = this.image[v].file_path
            console.log("bf5",this.img5);          
          }
          if (this.image[v].type == "step3_pic1" ) {
            // this.img6 = this.image[v].file_path
            this.img6 = "../../../../../assets/img/jpeg-20160104-134003223699135.jpg"
            console.log("af1",this.img6);          
          }
          if (this.image[v].type == "step3_pic2" ) {
            this.img7 = this.image[v].file_path
            console.log("af2",this.img7);          
          }
          if (this.image[v].type == "step3_pic3" ) {
            this.img8 = this.image[v].file_path
            console.log("af3",this.img8);          
          }
          if (this.image[v].type == "step3_pic4" ) {
            this.img9 = this.image[v].file_path
            console.log("af4",this.img2);          
          }
          if (this.image[v].type == "step3_pic5" ) {
            this.img10 = this.image[v].file_path
            console.log("af5",this.img10);          
          }   
        }
      }      
      });
  }
}
