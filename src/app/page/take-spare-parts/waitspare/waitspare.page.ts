import { Component, OnInit } from '@angular/core';
import { PostDataService } from '../../../post-data.service';
import { StorageService } from '../../../storage.service';

@Component({
  selector: 'app-waitspare',
  templateUrl: './waitspare.page.html',
  styleUrls: ['./waitspare.page.scss'],
})
export class WaitsparePage implements OnInit {
  ListJob;
  DetailJobList;
  No;
  empID;
  constructor(private postDataService:PostDataService,private storageService: StorageService,) { 
    this.loadItems();
  }

  ngOnInit() {
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      for (let i = 0; i < items.length; i++) {
        this.empID = items[i].empID;
      }      
    this.GetListJob();
    });
  }

  GetListJob() {
    let params = {
      EmpID: this.empID,
      Type: "GetListJobWait",
    }
    console.log(params);
    this.postDataService.PostCus(params).then(ListJob => {
      this.ListJob = ListJob;
      console.log(this.ListJob);
      
    });
  }

  GetJob(item,Docno) {
    this.No = Docno;
    let params = {
      Type: "GetJobWait",
      JobID:item
    }
    console.log(params);
    this.postDataService.PostCus(params).then(DetailJobList => {
      this.DetailJobList = DetailJobList;
      console.log(this.DetailJobList);
            
    });
  }
}
