import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuheadPage } from './menuhead.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/menuhead/overview',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuheadPage,
    children: [
      {
        path: 'overview',
        loadChildren: '../overview/overview.module#OverviewPageModule'
      },
      // {
      //   path: 'serviceplan',
      //   loadChildren: '../serviceplan/serviceplan.module#ServiceplanPageModule'
      // },
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
        loadChildren: '../take-spare-parts/take-spare-parts.module#TakeSparePartsPageModule'
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
  declarations: [MenuheadPage]
})
export class MenuheadPageModule {}
