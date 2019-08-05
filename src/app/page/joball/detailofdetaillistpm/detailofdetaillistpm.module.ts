import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DetailofdetaillistpmPage } from './detailofdetaillistpm.page';

const routes: Routes = [
  {
    path: '',
    component: DetailofdetaillistpmPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DetailofdetaillistpmPage]
})
export class DetailofdetaillistpmPageModule {}
