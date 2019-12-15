import { Component, OnInit } from '@angular/core';
import { StorageService, User } from '../../storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  items;
  role;

  pageservice = [
    {
      title: 'ภาพรวมการทำงาน',
      url: '/menu/overview',
      icon: 'home'
    },
    // {
    //   title: 'แพลนงานช่าง',
    //   url: '/menu/serviceplan',
    //   icon: 'calendar'
    // },
    {
      title: 'งานของในความรับผิดชอบ',
      url: '/menu/job',
      icon: 'person'
    },
    {
      title: 'งานทั้งหมด',
      url: '/menu/joball',
      icon: 'people'
    },
    {
      title: 'เบิกอะไหล่',
      url: '/menu/sparepart',
      icon: 'hammer'
    },
    {
      title: 'สินค้าและคู่มือ',
      url: '/menu/product',
      icon: 'bookmarks'
    },
    {
      title: 'ข่าว',
      url: '/menu/news',
      icon: 'alert'
    },
    {
      title: 'ตั้งค่า',
      url: '/menu/setting',
      icon: 'settings'
    }
  ];

  pagestock = [
    {
      title: 'ภาพรวม',
      url: '/menu/overview-stock',
      icon: 'home'
    },    
    {
      title: 'เช็คสต็อก',
      url: '/menu/check-stock',
      icon: 'cube'
    },
    {
      title: 'รับสินค้าข้าระบบ',
      url: '/menu/incoming-goods',
      icon: 'albums'
    },
    {
      title: 'โอนสินค้า',
      url: '/menu/tranfer',
      icon: 'repeat'
    },
    {
      title: 'ตั้งค่า',
      url: '/menu/setting',
      icon: 'settings'
    }
  ];
  
  constructor(private storageService: StorageService) { 
    setTimeout(() => {
      this.ngOnInit();
      console.log("123");
      
    }, 100);  }

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.storageService.getUser().then(items => {
      this.items = items;
      console.log(items);
      for (let i = 0; i < this.items.length; i++) {
        this.role = this.items[i].role;
        console.log(this.role);
      }
    });
  }

}
