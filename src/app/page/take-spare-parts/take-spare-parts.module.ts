import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TakeSparePartsPage } from './take-spare-parts.page';

const routes: Routes = [
  {
    path: '',
    component: TakeSparePartsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TakeSparePartsPage]
})
export class TakeSparePartsPageModule {}
