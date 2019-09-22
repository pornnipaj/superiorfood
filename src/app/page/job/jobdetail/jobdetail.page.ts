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
  //#endregion
  
  //#region constructor

  constructor(public DataService: AuthServiceService,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private postDataService: PostDataService) {

      this.jobdetail = [];


    this.route.queryParams.subscribe(params => {
      this.query = JSON.parse(params["data"]);
      this.planID = this.query.planID
      this.tranID = this.query.tranID
      console.log("receive", this.query);
    });


    // this.getOverview();
    this.getEvaluation();
    // this.getCheckList();

    //   this.DataService.getJobDetail().subscribe(data => {
    //     this.data = data;
    //   for (let i = 0; i < this.data.length; i++) {
    //     const json = this.data[i].Name;
    //     console.log(json);
    //   }
    // });
  }

  //#endregion

  //#region click

  getEvaluation() {
    this.DataService.getJobDetail().subscribe(data => {
      this.data = data;
      //get json_evaluation
      for (let i = 0; i < this.data.length; i++) {
        this.json = this.data[i].json_evaluation;
        // console.log(this.json);

        //convert to array
        this.items = JSON.parse(this.json);
        // console.log(this.items);
      }

      //get data in json_evaluation
      for (let i = 0; i < this.items.length; i++) {
        this.question = this.items[i].question;
        this.answer = this.items[i].answer;
        this.answerText = this.items[i].answerText;
        // console.log(this.question + " " + this.answer + " " + this.answerText);
      }
    });
  }

  getCheckList() {
    this.DataService.getJobDetail().subscribe(data => {
      this.data = data;
      //get json_checklist
      for (let i = 0; i < this.data.length; i++) {
        this.json = this.data[i].json_checklist;
        // console.log(this.json);

        //convert to array
        this.items = JSON.parse(this.json);
        // console.log(this.items);
      }

      //get data in json_checklist
      for (let i = 0; i < this.items.length; i++) {
        this.json_checklist.header = this.items[i].header;
        this.json_checklist.subheader = this.items[i].subheader;
        // console.log(this.json_checklist.header + " " + this.json_checklist.subheader);
      }
    });
  }

  //#endregion

  //#region start

  ngOnInit() {
  
    // this.route.queryParams.subscribe(params => {
    //   if (params && params.special) {
    //     this.cusID = JSON.parse(params.special);  
    //     console.log(this.cusID.empID);     
    //     console.log(this.cusID.cusID);
    //     console.log(this.cusID.planID);        
    //   }   
    // });
    // this.jobdetail.empID = this.cusID.empID
    // this.jobdetail.cusID = this.cusID.cusID
    // this.jobdetail.planID = this.cusID.planID
    //   console.log(this.jobdetail);
    
    this.jobdetail.planID = this.planID;
    this.jobdetail.tranID = this.tranID

    console.log(this.jobdetail);

    this.postDataService.postjobDetail(this.jobdetail).then(jobdetail => {
      this.result = jobdetail;
      console.log(this.result)
      // for (let i = 0; i < this.jobOverview.length; i++) {
      //   this.workall = this.jobOverview[i].WorkAll;
      //   this.workfinish = this.jobOverview[i].WorkFinish;
      // }
      });
  }

  //#endregion
}
