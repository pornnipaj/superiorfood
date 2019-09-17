import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { DatetimeOptions } from '@ionic/core';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {

data: any;
test;
jobID;

  constructor(public DataService: AuthServiceService,
    public navCtrl: NavController,
    private route: ActivatedRoute,) {

    this.getJob();

  //   this.DataService.getJobDetail().subscribe(data => {
  //     this.data = data;
  //   for (let i = 0; i < this.data.length; i++) {
  //     const json = this.data[i].Name;
  //     console.log(json);
  //   }
  // });

}
    

  getJob(){
    this.DataService.getJob().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
  }
  click(data){
    console.log(data);
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(data.Name)
      }
    };
    this.navCtrl.navigateForward(['/job/jobdetail'], navigationExtras);
    // this.router.navigate(['/joball/listpm',{data:data}])
  // if(data.EmpID == '01225f87-e6cc-4725-afe2-7e5a63f9a183'){
    // this.myNav.push(ListpmPage, data);
    // this.DataService.EmpID = data.EmpID
    // window.location.href="/joball/listpm";
    // console.log(this.DataService.EmpID)
    // console.log(data);
  }
  ngOnInit() {
  }

}
