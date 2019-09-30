import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-install',
  templateUrl: './install.page.html',
  styleUrls: ['./install.page.scss'],
})
export class InstallPage implements OnInit {
  items;
  name;
  type;
  constructor(private storageService:StorageService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.storageService.getUser().then(items => {
      this.items = items;
      // console.log(items);      
      for (let i = 0; i < this.items.length; i++) {
        this.name = this.items[i].name;
        // console.log(this.name);
      }
    });

    this.route.queryParams.subscribe(params => {
      this.type = JSON.parse(params["data"]);
      console.log("receive", this.type);

    });
  }

}
