import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { PostDataService} from '../../../../post-data.service';
@Component({
  selector: 'app-checkevaluation',
  templateUrl: './checkevaluation.page.html',
  styleUrls: ['./checkevaluation.page.scss'],
})
export class CheckevaluationPage implements OnInit {

  //#region data
  link;
  empID;
  planID;
  installID;
  tran;
  url: SafeResourceUrl;
  data;
  name;
  eva = [];
  //#endregion

  //#region constructor
  constructor(public modalController: ModalController,
    private postDataService: PostDataService,
    private navParams: NavParams,
    sanitizer: DomSanitizer, ) {
    this.empID = this.navParams.data.empID;
    this.planID = this.navParams.data.planID;
    this.installID = this.navParams.data.install,
    console.log(this.empID, this.planID, this.installID);
    this.tran = [];;
    // this.getEva();


    // this.url = sanitizer.bypassSecurityTrustResourceUrl(this.postDataService.apiServer_url + 'Web/CK_Evaluation.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://localhost:41669/Web/CK_Evaluation.aspx' + '?empID=' + this.empID + '&serviceplanid=' + this.planID + '&installplanid=' + this.installID);
  }
  //#endregion

  onChange(value) {
    console.log(value.detail.value);
     
  }

  setQuantity(value){
console.log(value);

  }
  test(event){
    console.log(event.detail);
    alert("test");

  }
  
  // getvalue(data){
  //   var input1 = (<HTMLInputElement>document.getElementById("rdo11")).value;

  //   for (let i = 0; i < data.length; i++) {
  //     this.eva.push({value:input1});
  //   }    
  //   let params = {
  //     type: "SaveEvaluation",
  //     eva: this.eva,
  //     installID:this.installID,
  //     planID:this.planID
  //   }
  //   console.log(params);
  //   this.postDataService.getEvaluation(params).then(data => {
  //     this.data = data
  //     console.log(this.data);
  //   });  
  // }
  //#region dtart
  ngOnInit() {
  }
  //#endregion

  //#region close
  close() {
    this.modalController.dismiss(0);
  }
  //#endregion
// getEva(){
//   let params = {
//     type: "Evaluation"
//   }
//   console.log(params);
//   this.postDataService.getEvaluation(params).then(data => {
//     this.data = data
//     console.log(this.data);
//   });
// }
}
