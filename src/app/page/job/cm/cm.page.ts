import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../../storage.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cm',
  templateUrl: './cm.page.html',
  styleUrls: ['./cm.page.scss'],
})
export class CmPage implements OnInit {
  state$: Observable<object>;
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
