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
img3;

//#endregion
  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.jobdetail = [];

      this.route.queryParams.subscribe(params => {
        this.query = JSON.parse(params["data"]);
        this.data = this.query.data
        this.insID = this.query.installID
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

        //convert to array
        this.image = JSON.parse(this.result[i].image);
        // console.log(this.image);
      }
      });
  }

}
