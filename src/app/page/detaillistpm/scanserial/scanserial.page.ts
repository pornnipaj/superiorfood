import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { PostDataService } from '../../../post-data.service';
import { NavController, AlertController } from '@ionic/angular';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-scanserial',
  templateUrl: './scanserial.page.html',
  styleUrls: ['./scanserial.page.scss'],
})
export class ScanserialPage implements OnInit {
  datas;
  empID;
  data;
  item;
  type;
  apiServer_url;

  constructor(private route: ActivatedRoute,
    public navCtrl: NavController,
    private storageService: StorageService,
    private postDataService: PostDataService) {
      this.route.queryParams.subscribe(params => {
        this.datas = JSON.parse(params["data"]);
        this.empID = this.datas.empID;
        this.type = this.datas.type;
        this.data = this.datas.data;
        this.item = this.datas.item;
        console.log(this.datas);
        console.log(this.data);
        console.log(this.empID);
        console.log(this.type);  
        console.log(this.item.installId);
              
      });
      this.apiServer_url = this.postDataService.apiServer_url;
    }  

  ngOnInit() {
  }

}
