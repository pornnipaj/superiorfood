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
      {
        path: 'joball',
        loadChildren: '../joball/joball.module#JoballPageModule'
      },
      {
        path: 'sparepart',
        loadChildren: '../take-spare-parts/sparelist/sparelist.module#SparelistPageModule'
      },
      {
        path: 'product',
        loadChildren: '../product/product.module#ProductPageModule'
      },
      {
        path: 'news',
        loadChildren: '../news/news.module#NewsPageModule'
      },{
        path: 'overview-stock',
        loadChildren: '../../page_stock/overview/overview.module#OverviewPageModule'
      },{
        path: 'check-stock',
        loadChildren: '../../page_stock/check-stock/check-stock.module#CheckStockPageModule'
      },{
        path: 'incoming-goods',
        loadChildren: '../../page_stock/incoming-goods/incoming-goods.module#IncomingGoodsPageModule'
      },{
        path: 'tranfer',
        loadChildren: '../../page_stock/tranfer/tranfer.module#TranferPageModule'
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
