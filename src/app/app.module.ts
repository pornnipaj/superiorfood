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
import { CustomerpasswordPageModule } from '../app/page/joball/detailofdetaillistpm/customerpassword/customerpassword.module';
import { CheckevaluationPageModule } from '../app/page/joball/detailofdetaillistpm/checkevaluation/checkevaluation.module';
import { ChecklistPageModule } from '../app/page/joball/detailofdetaillistpm/checklist/checklist.module';
import { ModalpopPageModule } from '../app/page/overview/modalpop/modalpop.module';
import { ChecklistcmPageModule } from '../app/page/joball/detailofdetaillistpm/checklistcm/checklistcm.module';
import { ShowimginstallPageModule } from '../app/page/job/showimginstall/showimginstall.module';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SQLite } from '@ionic-native/sqlite/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

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
    CustomerpasswordPageModule,
    CheckevaluationPageModule,
    ModalpopPageModule,
    ChecklistPageModule,
    ChecklistcmPageModule,
    ShowimginstallPageModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ScreenOrientation,
    Camera,
    SQLite,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },        
    AuthServiceService,
    BarcodeScanner,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
