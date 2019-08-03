import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', loadChildren: './page/menu/menu.module#MenuPageModule' },
  { path: 'jobdetail', loadChildren: './page/jobdetail/jobdetail.module#JobdetailPageModule' },
  { path: 'reportcheckpm', loadChildren: './page/reportcheckpm/reportcheckpm.module#ReportcheckpmPageModule' },
  { path: 'calendarpm', loadChildren: './page/calendarpm/calendarpm.module#CalendarpmPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
