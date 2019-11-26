import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CustomerevaluationPage } from './customerevaluation.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerevaluationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CustomerevaluationPage]
})
export class CustomerevaluationPageModule {}
