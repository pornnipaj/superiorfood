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
    {
      title: 'งานของในความรับผิดชอบ',
      url: '/menu/job',
      icon: 'person'
    },
    // {
    //   title: 'งานทั้งหมด',
    //   url: '/menu/joball',
    //   icon: 'people'
    // },
    {
      title: 'เบิกอะไหล่',
      url: '/menu/sparepart',
      icon: 'hammer'
    },
    {
      title: 'เครื่องและอุปกรณ์คงเหลือ',
      url: '/menu/device',
      icon: 'briefcase'
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


  constructor(private storageService: StorageService) {
  }
  ngOnInit() {
  }
}
