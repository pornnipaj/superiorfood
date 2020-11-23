import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PartsWaitingListPage } from './parts-waiting-list.page';

const routes: Routes = [
  {
    path: '',
    component: PartsWaitingListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PartsWaitingListPage]
})
export class PartsWaitingListPageModule {}
