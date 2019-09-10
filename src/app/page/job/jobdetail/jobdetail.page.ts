import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../../auth-service.service';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'app-jobdetail',
  templateUrl: './jobdetail.page.html',
  styleUrls: ['./jobdetail.page.scss'],
})
export class JobdetailPage implements OnInit {
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

  constructor(public DataService: AuthServiceService, public http: Http) {

    this.getOverview();
    this.getEvaluation();
    this.getCheckList();
  }

  getOverview() {
    this.DataService.getJobDetail().subscribe(data => {
      this.data = data;
      // console.log(this.data);      
    });
  }

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
        console.log(this.items);
      }

      //get data in json_checklist
      for (let i = 0; i < this.items.length; i++) {
        this.json_checklist.header = this.items[i].header;
        this.json_checklist.subheader = this.items[i].subheader;
        // console.log(this.json_checklist.header + " " + this.json_checklist.subheader);
      }
    });
  }

  ngOnInit() {
  }
} 
