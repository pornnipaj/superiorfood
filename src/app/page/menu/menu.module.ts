import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menu/overview',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'overview',
        loadChildren: '../overview/overview.module#OverviewPageModule'
      },
      {
        path: 'job',
        loadChildren: '../job/job.module#JobPageModule'
      },
      // {
      //   path: 'joball',
      //   loadChildren: '../joball/joball.module#JoballPageModule'
      // },
      {
        path: 'sparepart',
        loadChildren: '../take-spare-parts/sparelist/sparelist.module#SparelistPageModule'
      },
      {
        path: 'device',
        loadChildren: '../devices-acessory/devices-acessory.module#DevicesAcessoryPageModule'
      },
      {
        path: 'product',
        loadChildren: '../product/product.module#ProductPageModule'
      },
      {
        path: 'news',
        loadChildren: '../news/news.module#NewsPageModule'
      },
      {
        path: 'setting',
        loadChildren: '../setting/setting.module#SettingPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {}
