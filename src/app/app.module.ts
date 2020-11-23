import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../app/auth-service.service';
import { Camera } from '@ionic-native/camera/ngx';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { SignaturePadModule } from 'angular2-signaturepad';
import { SignaturePageModule } from '../app/page/joball/detailofdetaillistpm/signature/signature.module';
import { CustomerevaluationPageModule } from '../app/page/joball/detailofdetaillistpm/customerevaluation/customerevaluation.module';
import { CustomerpasswordPageModule } from '../app/page/joball/detailofdetaillistpm/customerpassword/customerpassword.module';
import { ChangsparepartPageModule } from '../app/page/joball/detailofdetaillistpm/changsparepart/changsparepart.module';
import { TakePageModule } from '../app/page/take-spare-parts/take/take.module';
import { TakeNewPageModule } from '../app/page/take-spare-parts/take-new/take-new.module';
import { CheckevaluationPageModule } from '../app/page/joball/detailofdetaillistpm/checkevaluation/checkevaluation.module';
import { ChecklistPageModule } from '../app/page/joball/detailofdetaillistpm/checklist/checklist.module';
import { ModalpopPageModule } from '../app/page/overview/modalpop/modalpop.module';
import { ChecklistcmPageModule } from '../app/page/joball/detailofdetaillistpm/checklistcm/checklistcm.module';
import { ShowimginstallPageModule } from '../app/page/job/showimginstall/showimginstall.module';
import { ChangpasswordPageModule } from '../app/page/setting/changpassword/changpassword.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { BrowserTab } from '@ionic-native/browser-tab/ngx';
import { AuthGuardGuard } from '../app/auth/auth-guard.guard';
import { PartsWaitingListPageModule } from '../app/page/sparepart/parts-waiting-list/parts-waiting-list.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    SignaturePadModule,
    BrowserModule,
    HttpModule,
    FullCalendarModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule,
    SignaturePageModule,
    CustomerevaluationPageModule,
    CustomerpasswordPageModule,
    TakePageModule,
    TakeNewPageModule,
    CheckevaluationPageModule,
    ModalpopPageModule,
    ChecklistPageModule,
    PartsWaitingListPageModule,
    ChangsparepartPageModule,
    ChecklistcmPageModule,
    ShowimginstallPageModule,
    ChangpasswordPageModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    AuthGuardGuard,
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    LocalNotifications,
    Network,
    Camera,
    SQLite,
    AppVersion,
    BrowserTab,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthServiceService,
    BarcodeScanner,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
