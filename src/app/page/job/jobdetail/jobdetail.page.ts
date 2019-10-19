import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from '../../../storage.service';
import { PostDataService } from '../../../post-data.service';
import { DomSanitizer,SafeResourceUrl } from "@angular/platform-browser";

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
type;
isShowImage = false;
isShowImageInstall = false;
url: SafeResourceUrl;
sanitizer: DomSanitizer;
img;
empID;
installnew;
link = 'http://localhost:41604';
ShowList=true;
//#endregion
  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    sanitizer: DomSanitizer,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.jobdetail = [];
      this.img = [];
      this.route.queryParams.subscribe(params => {
        this.query = JSON.parse(params["data"]);
        this.insID = this.query.install
        this.type = this.query.item.JobType
        this.tranID = this.query.item.tranID
        this.planID = this.query.item.planID
        console.log("query",this.insID);
      });
      this.storageService.getUser().then(items => {
        this.items = items;
        // console.log(items);      
        for (let i = 0; i < this.items.length; i++) {
          this.empID = this.items[i].empID;
          console.log(this.planID);
          console.log(this.insID);        
          
          console.log(this.empID);
        }       
        this.url = sanitizer.bypassSecurityTrustResourceUrl('http://superior.wingplusweb.com/Web/CK_CheckInfo.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.insID);
      });
    }

  ngOnInit() {
    if (this.type != "PM") {
      this.ShowList =  false;
    }
    this.jobdetail.planID = this.planID;
    this.jobdetail.tranID = this.tranID;
    this.jobdetail.insID = this.insID;
    this.jobdetail.type = this.type

    console.log(this.jobdetail);

    this.postDataService.postjobDetail(this.jobdetail).then(jobdetail => {
      this.result = jobdetail;
      console.log(this.result)
      for (let i = 0; i < this.result.length; i++) {
        this.image = JSON.parse(this.result[i].image);
      }
      console.log(this.image); 
      if (this.type == "INSTALL") {
        this.isShowImage = true;
        this.isShowImageInstall = false;
      }else{
        this.isShowImage = true;
        this.isShowImageInstall = true;
      }
      for (let v = 0; v < this.image.length; v++) {
        if (this.image[v].type == "step1_pic1" ) {
          this.img.src1 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("bf1",this.img.src1);          
        }  
        if (this.image[v].type == "step1_pic2" ) {
          this.img.src2 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("bf2",this.img.src2);          
        } 
        if (this.image[v].type == "step1_pic3" ) {
          this.img.src3 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("bf3",this.img.src3);          
        }
        if (this.image[v].type == "step1_pic4" ) {
          this.img.src4 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("bf4",this.img.src4);          
        }
        if (this.image[v].type == "step1_pic5" ) {
          this.img.src5 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("bf5",this.img.src5);          
        }
        if (this.image[v].type == "step3_pic1" ) {
          this.img.src6 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("af1",this.img.src6);          
        }
        if (this.image[v].type == "step3_pic2" ) {
          this.img.src7 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("af2",this.img.src7);          
        }
        if (this.image[v].type == "step3_pic3" ) {
          this.img.src8 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("af3",this.img.src8);          
        }
        if (this.image[v].type == "step3_pic4" ) {
          this.img.src9 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("af4",this.img.src9);          
        }
        if (this.image[v].type == "step3_pic5" ) {
          this.img.src10 = 'http://superior.wingplusweb.com' + this.image[v].file_path
          console.log("af5",this.img.src10);          
        }   
      }   
      });
  }
}
 