import { Component, OnInit } from '@angular/core';
import { StorageService, User } from '../../storage.service';

@Component({
  selector: 'app-menuhead',
  templateUrl: './menuhead.page.html',
  styleUrls: ['./menuhead.page.scss'],
})
export class MenuheadPage implements OnInit {
  items;
  status;

  pages = [
    {
      title: 'ภาพรวมการทำงาน',
      url: '/menuhead/overview',
      icon: 'home'
    },
    // {
    //   title: 'แพลนงานช่าง',
    //   url: '/menuhead/serviceplan',
    //   icon: 'calendar'
    // },
    {
      title: 'งานของในความรับผิดชอบ',
      url: '/menuhead/job',
      icon: 'person'
    },
    {
      title: 'งานทั้งหมด',
      url: '/menuhead/joball',
      icon: 'people'
    },
    {
      title: 'เบิกอะไหล่',
      url: '/menuhead/sparepart',
      icon: 'hammer'
    },
    {
      title: 'สินค้าและคู่มือ',
      url: '/menuhead/product',
      icon: 'bookmarks'
    },
    {
      title: 'ข่าว',
      url: '/menuhead/news',
      icon: 'alert'
    },
    {
      title: 'ตั้งค่า',
      url: '/menuhead/setting',
      icon: 'settings'
    }
  ];

  pagesspare = [
    {
      title: 'ภาพรวมการทำงาน',
      url: '/menuhead/overview',
      icon: 'home'
    },    
    {
      title: 'ตั้งค่า',
      url: '/menuhead/setting',
      icon: 'settings'
    }
  ];
  
  constructor(private storageService: StorageService) { 
    setTimeout(() => {
      this.ngOnInit();
    }, 500);  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.status = this.items[i].status;
        console.log(this.status);
      }
    });
  }

}
