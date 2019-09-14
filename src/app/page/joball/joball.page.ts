import { Component, OnInit,ViewChild  } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service';
import { ListpmPage } from '../joball/listpm/listpm.page';
import { from } from 'rxjs';
import { NavController } from '@ionic/angular';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-joball',
  templateUrl: './joball.page.html',
  styleUrls: ['./joball.page.scss'],
})
export class JoballPage implements OnInit {
  @ViewChild(NavController, { static: false }) myNav;

  data: any;
  form :any = {
    name : '',
    body : ''
  };
  name:any;
  constructor(public DataService: AuthServiceService,public navCtrl: NavController) { 

    this.DataService.getJobAll().subscribe(data => {
      this.data = data;
//       for(let i = 0; i <= this.data.length; i++){
//         this.name  = this.data[0].CustomerName
//         console.log(this.name);
// } 
      
    });
    
  }
click(data){
  console.log(data);
  const navigationExtras: NavigationExtras = {
    queryParams: {
      data: JSON.stringify(data)
    }
  };
  this.navCtrl.navigateForward(['/joball/listpm'], navigationExtras);
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

  // insertnewnote() {
  //   console.log(this.form);
  //   this.DataService.insert(this.form).then((data:any) => {
  //     console.log(data);
  //   });
  // }
//}
