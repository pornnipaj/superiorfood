import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DevicesAcessoryPage } from './devices-acessory.page';

const routes: Routes = [
  {
    path: '',
    component: DevicesAcessoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DevicesAcessoryPage]
})
export class DevicesAcessoryPageModule {}
