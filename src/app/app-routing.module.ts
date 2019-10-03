import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'menu', loadChildren: './page/menu/menu.module#MenuPageModule' },
  { path: 'job/jobdetail', loadChildren: './page/job/jobdetail/jobdetail.module#JobdetailPageModule' },
  { path: 'job/reportcheckpm', loadChildren: './page/job/reportcheckpm/reportcheckpm.module#ReportcheckpmPageModule' },
  { path: 'job/calendarpm', loadChildren: './page/job/calendarpm/calendarpm.module#CalendarpmPageModule' },
  { path: 'joball/listpm', loadChildren: './page/joball/listpm/listpm.module#ListpmPageModule' },
  { path: 'joball/listpm/detaillistpm', loadChildren: './page/joball/detaillistpm/detaillistpm.module#DetaillistpmPageModule' },
  // tslint:disable-next-line: max-line-length
  { path: 'joball/listpm/detailofdetaillistpm', loadChildren: './page/joball/detailofdetaillistpm/detailofdetaillistpm.module#DetailofdetaillistpmPageModule' },
  { path: 'signature', loadChildren: './page/joball/detailofdetaillistpm/signature/signature.module#SignaturePageModule' },
  { path: 'take-spare-parts', loadChildren: './page/take-spare-parts/take-spare-parts.module#TakeSparePartsPageModule' },
  { path: 'sqlite', loadChildren: './sqlite/sqlite.module#SqlitePageModule' },
  { path: 'test', loadChildren: './test/test.module#TestPageModule' },
  { path: 'job/install', loadChildren: './page/job/install/install.module#InstallPageModule' },
  { path: 'job/uninstall', loadChildren: './page/job/uninstall/uninstall.module#UninstallPageModule' },
  { path: 'job/cm', loadChildren: './page/job/cm/cm.module#CmPageModule' },
  { path: 'customerpassword', loadChildren: './page/joball/detailofdetaillistpm/customerpassword/customerpassword.module#CustomerpasswordPageModule' },
  { path: 'joball/listpm/detaillistpm/jobdetail', loadChildren: './page/joball/detaillistpm/jobdetail/jobdetail.module#JobdetailPageModule' },




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
